const path = require('path')

module.exports = function(api) {
	const env = api.env()
	const projectRoot = env === 'development' ? path.resolve(__dirname, 'src') : path.resolve(__dirname, 'dist')
	api.cache(env === 'development')
	return {
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
						GraphQL: path.resolve(projectRoot, 'graphql'),
						Models: path.resolve(projectRoot, 'models'),
						Utils: path.resolve(projectRoot, 'utils'),
						Database: path.resolve(projectRoot, 'database'),
						Config: path.resolve(projectRoot, 'config'),
						Errors: path.resolve(projectRoot, 'errorTypes'),
						Types: path.resolve(projectRoot, 'types'),
					},
					// cwd: 'babelrc',
				},
			],
			'@babel/plugin-proposal-object-rest-spread',
			'@babel/plugin-proposal-export-default-from',
		],
		ignore: ['node_modules', 'build'],
	}
}
