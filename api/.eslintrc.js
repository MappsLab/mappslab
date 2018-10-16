const path = require('path')

module.exports = {
	parser: 'babel-eslint',
	env: {
		browser: true,
		node: true,
		jest: true,
	},
	extends: ['airbnb', 'prettier', 'plugin:flowtype/recommended'],
	rules: {
		'no-underscore-dangle': 0,
		'no-nested-ternary': 0,
		'jsx-a11y/anchor-is-valid': 0,
		'import/no-cycle': 0,
		'react/jsx-indent': [2, 'tab'],
		'react/jsx-indent-props': [2, 'tab'],
		'react/jsx-filename-extension': [
			1,
			{
				extensions: ['.js', '.jsx'],
			},
		],
		'import/prefer-default-export': 0,
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: true,
			},
		],
	},
	plugins: ['react', 'jsx-a11y', 'import', 'flowtype'],
	settings: {
		'import/resolver': {
			alias: [
				['GraphQL', path.resolve(__dirname, 'graphql')],
				['Models', path.resolve(__dirname, 'models')],
				['Utils', path.resolve(__dirname, 'utils')],
				['Database', path.resolve(__dirname, 'database')],
				['Config', path.resolve(__dirname, 'config')],
				['Errors', path.resolve(__dirname, 'errorTypes')],
				['Types', path.resolve(__dirname, 'types')],
			],
		},
	},
}
