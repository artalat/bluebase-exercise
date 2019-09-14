const { createDeployment } = require('now-client');
const slugify = require('slugify');
const { GITHUB_REPOSITORY_NAME } = require('./constants');

async function deploy() {
	let deployment;

	const name = slugify(GITHUB_REPOSITORY_NAME);

	for await (const event of createDeployment('build/web/client', {
		token: 'PePP7RTGA5sfArALVFyHkOjd',
		name,
		alias: ['my-alias-123'],
	})) {
		// console.log('event', event);
		// console.log('-------------------');
		if (event.type === 'ready') {
			deployment = event.payload;
			break;
		}
	}

	console.log('deployed at: ', deployment.url);
	return deployment;
}

module.exports = deploy;
