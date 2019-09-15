function extractAppFileUrl(log) {
	const urlRegex = /\bhttps?:\/\/expo.io\/artifacts\S+/gi;
	return log.match(urlRegex)[0];
}

function extractBundleUrl(log) {
	const urlRegex = /\bhttps?:\/\/exp.host\S+/gi;
	return log.match(urlRegex)[0];
}

module.exports = {
	extractAppFileUrl,
	extractBundleUrl,
};
