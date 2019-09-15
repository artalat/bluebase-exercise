const api = require('./github-api');
const githubEvent = require('./github-event');
const {
	GITHUB_BRANCH,
	GITHUB_REF,
	// GITHUB_REPOSITORY_ORG,
	// GITHUB_REPOSITORY_NAME,
} = require('./constants');

const createDeployment = async deployment => {
	const event = await githubEvent();
	const owner = event.repository.owner.login;
	const repo = event.repository.name;

	return api.repos.createDeployment({
		owner,
		repo,
		ref: GITHUB_BRANCH,
		required_contexts: [],
		auto_merge: false,
		...deployment,
	});
};

const createDeploymentStatus = async status => {
	const event = await githubEvent();
	const owner = event.repository.owner.login;
	const repo = event.repository.name;

	return api.repos.createDeploymentStatus({
		owner,
		repo,
		...status,
	});
};

module.exports = {
	createDeployment,
	createDeploymentStatus,
};
