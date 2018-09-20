// @flow

import type { HandlerProps } from './types'
import { CANCEL } from '../statechart'

const inspectPinMode = {
	onEntry: (props: HandlerProps) => () => {
		const { map, activePinUid } = props
		const currentPin = map.pins.find((p) => p.uid === activePinUid)
		if (!currentPin) throw new Error('inspectPinMode->onEntry did not find the current pin')
		const { lat, lng: lng } = currentPin
		const offsetY = -(window.innerHeight / 2) + 120
		const newCenter = props.utils.latLngWithPixelOffset({ lat, lng }, 0, offsetY)
		props.googleMap.panTo(newCenter)
	},

	onClick: (props: HandlerProps) => () => {
		props.transition(CANCEL, { activePinUid: null })
	},
}

export default inspectPinMode
