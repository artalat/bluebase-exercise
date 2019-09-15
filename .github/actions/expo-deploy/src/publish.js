const {
	createDeployment,
	createDeploymentStatus,
} = require('./github-deployment');
const {
	GITHUB_DEPLOYMENT_ENVIORNMENT,
	EXPO_RELEASE_CHANNEL,
	EXPO_CLI_USERNAME,
	EXPO_CLI_PASSWORD,
} = require('./constants');
const exec = require('@actions/exec');
const { extractBundleUrl } = require('./extract-url');

const publish = async () => {
	const environment = GITHUB_DEPLOYMENT_ENVIORNMENT;

	console.log('->> Creating GitHub Deployment…');
	const deployment = await createDeployment({
		environment,
		description: 'Expo Project',
	});

	try {
		console.log('->> Publishing app bundle on Expo…');

		let myOutput = '';
		let myError = '';

		const options = {};
		options.listeners = {
			stdout: data => {
				myOutput += data.toString();
			},
			stderr: data => {
				myError += data.toString();
			},
		};

		// await exec.exec('expo login -u $EXPO_USERNAME -p $EXPO_PASSWORD --non-interactive');
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
				'publish',
				'--release-channel',
				EXPO_RELEASE_CHANNEL,
				'--config',
				'./build/expo/app.json',
			],
			options
		);

		console.log('myError!!!', myError);
		console.log('output!!!', myOutput);
		if (myError) {
			throw Error(myError);
		}

		// const response = await deploy();

		const url = extractBundleUrl(myOutput);

		console.log('->> Creating GitHub Deployment Status…');
		await createDeploymentStatus({
			// environment,
			state: 'success',
			deployment_id: deployment.data.id,
			environment_url: url,
			description: 'Deployment finished successfully.',
		});

		// core.setOutput('url', url);
	} catch (error) {
		console.log('->> Deployment Failed', error);
		await createDeploymentStatus({
			// environment,
			state: 'error',
			deployment_id: deployment.data.id,
			description: error.message,
		});
		process.exit(1);
	}

	// console.log('->> Generating markdown…');
	// const markdown = await generateMarkdownReport(results);

	// console.log('->> Committing files…');
	// await createCommit(optimisedImages);

	// console.log('->> Leaving comment on PR…');
	// await createComment(markdown);

	// return results;
};

module.exports = publish;
