const path = require('path')

module.exports = {
	presets: ['@babel/preset-flow', '@babel/preset-env', '@babel/preset-react'],
	env: {
		development: {
			plugins: ['flow-react-proptypes'],
		},
	},
	env: {
		development: {
			plugins: ['flow-react-proptypes'],
		},
	},
	plugins: [
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-proposal-object-rest-spread',
		'react-hot-loader/babel',
		'ramda',
	],
}
