const baseConfig = require('../../../.eslintrc')

module.exports = {
	...baseConfig,
	extends: [...baseConfig.extends, 'plugin:jest/recommended'],
}
