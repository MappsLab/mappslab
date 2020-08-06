import * as React from 'react'
import { useState } from 'react'
import { useCurrentMap } from '../../providers/CurrentMap'
import { WelcomeDialog } from './WelcomeDialog'
import { MapNavigation } from './MapNavigation'
import { MapNotifications } from './MapNotifications'
import { MapData } from './MapData'
import { useCurrentViewer } from '../../providers/CurrentViewer'
import { Tools } from './Tools'
import { NotLoggedIn } from './NotLoggedIn'
import _ from 'lodash'
import { unwindEdges } from '@good-idea/unwind-edges'
import { useCreatePinMutation } from '../../queries/Pin'
import { useGoogleMap } from '@react-google-maps/api'

const { useEffect } = React

interface MapEventsProps {
	mapUid: string
}

export const MapEvents = ({ mapUid }: MapEventsProps) => {
	const googleMap = useGoogleMap()
	const { mode, addEventListeners, removeEventListeners, transitionMode, createNewPin } = useCurrentMap()

	useEffect(() => {
		const listeners = addEventListeners({
			onBoundsChanged: () => {},
			onCenterChanged: () => {},
			onClick: async (event) => {
				switch (true) {
					case mode.matches('Lesson.DropPin.DropMode'):
						const position = {
							lat: event.latLng.lat(),
							lng: event.latLng.lng(),
						}
						googleMap?.panTo(position)
						createNewPin({
							...position,
							addToMaps: [mapUid],
						})
						break
					default:
						transitionMode({
							type: 'close',
						})
						break
				}
			},
			onDblClick: () => {},
			onDrag: () => {},
			onDragEnd: () => {},
			onDragStart: () => {},
			onHeadingChanged: () => {},
			onIdle: () => {},
			onMapTypeIdChanged: () => {},
			onMouseMove: () => {},
			onMouseOut: () => {},
			onMouseOver: () => {},
			onProjectionChanged: () => {},
			onResize: () => {},
			onRightClick: () => {},
			onTilesLoaded: () => {},
			onTiltChanged: () => {},
			onZoomChanged: () => {},
		})
		return () => removeEventListeners(listeners)
	})

	return null
}
