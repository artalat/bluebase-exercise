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
	// const environment = GITHUB_DEPLOYMENT_ENVIORNMENT;

	// console.log('->> Creating GitHub Deployment…');
	// const deployment = await createDeployment({
	// 	environment,
	// 	description: 'Expo Project',
	// });

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

		// console.log('myError!!!', myError);
		// console.log('output!!!', output);
		// if (myError) {
		// 	throw Error(myError);
		// }

		// const response = await deploy();

		const url = extractAppFileUrl(output);

		await uploadReleaseAsset(url, platform);
		// console.log('->> Creating GitHub Deployment Status…');
		// await createDeploymentStatus({
		// 	// environment,
		// 	state: 'success',
		// 	deployment_id: deployment.data.id,
		// 	environment_url: url,
		// 	description: 'Deployment finished successfully.',
		// });

		core.setOutput('url', url);
	} catch (error) {
		console.log('->> Deployment Failed', error);
		// await createDeploymentStatus({
		// 	// environment,
		// 	state: 'error',
		// 	deployment_id: deployment.data.id,
		// 	description: error.message,
		// });
		process.exit(1);
	}
};

module.exports = build;
