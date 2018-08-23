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
				root: ['/'],
				alias: {
					GraphQL: path.resolve(__dirname, 'graphql'),
					Models: path.resolve(__dirname, 'models'),
					Utils: path.resolve(__dirname, 'utils'),
					Database: path.resolve(__dirname, 'database'),
					Config: path.resolve(__dirname, 'config'),
					Errors: path.resolve(__dirname, 'errorTypes'),
				},
				// cwd: 'babelrc',
			},
		],
		'@babel/plugin-proposal-object-rest-spread',
		'@babel/plugin-proposal-export-default-from',
	],
	ignore: ['node_modules', 'build'],
}
