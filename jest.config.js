// @flow
const path = require('path')

module.exports = () => ({
	moduleFileExtensions: ['js', 'web.js', 'native.js'],
	setupFiles: [path.resolve(__dirname, './jest/shims.js'), path.resolve(__dirname, './jest/adapter.js')],
	setupTestFrameworkScriptFile: path.resolve(__dirname, './jest/setupTest.js'),
	snapshotSerializers: ['enzyme-to-json/serializer'],
	testMatch: ['**/__tests__/**/*.test.js'],
})
