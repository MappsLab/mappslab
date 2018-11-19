// @flow
const path = require('path')

module.exports = {
	moduleFileExtensions: ['js'],
	testMatch: ['**/__tests__/*.test.js'],
	coveragePathIgnorePatterns: ['node_modules', 'coverage', '/__.*__/', 'jest.config.js'],
	coverageDirectory: path.resolve(__dirname, 'coverage'),
	rootDir: './src',
	// transform: {
	// 	'^.+\\.js$': 'babel-jest',
	// },
}
