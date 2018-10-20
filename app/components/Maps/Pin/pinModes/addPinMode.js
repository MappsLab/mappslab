// @flow

import type { HandlerProps } from './types'
import { transitions } from '../../statechart'

const addPinMode = {
	onClick: (props: HandlerProps) => (/* event */) => {
		console.log('!!!!!')
		props.transition(transitions.CONNECT_PIN, { connectTo: props.pin })
	},
}

export default addPinMode
