const GITHUB_TOKEN = process.env['GITHUB_TOKEN'];
const GITHUB_EVENT_NAME = process.env['GITHUB_EVENT_NAME'];
const GITHUB_EVENT_PATH = process.env['GITHUB_EVENT_PATH'];
const GITHUB_SHA = process.env['GITHUB_SHA'];
const GITHUB_REF = process.env['GITHUB_REF'];
const GITHUB_REPOSITORY = process.env['GITHUB_REPOSITORY'];

const REPO_DIRECTORY = process.env['GITHUB_WORKSPACE'];

if (!REPO_DIRECTORY) {
	console.log('There is no GITHUB_WORKSPACE environment variable');
	process.exit(1);
}

module.exports = {
	GITHUB_TOKEN,
	GITHUB_EVENT_NAME,
	GITHUB_EVENT_PATH,
	GITHUB_SHA,
	GITHUB_REF,
	GITHUB_REPOSITORY,
	REPO_DIRECTORY,
};