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

const { useEffect } = React

interface MapEventsProps {
	mapUid: string
}

export const MapEvents = ({ mapUid }: MapEventsProps) => {
	const { mode, addEventListeners, removeEventListeners, transitionMode } = useCurrentMap()
	const [createPin] = useCreatePinMutation()

	useEffect(() => {
		const listeners = addEventListeners({
			onBoundsChanged: () => {},
			onCenterChanged: () => {},
			onClick: async (event) => {
				switch (true) {
					case mode.matches('Lesson.DropPin.DropMode'):
						await createPin({
							variables: {
								input: {
									lat: event.latLng.lat(),
									lng: event.latLng.lng(),
									addToMaps: [mapUid],
								},
							},
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
