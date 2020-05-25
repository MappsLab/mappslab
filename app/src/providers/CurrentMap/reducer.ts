import { useReducer } from 'react'
import { Pin, Route, LatLngType } from '../../types-ts'

// Constants
const SET_MAP_UID = 'SET_MAP_UID'
const SET_LAT_LNG = 'SET_LAT_LNG'
const SET_INSPECTED_ITEM = 'SET_INSPECTED_ITEM'
const SET_MAP_TYPE = 'SET_MAP_TYPE'

interface SetMapAction {
	type: typeof SET_MAP_UID
	mapUid: string
}

interface SetViewerLatLngAction {
	type: typeof SET_LAT_LNG
	latLng: LatLngType
}

interface SetInspectedItemAction {
	type: typeof SET_INSPECTED_ITEM
	item: Pin | Route | null
}

interface SetMapTypeAction {
	type: typeof SET_MAP_TYPE
	mapType: string
}

type Action =
	| SetMapAction
	| SetViewerLatLngAction
	| SetInspectedItemAction
	| SetMapTypeAction

interface State {
	mapUid: string | null
	viewerLatLng: LatLngType | null
	inspectedItem: Pin | Route | null
	mapType: string
}

const initialState: State = {
	mapUid: null,
	viewerLatLng: null,
	inspectedItem: null,
	mapType: 'roadmap',
}

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case SET_MAP_UID:
			return { ...state, mapUid: action.mapUid }
		case SET_LAT_LNG:
			return { ...state, viewerLatLng: action.latLng }
		case SET_INSPECTED_ITEM:
			return { ...state, inspectedItem: action.item }
		case SET_MAP_TYPE:
			return { ...state, mapType: action.mapType }
		default:
			// @ts-ignore
			throw new Error(`Unknown action type "${action.type}"`)
			return state
	}
}

interface MapReducerDispatchers {
	setMapUid: (id: string) => void
	setViewerLatLng: (latLng: LatLngType) => void
	setMapType: (mapType: string) => void
	setInspectedItem: (item: Route | Pin) => void
}

export type MapReducer = MapReducerDispatchers & State

export const useMapReducer = (): MapReducer => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const { mapUid } = state

	const setMapUid = (mapUid: string) => dispatch({ type: SET_MAP_UID, mapUid })
	const setViewerLatLng = (latLng: LatLngType) =>
		dispatch({ type: SET_LAT_LNG, latLng })
	const setMapType = (mapType: string) =>
		dispatch({ type: SET_MAP_TYPE, mapType })
	const setInspectedItem = (item: Route | Pin) =>
		dispatch({ type: SET_INSPECTED_ITEM, item })

	return {
		...state,
		setMapUid,
		setViewerLatLng,
		setMapType,
		setInspectedItem,
	}
}
