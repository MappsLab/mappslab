module.exports = {
	automock: false,
	moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'graphql'],

	testMatch: [
		'**/__tests__/**/*.test.js',
		'**/__tests__/**/*.test.tsx',
		'**/__tests__/**/*.test.ts',
	],

	coveragePathIgnorePatterns: [
		'node_modules',
		'coverage',
		'/__.*__/',
		'jest.config.js',
		'./src/types',
	],
	collectCoverage: false,
	transform: {
		'^.+\\.graphql$': 'jest-transform-graphql',
		'^.+\\.tsx?$': 'ts-jest',
	},
}
