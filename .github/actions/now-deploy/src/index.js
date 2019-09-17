const {
	createDeployment,
	createDeploymentStatus,
} = require('./github-deployment');
const deploy = require('./deploy');
const { GITHUB_DEPLOYMENT_ENVIORNMENT } = require('./constants');
const core = require('@actions/core');

const run = async () => {
	const environment = GITHUB_DEPLOYMENT_ENVIORNMENT;

	console.log('->> Creating GitHub Deployment…');
	const deployment = await createDeployment({
		environment,
		description: 'Web Project',
	});

	try {
		console.log('->> Deploying to Now…');
		const response = await deploy();

		const url = `https://${response.url}`;

		console.log('->> Creating GitHub Deployment Status…');
		await createDeploymentStatus({
			// environment,
			state: 'success',
			deployment_id: deployment.data.id,
			environment_url: url,
			description: 'Deployment finished successfully.',
		});

		core.setOutput('url', url);
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

module.exports = run;
