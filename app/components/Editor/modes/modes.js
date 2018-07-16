// @flow
import * as React from 'react'

import {
	// NORMAL,
	ADD_PIN,
	// ADD_PIN_INFO,
	NEXT,
} from './statechart'

// const normalMode = (parent: React.ComponentType<any>) => ({
// 	handleClick: () => {
// 		// console.log('normal mode handleclick')
// 	},
// })

const addPinMode = (parent: React.Component<any>) => ({
	handleClick: (e) => {
		const clickLatLng = {
			lat: e.latLng.lat(),
			lng: e.latLng.lng(),
		}
		const inProgressPin = {
			lat: clickLatLng.lat,
			lang: clickLatLng.lng,
		}
		parent.props.transition(NEXT, { center: clickLatLng, inProgressPin })
	},
})

// const addPinInfoMode = (parent: React.ComponentType<any>) => ({
// 	handleClick: (e) => {
// 		// todo, prompt cancel
// 	},
// })

export const modes = {
	// [NORMAL]: normalMode,
	[ADD_PIN]: addPinMode,
	// [ADD_PIN_INFO]: addPinInfoMode,
}
