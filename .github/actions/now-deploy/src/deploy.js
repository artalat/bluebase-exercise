const { createDeployment } = require('now-client');
const slugify = require('slugify');
const {
	GITHUB_REPOSITORY_NAME,
	NOW_TOKEN,
	NOW_TARGET,
	NOW_CONFIGS,
} = require('./constants');

async function deploy() {
	let deployment;

	const name = slugify(GITHUB_REPOSITORY_NAME);

	for await (const event of createDeployment('build/web/client', {
		token: NOW_TOKEN,
		target: NOW_TARGET,
		name,
		alias: [name],
		...NOW_CONFIGS,
	})) {
		if (event.type === 'ready') {
			deployment = event.payload;
			break;
		}
		if (event.type === 'error') {
			throw Error(event.payload.message);
		}
	}

	return deployment;
}

module.exports = deploy;
