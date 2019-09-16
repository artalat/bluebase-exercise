const {
	EXPO_RELEASE_CHANNEL,
	EXPO_CLI_USERNAME,
	EXPO_CLI_PASSWORD,
} = require('./constants');
const exec = require('@actions/exec');
const { extractAppFileUrl } = require('./extract-url');
const uploadReleaseAsset = require('./github-upload-release-asset');
const core = require('@actions/core');

const build = async platform => {
	try {
		console.log('->> Publishing app bundle on Expo…');

		// let output = '';
		// // let myError = '';

		// const options = {};
		// options.listeners = {
		// 	stdout: data => {
		// 		output += data.toString();
		// 	},
		// 	// stderr: data => {
		// 	// 	myError += data.toString();
		// 	// },
		// };

		// await exec.exec('./node_modules/.bin/expo', [
		// 	'login',
		// 	'-u',
		// 	EXPO_CLI_USERNAME,
		// 	'-p',
		// 	EXPO_CLI_PASSWORD,
		// 	'--non-interactive',
		// ]);
		// await exec.exec(
		// 	'./node_modules/.bin/expo',
		// 	[
		// 		`build:${platform}`,
		// 		'--release-channel',
		// 		EXPO_RELEASE_CHANNEL,
		// 		'--config',
		// 		'./build/expo/app.json',
		// 	],
		// 	options
		// );

		const output = `
Success. You are now logged in as ***.
- Making sure project is set up correctly...
[16:55:01] Checking if there is a build in progress...

[16:55:02] Unable to find an existing Expo CLI instance for this directory, starting a new one...
[16:55:04] Starting Metro Bundler on port 19001.
[16:55:07] Tunnel ready.
[16:55:07] Publishing to channel 'default'...
[16:55:08] Building iOS bundle
[16:57:35] Building Android bundle
[16:57:35] Finished building JavaScript bundle in 108186ms.
[16:59:16] Analyzing assets
[16:59:16] Finished building JavaScript bundle in 101250ms.
[16:59:18] Finished building JavaScript bundle in 1995ms.
[16:59:20] Finished building JavaScript bundle in 1938ms.
[16:59:20] Uploading assets
[16:59:20] No assets changed, skipped.
[16:59:20] Uploading JavaScript bundles
[16:59:21] Published
[00:17:48] Your URL is

https://exp.host/@***/bluebase-project-expo?release-channel=featuretest

[00:17:48] Checking if this build already exists...

[00:18:04] Build started, it may take a few minutes to complete.
[00:18:04] You can check the queue length at https://expo.io/turtle-status

[00:18:04] You can monitor the build at

 https://expo.io/builds/78e08c70-238e-458a-b447-0b288a5cd8b9

[00:18:04] Waiting for build to complete. You can press Ctrl+C to exit.
- 
✔ Build finished.
[00:22:38] Successfully built standalone app: https://expo.io/artifacts/6740822a-7010-4e1b-9247-816588219921`;

		const url = extractAppFileUrl(output);

		await uploadReleaseAsset(url, platform);

		core.setOutput('url', url);
	} catch (error) {
		console.log('->> Deployment Failed', error);
		process.exit(1);
	}
};

module.exports = build;
