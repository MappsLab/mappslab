import { NodeType } from '../../types-ts'
import { useReducer } from 'react'

export interface State {
	inspectorHistory: NodeType[]
}

const CLEAR_HISTORY = 'CLEAR_HISTORY'
const INSPECT_ITEM = 'INSPECT_ITEM'
const GO_BACK = 'GO_BACK'
const GO_BACK_TO = 'GO_BACK_TO'

interface ClearHistoryAction {
	type: typeof CLEAR_HISTORY
}

interface InspectItemAction {
	type: typeof INSPECT_ITEM
	item: NodeType
}

interface GoBackAction {
	type: typeof GO_BACK
}

interface GoBackToAction {
	type: typeof GO_BACK_TO
	item: NodeType
}

type Action =
	| ClearHistoryAction
	| InspectItemAction
	| GoBackAction
	| GoBackToAction

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case CLEAR_HISTORY:
			return {
				...state,
				inspectorHistory: [],
			}
		case INSPECT_ITEM:
			return {
				...state,
				inspectorHistory: [...state.inspectorHistory, action.item],
			}
		case GO_BACK:
			return {
				...state,
				inspectorHistory: state.inspectorHistory.slice(0, -1),
			}
		case GO_BACK_TO:
			const toIndex = state.inspectorHistory.findIndex(
				(item) => item === action.item,
			)
			return {
				...state,
				inspectorHistory: state.inspectorHistory.slice(0, toIndex),
			}

		default:
			// @ts-ignore
			throw new Error(`Type ${action.type} is not a valid action`)
	}
}

export interface Dispatchers {
	inspectItem: (item: NodeType) => void
	goBack: () => void
	goBackTo: (item: NodeType) => void
	clearHistory: () => void
}

type InspectorStateTuple = [State, Dispatchers]

export const useInspectorState = (
	initialItem?: NodeType,
): InspectorStateTuple => {
	const inspectorHistory = initialItem ? [initialItem] : []
	const initialState = { inspectorHistory }
	const [state, dispatch] = useReducer(reducer, initialState)

	const goBack = () => dispatch({ type: GO_BACK })
	const goBackTo = (item: NodeType) => dispatch({ type: GO_BACK_TO, item })
	const inspectItem = (item: NodeType) => dispatch({ type: INSPECT_ITEM, item })
	const clearHistory = () => dispatch({ type: CLEAR_HISTORY })

	const actions = {
		goBack,
		goBackTo,
		inspectItem,
		clearHistory,
	}

	return [state, actions]
}
