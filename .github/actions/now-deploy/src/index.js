// const generateMarkdownReport = require('./github-markdown');
// const processImages = require('./image-processing');
// const createComment = require('./github-pr-comment');
// const createCommit = require('./github-commit');
const {
	createDeployment,
	createDeploymentStatus,
} = require('./github-deployment');
const deploy = require('./deploy');

const run = async () => {
	const environment = 'staging';

	console.log('->> Creating GitHub Deployment…');
	const deployment = await createDeployment({
		environment,
		description: 'Web Project',
	});

	console.log('depl', deployment);

	try {
		console.log('->> Deploying to Now…');
		const response = await deploy();

		const url = `https://${response.url}`;

		console.log('->> Creating GitHub Deployment Status…');
		await createDeploymentStatus({
			environment,
			state: 'success',
			deployment_id: deployment.data.id,
			target_url: url,
			description: 'Deployment finished successfully.',
		});
	} catch (error) {
		console.log('->> Deployment Failed', error);
		await createDeploymentStatus({
			environment,
			state: 'error',
			deployment_id: deployment.data.id,
			// log_url: 'https://example.com/deployment/42/output',
			description: error.message,
		});
		process.exit(1);
	}

	// console.log('->> Locating images…');

	// const results = await processImages();

	// const optimisedImages = results.images.filter(
	// 	img => img.compressionWasSignificant
	// );

	// // If nothing was optimised, bail out.
	// if (!optimisedImages.length) {
	// 	console.log('Nothing left to optimise. Stopping…');
	// 	return;
	// }

	// console.log('->> Generating markdown…');
	// const markdown = await generateMarkdownReport(results);

	// console.log('->> Committing files…');
	// await createCommit(optimisedImages);

	// console.log('->> Leaving comment on PR…');
	// await createComment(markdown);

	// return results;
};

module.exports = run;
