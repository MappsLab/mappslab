// @flow

import type { HandlerProps } from './types'
import { CLICKED_PIN } from '../../statechart'

const normalMode = {
	onClick: () => () => {},
	onDblClick: (props: HandlerProps) => () => {
		props.transition(CLICKED_PIN)({ activePinUid: props.pin.uid })
	},

	onMouseOver: () => () => {
		const newState = { mouseOver: true }
		return newState
	},

	onMouseOut: () => () => {
		const newState = { mouseOver: false }
		return newState
	},
}

export default normalMode
