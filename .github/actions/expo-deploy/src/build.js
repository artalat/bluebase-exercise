const {
	EXPO_RELEASE_CHANNEL,
	EXPO_CLI_USERNAME,
	EXPO_CLI_PASSWORD,
} = require('./constants');
const exec = require('@actions/exec');
const { extractAppFileUrl, extractBundleUrl } = require('./extract-url');
const uploadReleaseAsset = require('./github-upload-release-asset');
const core = require('@actions/core');

const build = async platform => {
	try {
		console.log('->> Publishing app bundle on Expo…');

		let output = '';
		// let myError = '';

		const options = {};
		options.listeners = {
			stdout: data => {
				output += data.toString();
			},
			// stderr: data => {
			// 	myError += data.toString();
			// },
		};

		await exec.exec('./node_modules/.bin/expo', [
			'login',
			'-u',
			EXPO_CLI_USERNAME,
			'-p',
			EXPO_CLI_PASSWORD,
			'--non-interactive',
		]);

		await exec.exec(
			'./node_modules/.bin/expo',
			[
				`build:${platform}`,
				'--release-channel',
				EXPO_RELEASE_CHANNEL,
				'--config',
				'./build/expo/app.json',
			],
			options
		);

		const appUrl = extractAppFileUrl(output);
		const bundleUrl = extractBundleUrl(output);

		await uploadReleaseAsset(appUrl, platform);

		core.setOutput('appUrl', appUrl);
		core.setOutput('bundleUrl', bundleUrl);
	} catch (error) {
		console.log('->> Deployment Failed', error);
		process.exit(1);
	}
};

module.exports = build;
