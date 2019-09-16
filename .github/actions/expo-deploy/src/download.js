var url = require('url');
const fs = require('fs');
const file = require('siwi-file').file;

/**
 * Downloads a file from a url. Follows redirects if required
 * @param {*} uri
 * @param {*} filename
 */
async function download(uri, filename) {
	return new Promise((resolve, reject) => {
		var protocol = url.parse(uri).protocol.slice(0, -1);
		var onError = function(e) {
			fs.unlink(filename);
			reject(e);
		};
		require(protocol)
			.get(uri, function(response) {
				if (response.statusCode >= 200 && response.statusCode < 300) {
					file(uri, 'app.apk').catch(e => console.log('err', e));
				} else if (response.headers.location) {
					resolve(download(response.headers.location, filename));
				} else {
					reject(new Error(response.statusCode + ' ' + response.statusMessage));
				}
			})
			.on('error', onError);
	});
}

module.exports = download;
