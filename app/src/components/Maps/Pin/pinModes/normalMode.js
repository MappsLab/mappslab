// @flow

import type { HandlerProps } from './types'
import { transitions } from '../../statechart'

const normalMode = {
	onClick: () => () => {},
	onDblClick: (props: HandlerProps) => () => {
		props.transition(transitions.CLICKED_PIN, { activePinUid: props.pin.uid })
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
