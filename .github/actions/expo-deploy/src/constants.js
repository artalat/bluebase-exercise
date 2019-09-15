// const meta = require('github-action-meta');
const slugify = require('slugify');

const EXPO_CLI_USERNAME = process.env['EXPO_CLI_USERNAME'];
const EXPO_CLI_PASSWORD = process.env['EXPO_CLI_PASSWORD'];
const GITHUB_TOKEN = process.env['GITHUB_TOKEN'];

const GITHUB_EVENT_NAME = process.env['GITHUB_EVENT_NAME'];
const GITHUB_EVENT_PATH = process.env['GITHUB_EVENT_PATH'];
const GITHUB_SHA = process.env['GITHUB_SHA'];
const GITHUB_REF = process.env['GITHUB_REF'];
const GITHUB_REPOSITORY = process.env['GITHUB_REPOSITORY'];
const REPO_DIRECTORY = process.env['GITHUB_WORKSPACE'];

const GITHUB_REPOSITORY_OWNER = GITHUB_REPOSITORY.split('/')[0]; // meta.git.owner;
const GITHUB_REPOSITORY_NAME = GITHUB_REPOSITORY.split('/')[1]; // meta.git.name;
const GITHUB_BRANCH = process.env['GITHUB_REF'].substring(11); //meta.git.branch;

if (!REPO_DIRECTORY) {
	console.log('There is no GITHUB_WORKSPACE environment variable');
	process.exit(1);
}

let GITHUB_DEPLOYMENT_ENVIORNMENT = 'expo-dev';

if (GITHUB_BRANCH === 'staging') {
	GITHUB_DEPLOYMENT_ENVIORNMENT = 'expo-staging';
} else if (GITHUB_BRANCH === 'master') {
	GITHUB_DEPLOYMENT_ENVIORNMENT = 'expo-production';
}

let EXPO_RELEASE_CHANNEL = slugify(GITHUB_BRANCH);

if (GITHUB_BRANCH === 'staging') {
	EXPO_RELEASE_CHANNEL = 'staging';
} else if (GITHUB_BRANCH === 'master') {
	EXPO_RELEASE_CHANNEL = 'production';
}

module.exports = {
	EXPO_CLI_USERNAME,
	EXPO_CLI_PASSWORD,
	EXPO_RELEASE_CHANNEL,
	GITHUB_DEPLOYMENT_ENVIORNMENT,
	GITHUB_TOKEN,
	GITHUB_EVENT_NAME,
	GITHUB_EVENT_PATH,
	GITHUB_SHA,
	GITHUB_REF,
	GITHUB_REPOSITORY,
	GITHUB_REPOSITORY_OWNER,
	GITHUB_REPOSITORY_NAME,
	GITHUB_BRANCH,
	REPO_DIRECTORY,
};
