const deepMerge = require('deepmerge')
const baseConfig = require('../.eslintrc')

const config = deepMerge(
	{
		env: {
			jest: true,
		},
	},
	baseConfig,
)

module.exports = config
