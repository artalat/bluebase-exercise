const api = require('./github-api');
const githubEvent = require('./github-event');
const { GITHUB_REPOSITORY_NAME, GITHUB_TOKEN } = require('./constants');
const version = require('./package.json').version;
const download = require('siwi-file');
const ghReleaseAssets = require('gh-release-assets');

const uploadReleaseAsset = async (assetUrl, android) => {
	const event = await githubEvent();
	const owner = event.repository.owner.login;
	const repo = event.repository.name;

	const release = await api.repos.getReleaseByTag({
		owner,
		repo,
		tag: version,
	});

	const upload_url = release.upload_url;

	const extension = android ? 'apk' : 'ipa';
	const local_url = `./${GITHUB_REPOSITORY_NAME}.${extension}`;

	await download(assetUrl, local_url);

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

module.exports = uploadReleaseAsset;
