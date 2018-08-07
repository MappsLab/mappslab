// @flow

import type { HandlerProps } from './types'

const editPinMode = {
	onEntry: (props: HandlerProps) => () => {
		const { inProgressPin, map, activePinUid } = props
		const currentPin = inProgressPin || map.pins.find((p) => p.uid === activePinUid)
		if (!currentPin) throw new Error('editPinMode->onEntry did not find the current pin')
		props.googleMap.panTo({
			lat: currentPin.lat,
			lng: currentPin.lang,
		})
		props.googleMap.setOptions({
			draggable: false,
			draggableCursor: 'initial',
			clickableIcons: false,
		})
	},

	onClick: (props: HandlerProps) => (e) => {
		console.log('clicked. Outside the editor box?')
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

export default editPinMode
