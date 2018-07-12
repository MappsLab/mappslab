const path = require('path')

module.exports = {
	presets: [
		'@babel/preset-flow',
		[
			'@babel/preset-env',
			{
				modules: false,
				targets: {
					browsers: ['last 2 versions'],
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
				alias: {
					Constants: path.resolve(__dirname, 'constants'),
					Components: path.resolve(__dirname, 'components'),
					Views: path.resolve(__dirname, 'views'),
					Utils: path.resolve(__dirname, 'utils'),
					Queries: path.resolve(__dirname, 'queries'),
					Types: path.resolve(__dirname, 'types'),
					Styles: path.resolve(__dirname, 'styles'),
					mapp: path.resolve(__dirname, '../packages/mapp/src'),
				},
			},
		],
		'babel-plugin-styled-components',
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-proposal-object-rest-spread',
		'@babel/plugin-proposal-export-default-from',
		'react-hot-loader/babel',
		'graphql-tag',
		'lodash',
		'ramda',
	],
}
