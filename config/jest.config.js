// @flow
const path = require('path')

module.exports = () => ({
	moduleFileExtensions: ['js'],
	setupTestFrameworkScriptFile: path.resolve(__dirname, './jest/setup.js'),
	testMatch: ['**/__tests__/**/*.test.js'],
	coveragePathIgnorePatterns: ['node_modules', 'coverage', '/__.*__/', 'jest.config.js'],
	testEnvironment: 'jsdom',
	coverageDirectory: path.resolve(__dirname, 'coverage'),
})
