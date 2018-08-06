// @flow
import { pushPath } from 'Utils/data'
import { NEXT } from './statechart'
import type { EditorProps } from '../Editor'

const addPinMode = () => ({
	onEntry: (props: EditorProps) => () => {
		props.updateMapOptions({
			draggable: true,
			draggableCursor: 'url("/images/newPin.svg") 18 49, crosshair',
			clickableIcons: false,
		})
		// parent.setState(({ mapOptions }) => ({
		// 	mapOptions: {
		// 		...mapOptions,
		// 	},
		// }))
	},

	onClick: (props: EditorProps) => (e) => {
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
		const map = pushPath(['pins'], inProgressPin)(props.map)
		props.transition(NEXT, { map, activePinUid: tempUid })
	},
})

export default addPinMode
