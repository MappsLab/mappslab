// @flow

import type { HandlerProps } from './types'
import { CANCEL } from '../statechart'

const editPinMode = {
	onEntry: (props: HandlerProps) => () => {
		const { inProgressPin, map, activePinUid } = props
		const currentPin = inProgressPin || map.pins.find((p) => p.uid === activePinUid)
		if (!currentPin) throw new Error('editPinMode->onEntry did not find the current pin')
		const { lat, lang: lng } = currentPin
		const offsetY = -(window.innerHeight / 2) + 120
		const newCenter = props.utils.latLngWithPixelOffset({ lat, lng }, 0, offsetY)
		props.googleMap.panTo(newCenter)
		props.googleMap.setOptions({
			draggable: false,
			draggableCursor: 'initial',
			clickableIcons: false,
		})
	},

	onClick: (props: HandlerProps) => () => {
		props.transition(CANCEL, { activePinUid: null })
	},
}

export default editPinMode
