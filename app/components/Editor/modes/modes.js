// @flow
import * as React from 'react'

import { NORMAL, ADD_PIN, ADD_PIN_INFO, NEXT } from './statechart'

const normalMode = (parent: React.Component) => ({
	handleClick: () => {
		console.log('normal mode handleclick')
	},
})

const addPinMode = (parent: React.Component) => ({
	handleClick: (e) => {
		const clickLatLng = {
			lat: e.latLng.lat(),
			lng: e.latLng.lng(),
		}
		const newPin = {
			lat: clickLatLng.lat,
			lang: clickLatLng.lng,
		}
		parent.props.transition(NEXT, { center: clickLatLng, newPin })
	},
})

const addPinInfoMode = (parent: React.Component) => ({
	handleClick: (e) => {
		console.log('titlePinMode')
	},
})

export const modes = {
	[NORMAL]: normalMode,
	[ADD_PIN]: addPinMode,
	[ADD_PIN_INFO]: addPinInfoMode,
}
