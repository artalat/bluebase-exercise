const { createDeployment } = require('now-client');

async function deploy() {
	let deployment;

	for await (const event of createDeployment('build/web/client', {
		token: 'PePP7RTGA5sfArALVFyHkOjd',
		name: 'bluebase-exercise',
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

deploy();
