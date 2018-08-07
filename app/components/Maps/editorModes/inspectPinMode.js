// @flow

import type { HandlerProps } from './types'
import { CANCEL } from '../statechart'

const inspectPinMode = {
	onEntry: (props: HandlerProps) => () => {
		const { map, activePinUid } = props
		const currentPin = map.pins.find((p) => p.uid === activePinUid)
		if (!currentPin) throw new Error('inspectPinMode->onEntry did not find the current pin')
		const { lat, lang: lng } = currentPin
		const offsetY = -(window.innerHeight / 2) + 120
		const newCenter = props.utils.latLngWithPixelOffset({ lat, lng }, 0, offsetY)
		// props.googleMap.panTo({ lat: 100})
		// props.googleMap.setOptions({
		// 	draggable: false,
		// 	draggableCursor: 'initial',
		// 	clickableIcons: false,
		// })
		console.log(newCenter.lat(), newCenter.lng())
		props.googleMap.panTo(newCenter)
	},

	onClick: (props: HandlerProps) => (e) => {
		props.transition(CANCEL, { activePinUid: null })
		// const clickLatLng = {
		// 	lat: e.latLng.lat(),
		// 	lng: e.latLng.lng(),
		// }
		// const inProgressPin = {
		// 	uid: '__temp__uid__',
		// 	lat: clickLatLng.lat,
		// 	lang: clickLatLng.lng,
		// 	owner: props.viewer,
		// }
		// props.transition(NEXT, { inProgressPin })
	},
}

export default inspectPinMode
