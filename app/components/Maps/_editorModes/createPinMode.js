// @flow
import { transitions, createPinStates } from '../statechart'

import type { HandlerProps } from './types'

const debug = require('debug')('app')

const createPinMode = {
	[createPinStates.DROP_PIN]: {
		onEntry: (props: HandlerProps) => () => {
			debug('[createPinMode.dropPin]: onEntry')
			props.googleMap.setOptions({
				draggable: true,
				draggableCursor: 'url("/images/newPin.svg") 18 49, crosshair',
				clickableIcons: false,
			})
		},
		onClick: (props: HandlerProps) => (e) => {
			debug('[createPinMode]: onClick')
			const tempUid = '__temp__uid__'
			const { lat, lng } = {
				lat: e.latLng.lat(),
				lng: e.latLng.lng(),
			}
			const inProgressPin = {
				uid: tempUid,
				title: '',
				description: '',
				lat,
				lng,
				owner: props.viewer,
			}
			props.transition(transitions.NEXT, { activePinUid: tempUid, inProgressPin })
		},
	},
	[createPinStates.DETAILS]: {
		onEntry: (props: HandlerProps) => () => {
			debug('[createPinMode.details]: onEntry')
			props.googleMap.setOptions({
				draggable: false,
				draggableCursor: 'initial',
				clickableIcons: false,
			})
		},
	},
}

export default createPinMode
