#!/usr/bin/env node

const { GITHUB_TOKEN } = require('./src/constants');

const publish = require('./src/publish');

if (!GITHUB_TOKEN) {
	console.log('You must enable the GITHUB_TOKEN secret');
	process.exit(1);
}

const main = async () => {
	try {
		await publish();
	} catch (error) {
		console.log('Error', error);
		process.exit(1);
	}
};

main();
