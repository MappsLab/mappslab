module.exports = {
	presets: [
		'@babel/preset-flow',
		[
			'@babel/preset-env',
			{
				modules: false,
				targets: {
					browsers: ['last 3 versions'],
				},
			},
		],
		'@babel/preset-react',
	],
	env: {
		development: {
			plugins: ['flow-react-proptypes'],
		},
		test: {
			presets: [
				[
					'@babel/preset-env',
					{
						modules: 'commonjs',
					},
				],
			],
		},
	},
	plugins: [
		[
			'babel-plugin-module-resolver',
			{
				root: ['./'],
				alias: {
					Constants: './constants',
					Components: './components',
					Views: './views',
					Utils: './utils',
					Queries: './queries',
					Types: './types',
					Styles: './theme',
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
