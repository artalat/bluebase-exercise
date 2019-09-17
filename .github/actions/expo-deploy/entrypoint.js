#!/usr/bin/env node

const { GITHUB_TOKEN } = require('./src/constants');
const core = require('@actions/core');

const publish = require('./src/publish');
const build = require('./src/build');

if (!GITHUB_TOKEN) {
	console.log('You must enable the GITHUB_TOKEN secret');
	process.exit(1);
}

const main = async () => {
	try {
		const command = core.getInput('command', { required: true });

		if (command === 'publish') {
			await publish();
		} else if (command === 'build:ios') {
			await build('ios');
		} else if (command === 'build:android') {
			await build('android');
		} else {
			throw Error('Unknown Command');
		}
	} catch (error) {
		console.log('Error', error);
		process.exit(1);
	}
};

main();
