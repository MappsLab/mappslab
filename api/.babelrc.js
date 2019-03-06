const path = require('path')

module.exports = {
	presets: [
		'@babel/preset-flow',
		[
			'@babel/preset-env',
			{
				targets: {
					node: 'current',
				},
			},
		],
	],
	plugins: [
		[
			'babel-plugin-module-resolver',
			{
				root: [`./src`],
				alias: {
					GraphQL: './src/graphql',
					Models: './src/models',
					Utils: './src/utils',
					Database: './src/database',
					Config: './src/config',
					Errors: './src/errorTypes',
					Types: './src/types',
				},
				cwd: 'packagejson',
			},
		],
		'@babel/plugin-proposal-object-rest-spread',
		'@babel/plugin-proposal-export-default-from',
	],
	ignore: ['node_modules', 'build'],
}
