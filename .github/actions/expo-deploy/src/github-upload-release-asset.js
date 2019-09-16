const api = require('./github-api');
const githubEvent = require('./github-event');
const {
	GITHUB_REPOSITORY_NAME,
	GITHUB_TOKEN,
	REPO_DIRECTORY,
} = require('./constants');
const download = require('./download');
const ghReleaseAssets = require('gh-release-assets');
const fs = require('fs');
const path = require('path');

const uploadReleaseAsset = async (assetUrl, platform) => {
	const event = await githubEvent();
	const owner = event.repository.owner.login;
	const repo = event.repository.name;

	const version = getVersion();

	if (!version) {
		throw Error('No version found in package.json');
	}

	const release = await api.repos.getReleaseByTag({
		owner,
		repo,
		tag: `v${version}`,
	});

	console.log('release fetched');

	const upload_url = release.data.upload_url;

	if (!upload_url) {
		throw Error(`No release found with tagname: v${version}`);
	}

	const extension = platform === 'android' ? 'apk' : 'ipa';
	const local_url = `${REPO_DIRECTORY}/${GITHUB_REPOSITORY_NAME}.${extension}`;

	console.log(`attempting to download file at: ${local_url}`);

	await download(assetUrl, local_url);

	console.log('download complete, uploading to github');

	// walkSync(REPO_DIRECTORY);
	await ghReleaseAssetsAsync({
		url: upload_url,
		token: [GITHUB_TOKEN],
		assets: [local_url],
	});
};

const ghReleaseAssetsAsync = async opts => {
	return new Promise((resolve, reject) => {
		ghReleaseAssets(opts, function(err, assets) {
			if (err) {
				return reject(err);
			}

			resolve(assets);
		});
	});
};

const getVersion = () => {
	const contents = fs.readFileSync(path.join(REPO_DIRECTORY, 'package.json'));
	const pkg = JSON.parse(contents);

	return pkg.version;
};

// // List all files in a directory in Node.js recursively in a synchronous fashion
// var walkSync = function(dir, filelist) {
// 	var fs = fs || require('fs'),
// 		files = fs.readdirSync(dir);
// 	console.log('files', files);
// 	filelist = filelist || [];
// 	files.forEach(function(file) {
// 		if (fs.statSync(dir + file).isDirectory()) {
// 			filelist = walkSync(dir + file + '/', filelist);
// 		} else {
// 			filelist.push(file);
// 		}
// 	});

// 	console.log(filelist);
// 	return filelist;
// };

module.exports = uploadReleaseAsset;
