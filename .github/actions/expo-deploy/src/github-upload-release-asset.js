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

	const upload_url = release.data.upload_url;

	if (!upload_url) {
		throw Error(`No release found with tagname: v${version}`);
	}

	const extension = platform === 'android' ? 'apk' : 'ipa';
	const local_url = `${REPO_DIRECTORY}/${GITHUB_REPOSITORY_NAME}.${extension}`;

	console.log(`Attempting to download file at: ${local_url}`);

	await download(assetUrl, local_url);

	console.log('Download complete, uploading to GitHub');

	// walkSync(REPO_DIRECTORY);
	await ghReleaseAssetsAsync({
		url: upload_url,
		token: [GITHUB_TOKEN],
		assets: [
			{
				name: platform === 'android' ? 'Android App' : 'iOS App',
				path: local_url,
			},
		],
	});

	console.log('GitHub Upload Complete');
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

module.exports = uploadReleaseAsset;
