/* eslint-disable no-console */
import 'jest-styled-components'
// add some helpful assertions
import 'jest-dom/extend-expect'
// this is basically: afterEach(cleanup)
import 'react-testing-library/cleanup-after-each'

// Mock JSDom console for cleaner error reporting
// console.error = (err) => {
// 	throw new Error(err)
// }
// console.warn = (warning) => {
// 	throw new Error(warning)
// }

global.requestAnimationFrame = (callback) => {
	setTimeout(callback, 0)
}
