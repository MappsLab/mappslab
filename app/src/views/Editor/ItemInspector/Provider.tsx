import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { LatLngType, Pin, Route } from '../../../types-ts'
import { useCurrentMap } from '../../../providers/CurrentMap'

const { useContext, useReducer } = React

/**
 * Types
 */

type InspectorItem = Route | Pin

interface ItemInspectorState {
	item?: InspectorItem
	position?: LatLngType
}

interface Offset {
	x: number
	y: number
}

export interface ItemInspectorProviderProps extends ItemInspectorState {
	inspectItem: (item: InspectorItem, latlng?: LatLngType) => void
	closeInspector: () => void
}

type Props = {
	children: React.ReactNode
}

/**
 * Context Setup
 */

const InspectorContext = React.createContext<
	ItemInspectorProviderProps | undefined
>(undefined)

export const InspectorConsumer = InspectorContext.Consumer

export const useInspector = () => {
	const ctx = useContext(InspectorContext)
	if (!ctx) throw new Error('`useInspector` must be used within a provider')
	return ctx
}

/**
 * State Reducer
 */

const INSPECT_ITEM = 'INSPECT_ITEM'
const CLOSE_INSPECTOR = 'CLOSE_INSPECTOR'

type ReducerArgs = ItemInspectorState & {
	type: typeof INSPECT_ITEM | typeof CLOSE_INSPECTOR
}

const inspectorReducer = (
	state: ItemInspectorState,
	{ type, item, position }: ReducerArgs,
) => {
	switch (type) {
		case INSPECT_ITEM:
			return { item, position }
		case CLOSE_INSPECTOR:
			return {}
		default:
			throw new Error(`"${type}" is not a valid action type`)
	}
}

export const InspectorProvider = ({ children }: Props) => {
	const { mapData } = useCurrentMap()
	const [state, dispatch] = useReducer(inspectorReducer, {})
	const { item, position } = state

	// $FlowFixMe
	const getItem = (newItem?: InspectorItem) => {
		if (!newItem) return undefined
		if (!mapData) throw new Error('Map data has not been loaded')
		const { uid, __typename } = newItem
		const [pins] = unwindEdges(mapData.pins)
		const [routes] = unwindEdges(mapData.routes)

		if (__typename === 'Pin')
			return pins ? pins.find((p) => p.uid === uid) : undefined
		// $FlowFixMe
		if (__typename === 'Route')
			return routes ? routes.find((r) => r.uid === uid) : undefined
		throw new Error(`Cannot inspect item of type "${__typename}"`)
	}

	const inspectItem = (newItem: InspectorItem, newPosition: LatLngType) => {
		dispatch({ type: INSPECT_ITEM, item: newItem, position: newPosition })
	}

	const closeInspector = () => dispatch({ type: CLOSE_INSPECTOR })
	const value = {
		item: getItem(item),
		position,
		inspectItem,
		closeInspector,
	}
	return (
		<InspectorContext.Provider value={value}>
			{children}
		</InspectorContext.Provider>
	)
}
