const fs = require('fs');
const https = require('https');

/**
 * Downloads a file from a url. Follows redirects if required
 * @param {*} uri
 * @param {*} filename
 */
async function download(uri, filename) {
	return new Promise((resolve, reject) => {
		https
			.get(uri, function(response) {
				if (response.statusCode >= 200 && response.statusCode < 300) {
					downloadFile(uri, filename)
						.then(resolve)
						.catch(reject);
				} else if (response.headers.location) {
					console.log('Path redirected to: ', response.headers.location);
					resolve(download(response.headers.location, filename));
				} else {
					reject(new Error(response.statusCode + ' ' + response.statusMessage));
				}
			})
			.on('error', reject);
	});
}

/**
 * Downloads a file from a url. Follows redirects if required
 * @param {*} uri
 * @param {*} filename
 */
async function downloadFile(url, dest) {
	return new Promise((resolve, reject) => {
		const file = fs.createWriteStream(dest);

		https
			.get(url, res => {
				if (res.statusCode !== 200) {
					return reject('File is not found');
				}

				// const len = parseInt(res.headers['content-length'], 10);

				// let dowloaded = 0;

				res.pipe(file);
				res
					// .on('data', chunk => {
					// 	dowloaded += chunk.length;
					// 	console.log(
					// 		'Downloading ' +
					// 			((100.0 * dowloaded) / len).toFixed(2) +
					// 			'% ' +
					// 			dowloaded +
					// 			' bytes' +
					// 			'\r'
					// 	);
					// })
					.on('end', () => {
						file.end();
						resolve(null);
					})
					.on('error', err => {
						reject(err.message);
					});
			})
			.on('error', err => {
				fs.unlink(dest);
				reject(err.message);
			});
	});
}

module.exports = download;
