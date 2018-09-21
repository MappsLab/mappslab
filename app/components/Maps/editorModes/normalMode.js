// @flow

import type { HandlerProps } from './types'

const debug = require('debug')('app')

const normalMode = {
	onEntry: (props: HandlerProps) => () => {
		debug('[normalMode]: onEntry')
		props.googleMap.setOptions({
			draggable: true,
			draggableCursor: undefined,
		})
	},
	onClick: () => () => {
		debug('[normalMode]: onClick')
	},
}

export default normalMode
