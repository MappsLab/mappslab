// @flow
import * as colors from './colors'
import * as mixins from './mixins'
import * as layout from './layout'
import * as text from './text'

const theme = {
	colors,
	text,
	...mixins,
	...layout,
}

export default theme
