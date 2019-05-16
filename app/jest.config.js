// @flow
const path = require('path')

module.exports = {
	setupFilesAfterEnv: [require.resolve('./jest/setup.js')],
	setupFiles: ['<rootDir>/jest/init.js'],
	testMatch: ['**/__tests__/**/*.test.js', '**/__tests__/**/*.test.tsx', '**/__tests__/**/*.test.ts'],
	coveragePathIgnorePatterns: ['node_modules', 'coverage', '/__.*__/'],
	testEnvironment: 'jsdom',
	testURL: 'http://localhost',
	coverageDirectory: path.resolve(__dirname, 'coverage'),
	transform: {
		'^.+\\.jsx?$': 'babel-jest',
		'^.+\\.tsx?$': 'ts-jest',
	},
	moduleNameMapper: {
		'Components/(.*)': '<rootDir>/src/components/$1',
		'Views/(.*)': '<rootDir>/src/views/$1',
		'GraphQL/(.*)': '<rootDir>/src/graphql/$1',
		'Types/(.*)': '<rootDir>/src/types-ts/$1',
		'Providers/(.*)': '<rootDir>/src/providers/$1',
		'Utils/(.*)': '<rootDir>/src/utils/$1',
		'Jest/(.*)': '<rootDir>/jest/$1',
		mapp: '<rootDir>/../packages/mapp/dist',
	},

	// transformIgnorePatterns: ['^Shared/mockUtilsSchema'],
	// transform: {
	// },
}
