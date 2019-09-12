const configs = require('@bluebase/code-standards/jest.config');

module.exports = Object.assign(configs, {
	setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
	coverageThreshold: {
		global: {
			branches: 5,
			functions: 5,
			lines: 5,
			statements: 5,
		},
	},
});
