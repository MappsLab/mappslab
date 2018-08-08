// @flow

import type { HandlerProps } from './types'

const normalMode = {
	onEntry: (props: HandlerProps) => () => {
		props.googleMap.setOptions({
			draggable: true,
			draggableCursor: undefined,
		})
	},
	onClick: () => () => {},
}

export default normalMode
