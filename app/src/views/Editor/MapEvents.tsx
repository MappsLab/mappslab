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
import { useInspector } from './ItemInspector'
import { Maybe, Position } from '../../types-ts'

const { useEffect } = React

interface MapEventsProps {
	mapUid: string
}

export const MapEvents = ({ mapUid }: MapEventsProps) => {
	const googleMap = useGoogleMap()
	const { inspectItem } = useInspector()
	const {
		mode,
		addEventListeners,
		removeEventListeners,
		transitionMode,
		createNewPin,
	} = useCurrentMap()

	const handleCreateNewPin = async (event) => {
		const position = {
			lat: event.latLng.lat(),
			lng: event.latLng.lng(),
		}
		const { connectToPin } = mode.context
		console.log(connectToPin)
		const newPin = await createNewPin({
			...position,
			addToRoute: connectToPin
				? {
						connectToPin: connectToPin.pin.uid,
						position: connectToPin.position as Maybe<Position>,
				  }
				: undefined,
			addToMaps: [mapUid],
		})
		if (!newPin) return
		googleMap?.panTo(position)
		if (connectToPin) {
			transitionMode({
				type: 'enterConnect',
				context: {
					connectToPin: {
						pin: newPin,
						position: connectToPin?.position || 'AFTER',
					},
				},
			})
		} else {
			inspectItem(newPin, position)
			transitionMode({ type: 'droppedPin' })
		}
	}

	useEffect(() => {
		const listeners = addEventListeners({
			onBoundsChanged: () => undefined,
			onCenterChanged: () => undefined,
			onClick: async (event) => {
				switch (true) {
					case mode.matches('Lesson.DropPin.DropMode.Connect'):
					case mode.matches('Lesson.DropPin.DropMode'):
						await handleCreateNewPin(event)
						break
					default:
						transitionMode({ type: 'close' })
						break
				}
			},
			onDblClick: () => undefined,
			onDrag: () => undefined,
			onDragEnd: () => undefined,
			onDragStart: () => undefined,
			onHeadingChanged: () => undefined,
			onIdle: () => undefined,
			onMapTypeIdChanged: () => undefined,
			onMouseMove: () => undefined,
			onMouseOut: () => undefined,
			onMouseOver: () => undefined,
			onProjectionChanged: () => undefined,
			onResize: () => undefined,
			onRightClick: () => undefined,
			onTilesLoaded: () => undefined,
			onTiltChanged: () => undefined,
			onZoomChanged: () => undefined,
		})
		return () => removeEventListeners(listeners)
	})

	return null
}
