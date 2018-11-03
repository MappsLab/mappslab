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
		production: {
			plugins: ['graphql-tag'],
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
					Constants: './src/constants',
					Components: './src/components',
					Views: './src/views',
					Utils: './src/utils',
					Queries: './src/queries',
					Types: './src/types',
					Styles: './src/theme',
					Test: './src/__tests__',
					Jest: './jest',
				},
			},
		],
		'babel-plugin-styled-components',
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-proposal-object-rest-spread',
		'@babel/plugin-proposal-export-default-from',
		'react-hot-loader/babel',
		'lodash',
		'ramda',
	],
}
