// @flow

import type { HandlerProps } from './types'
import { transitions } from '../statechart'

const debug = require('debug')('app')

const inspectPinMode = {
	onEntry: (props: HandlerProps) => () => {
		debug('[inspectPinMode]: onEntry')
		const { map, activePinUid } = props
		const currentPin = map.pins.find((p) => p.uid === activePinUid)
		if (!currentPin) throw new Error('inspectPinMode->onEntry did not find the current pin')
		const { lat, lng } = currentPin
		const offsetY = -(window.innerHeight / 2) + 120
		const newCenter = props.utils.latLngWithPixelOffset({ lat, lng }, 0, offsetY)
		props.googleMap.panTo(newCenter)
	},

	onClick: (props: HandlerProps) => () => {
		debug('[inspectPinMode]: onClick')
		props.transition(transitions.CANCEL, { activePinUid: null })
	},
}

export default inspectPinMode
