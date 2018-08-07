// @flow
import { NEXT } from '../statechart'

import type { HandlerProps } from './types'

const addPinMode = {
	onEntry: (props: HandlerProps) => () => {
		props.googleMap.setOptions({
			draggable: true,
			draggableCursor: 'url("/images/newPin.svg") 18 49, crosshair',
			clickableIcons: false,
		})
	},

	onClick: (props: HandlerProps) => (e) => {
		const tempUid = '__temp__uid__'
		const clickLatLng = {
			lat: e.latLng.lat(),
			lng: e.latLng.lng(),
		}
		const inProgressPin = {
			uid: tempUid,
			title: '',
			description: '',
			lat: clickLatLng.lat,
			lang: clickLatLng.lng,
			owner: props.viewer,
		}
		props.transition(NEXT, { activePinUid: tempUid, inProgressPin })
	},
}

export default addPinMode
