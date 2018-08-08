const path = require('path')

module.exports = {
	parser: 'babel-eslint',
	env: {
		browser: true,
		node: true,
	},
	settings: {
		'import/resolver': {
			alias: {
				map: [
					['Constants', path.resolve(__dirname, 'constants')],
					['Components', path.resolve(__dirname, 'components')],
					['Views', path.resolve(__dirname, 'views')],
					['Utils', path.resolve(__dirname, 'utils')],
					['Queries', path.resolve(__dirname, 'queries')],
					['Types', path.resolve(__dirname, 'types')],
					['Styles', path.resolve(__dirname, 'theme')],
					['mapp', path.resolve(__dirname, '..', 'packages', 'mapp', 'src')],
				],
				extensions: ['.js', '.jsx'],
			},

			node: {
				extensions: ['.js'],
			},
		},
	},
	extends: ['airbnb', 'prettier', 'plugin:flowtype/recommended'],
	rules: {
		'no-underscore-dangle': 0,
		'no-nested-ternary': 0,
		'jsx-a11y/anchor-is-valid': 0,
		'react/destructuring-assignment': 0,
		'react/jsx-indent': [2, 'tab'],
		'react/jsx-indent-props': [2, 'tab'],
		'react/jsx-one-expression-per-line': 0,
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
}
