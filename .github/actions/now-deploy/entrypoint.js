#!/usr/bin/env node

const {
	GITHUB_TOKEN,
	GITHUB_EVENT_NAME,
	GITHUB_REF,
	GITHUB_REPOSITORY,
	GITHUB_REPOSITORY_OWNER,
	GITHUB_REPOSITORY_NAME,
	GITHUB_BRANCH,
	GITHUB_SHA,
} = require('./src/constants');

const githubEvent = require('./src/github-event');
const run = require('./src/index');

if (!GITHUB_TOKEN) {
	console.log('You must enable the GITHUB_TOKEN secret');
	process.exit(1);
}

const main = async () => {
	console.log('GITHUB_EVENT_NAME', GITHUB_EVENT_NAME);
	console.log('GITHUB_REF', GITHUB_REF);
	console.log('GITHUB_REPOSITORY', GITHUB_REPOSITORY);
	console.log('GITHUB_REPOSITORY_OWNER', GITHUB_REPOSITORY_OWNER);
	console.log('GITHUB_REPOSITORY_NAME', GITHUB_REPOSITORY_NAME);
	console.log('GITHUB_BRANCH', GITHUB_BRANCH);
	console.log('GITHUB_SHA', GITHUB_SHA);

	// const event = await githubEvent();

	// console.log('event', event);
	try {
		await run();
	} catch (error) {
		console.log('Error', error);
		process.exit(1);
	}
};

main();
