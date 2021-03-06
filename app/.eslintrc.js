module.exports = {
	parser: '@typescript-eslint/parser',
	extends: [
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended',
	],
	rules: {
		// Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': 1,
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/explicit-member-accessibility': 'off',
		'@typescript-eslint/ban-ts-ignore': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'react/display-name': 'off',
	},
	plugins: ['react', 'jsx-a11y', 'import'],
	settings: {
		react: {
			version: 'detect',
		},
	},
}
