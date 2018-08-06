// @flow

// import { NEXT } from './statechart'
// import type { EditorProps } from '../Editor'

const editPinMode = () => ({
	onEntry: (props) => () => {
		const { map, activePinUid } = props
		const activePin = map.pins.find((p) => p.uid === activePinUid)
		console.log(activePin)
		props.updateMapOptions({
			draggable: false,
			draggableCursor: 'url("/images/newPin.svg") 18 49, crosshair',
			clickableIcons: false,
			center: {
				lat: activePin.lat,
				lng: activePin.lang,
			},
		})
	},

	onClick: (props) => (e) => {
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
})

export default editPinMode
