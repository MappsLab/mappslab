// @flow

import type { HandlerProps } from './types'

const editPinMode = {
	onClick: (props: HandlerProps) => (e) => {
		console.log('clicked. Outside the editor box?')
		// const clickLatLng = {
		// 	lat: e.latLng.lat(),
		// 	lng: e.latLng.lng(),
		// }
		// const inProgressPin = {
		// 	uid: '__temp__uid__',
		// 	lat: clickLatLng.lat,
		// 	lng: clickLatLng.lng,
		// 	owner: props.viewer,
		// }
		// props.transition(NEXT, { inProgressPin })
	},
}

export default editPinMode
