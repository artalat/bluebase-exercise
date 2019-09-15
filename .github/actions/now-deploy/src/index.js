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

	console.log('->> Creating GitHub Deployment Status…');
	await createDeploymentStatus(deployment.id, {
		environment,
		state: 'in_progress',
		// log_url: 'https://example.com/deployment/42/output',
		description: 'Deployment finished successfully.',
	});

	try {
		console.log('->> Deploying to Now…');
		await deploy();
	} catch (error) {
		console.log('->> Deployment Failed', error);
		await createDeploymentStatus(deployment.id, {
			environment,
			state: 'error',
			// log_url: 'https://example.com/deployment/42/output',
			description: error.message,
		});
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
