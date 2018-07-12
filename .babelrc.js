const useModules = isTest || String(process.env.BABEL_MODULES) === 'true'

module.exports = {
	presets: [
		'@babel/preset-flow',
		[
			'@babel/preset-env',
			{
				modules: useModules ? 'commonjs' : false,
				targets: {
					browsers: ['last 2 versions'],
					node: 'current',
				},
			},
		],
		'@babel/preset-react',
	],
	env: {
		development: {
			plugins: ['flow-react-proptypes'],
		},
	},
	plugins: [
		[
			'babel-plugin-module-resolver',
			{
				root: ['./src'],
				alias: {
					App: './app',
					Api: './api',
					Styles: './app/styles',
					mapp: './packages/mapp/src',
				},
				cwd: 'babelrc',
			},
		],
		'babel-plugin-styled-components',
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-proposal-object-rest-spread',
		'react-hot-loader/babel',
		'ramda',
	],
}
