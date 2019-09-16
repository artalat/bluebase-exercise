var url = require('url');
const fs = require('fs');
const file = require('siwi-file').file;

/**
 * Downloads a file from a url. Follows redirects if required
 * @param {*} uri
 * @param {*} filename
 */
async function download(uri, filename) {
	console.log('returning promise');
	return new Promise((resolve, reject) => {
		console.log('inside promise');
		var protocol = url.parse(uri).protocol.slice(0, -1);
		var onError = function(e) {
			fs.unlink(filename);
			reject(e);
		};
		require(protocol)
			.get(uri, function(response) {
				if (response.statusCode >= 200 && response.statusCode < 300) {
					console.log('now downloading', uri);
					file(uri, 'app.apk').catch(e => console.log('err', e));
				} else if (response.headers.location) {
					console.log('whoops we were redirected', response.headers.location);
					resolve(download(response.headers.location, filename));
				} else {
					console.log('download error', response.statusMessage);
					reject(new Error(response.statusCode + ' ' + response.statusMessage));
				}
			})
			.on('error', onError);
	});
}

module.exports = download;
