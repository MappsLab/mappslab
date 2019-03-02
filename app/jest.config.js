// @flow
const path = require('path')

module.exports = {
	setupFilesAfterEnv: [require.resolve('./jest/setup.js')],
	testMatch: ['**/__tests__/**/*.test.js'],
	coveragePathIgnorePatterns: ['node_modules', 'coverage', '/__.*__/'],
	testEnvironment: 'jsdom',
	testURL: 'http://localhost',
	coverageDirectory: path.resolve(__dirname, 'coverage'),
	// transformIgnorePatterns: ['^Shared/mockUtilsSchema'],
	// transform: {
	// 	'^.+\\.jsx?$': 'babel-jest',
	// },
}
