import * as React from 'react'
import { useGoogleMap } from '@react-google-maps/api'
import { MapEventListeners } from '../../types-ts'
import { addListeners, mappedEventNames, removeListeners } from '../../utils/listeners'
import { useMapReducer, MapReducer } from './reducer'
import { Map, Pin, Route, Tileset } from '../../types-ts'
import { useMapQuery, useMapSubscriptions } from '../../queries'
import { applyBaseImage } from './baseImage'
import { ModeContext, ModeEvent, useMapStateMachine } from './mapStateMachine'
import { Interpreter, State } from 'xstate'
import { getOptionsForState } from '../../views/Editor/mapOptions'

const { useRef, useEffect } = React

interface CurrentMapContextValue extends MapReducer {
	// Original API functions
	setZoom: google.maps.Map['setZoom']
	getZoom: google.maps.Map['getZoom']
	panTo: google.maps.Map['panTo']
	fitBounds: google.maps.Map['fitBounds']

	// Helper functions
	addEventListeners: (listeners: MapEventListeners) => google.maps.MapsEventListener[]
	removeEventListeners: (listeners: google.maps.MapsEventListener[]) => void
	zoomIn: () => void
	zoomOut: () => void
	setBaseImage: (tileset: Tileset | null) => void

	// Map Machine State
	mode: State<ModeContext, ModeEvent>
	transitionMode: Interpreter<ModeContext, any, ModeEvent>['send']
	service: Interpreter<ModeContext, any, ModeEvent>

	// Map State
	setMapUid: (uid: string | null) => void
	mapData: Map | null
	mapType: string
	inspectedItem: Route | Pin | null
}

const CurrentMapContext = React.createContext<
	CurrentMapContextValue | undefined
>(undefined)

export const CurrentMapConsumer = CurrentMapContext.Consumer

export const useCurrentMap = () => {
	const ctx = React.useContext(CurrentMapContext)
	if (!ctx)
		throw new Error(
			'useCurrentMapContext must be used within a CurrentMapProvider',
		)
	return ctx
}

interface CurrentMapProps {
	children: React.ReactNode
}

export const CurrentMapProvider = ({ children }: CurrentMapProps) => {
	const googleMap = useGoogleMap()
	// state
	const listenersRef = useRef<google.maps.MapsEventListener[]>([])
	const reducerState = useMapReducer()
	const { mapUid, mapType } = reducerState
	const mapQuery = useMapQuery({
		variables: { uid: mapUid },
	})

	const { data } = mapQuery
	const mapData = data?.map ?? null
	const [mode, transitionMode, service] = useMapStateMachine()

	useEffect(() => {
		const options = getOptionsForState(mode.value)
		googleMap?.setOptions(options)
	}, [googleMap, mode, getOptionsForState])

	// effects
	useEffect(() => {
		useMapSubscriptions(mapQuery)
	}, [mapQuery])

	// auto-set base maps
	useEffect(() => {
		if (!googleMap) return
		const tileset = mapData?.baseImage?.tileset
		const currentMapId = googleMap.getMapTypeId()
		// @ts-ignore
		if (googleMap && tileset && currentMapId !== 'customImage') {
			// If the updated map has a tileset, and that tileset is
			// not already applied, set it
			applyBaseImage(googleMap, tileset)
		} else if (tileset === null && currentMapId !== 'roadmap') {
			// Otherwise, if there is no tileset, and the current map
			// is not a roadmap, remove it.
			// TODO: this will need to also check for satellite, terrain etc
			applyBaseImage(googleMap, null)
		}
	}, [googleMap, mapData?.baseImage?.tileset])

	// Trigger map type update when state changes
	useEffect(() => {
		if (!googleMap) return
		const currentMapId = googleMap.getMapTypeId()
		if (mapType !== currentMapId) {
			googleMap.setMapTypeId(mapType)
		}
	}, [googleMap, mapType])

	if (!googleMap) return null
	// Private
	const zoom = (diff: number): void => {
		const currentZoom = googleMap.getZoom()
		googleMap.setZoom(currentZoom + diff)
	}
	// Public
	const zoomIn = () => zoom(1)
	const zoomOut = () => zoom(-1)

	const setBaseImage = (tileset: Tileset | null) => applyBaseImage(googleMap, tileset)

	const addEventListeners = (listeners: MapEventListeners) => {
		return addListeners(googleMap, listeners)
	}

	const removeEventListeners = (listeners: google.maps.MapsEventListener[]) => {
		removeListeners(listeners)
	}

	// re-export original API
	const { setZoom, getZoom, panTo, fitBounds } = googleMap

	const value: CurrentMapContextValue = {
		setZoom,
		getZoom,
		panTo,
		fitBounds,
		zoomIn,
		zoomOut,
		addEventListeners,
		removeEventListeners,
		mapData,
		mode,
		transitionMode,
		service,
		setBaseImage,
		...reducerState,
	}

	return (
		<CurrentMapContext.Provider value={value}>
			{children}
		</CurrentMapContext.Provider>
	)
}
