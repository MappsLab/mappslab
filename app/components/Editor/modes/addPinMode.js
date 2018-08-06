// @flow

import { CANCEL } from './statechart'
import type { EditorProps, EditorState } from '../Editor'

const addPinMode = (initialProps) => ({
	onEntry: (props) => () => {
		// parent.setState(({ mapOptions }) => ({
		// 	mapOptions: {
		// 		...mapOptions,
		// 		draggable: true,
		// 		draggableCursor: 'url("/images/newPin.svg") 18 49, crosshair',
		// 		clickableIcons: true,
		// 	},
		// }))
	},

	onClick: (props) => (e) => {
		props.transition(CANCEL)
		const clickLatLng = {
			lat: e.latLng.lat(),
			lng: e.latLng.lng(),
		}
		const inProgressPin = {
			lat: clickLatLng.lat,
			lang: clickLatLng.lng,
			// owner: parent.props.viewer,
		}
		// parent.props.transition(NEXT, { center: clickLatLng, inProgressPin })
	},
})

export default addPinMode
