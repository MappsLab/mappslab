// @flow
/* eslint-disable no-unused-prop-types */

import * as React from 'react'
import type { EditorProps, EditorState } from '../Editor'

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

const addPinMode = (parent: React.Component<EditorProps, EditorState>) => ({
	onEntry: () => {
		parent.setState(({ mapOptions }) => ({
			mapOptions: {
				...mapOptions,
				draggable: true,
				draggableCursor: 'url("/images/newPin.svg") 18 49, crosshair',
				clickableIcons: true,
			},
		}))
	},

	handleMapClick: (e) => {
		const clickLatLng = {
			lat: e.latLng.lat(),
			lng: e.latLng.lng(),
		}
		const inProgressPin = {
			lat: clickLatLng.lat,
			lang: clickLatLng.lng,
			owner: parent.props.viewer,
		}
		parent.props.transition(NEXT, { center: clickLatLng, inProgressPin })
	},
})

// const addPinInfoMode = (parent: React.ComponentType<any>) => ({
// 	handleClick: (e) => {
// 		// todo, prompt cancel
// 	},
// })
