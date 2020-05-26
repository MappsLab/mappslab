import * as React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { parseQueryString, getNodeTitle, buildQueryString } from '../../utils'
import { NodeType } from '../../types-ts'
import { Inspector } from './Inspector'
import { Dispatchers, useInspectorState } from './state'

const { useEffect } = React

export type InspectItem<T extends NodeType> = (item: T) => Promise<void>

interface InspectorContextValue extends Dispatchers {
	inspectorHistory: NodeType[]
	currentItem: NodeType | void
}

const InspectorContext = React.createContext<InspectorContextValue | undefined>(
	undefined,
)

export const InspectorConsumer = InspectorContext.Consumer

export const useInspector = () => {
	const ctx = React.useContext(InspectorContext)
	if (!ctx)
		throw new Error(
			'useInspectorContext must be used within a InspectorProvider',
		)
	return ctx
}

interface InspectorProps {
	children: React.ReactNode
	initialItem?: NodeType
}

const last = <T extends any>(arr: T[]): T | undefined =>
	arr.length ? arr[arr.length - 1] : undefined

export const InspectorProvider = ({
	children,
	initialItem,
}: InspectorProps) => {
	const location = useLocation()
	const history = useHistory()
	const [state, actions] = useInspectorState(initialItem)
	const { inspectorHistory } = state

	const currentItem = last(inspectorHistory)

	useEffect(() => {
		if (!currentItem) return
		const { __typename, uid } = currentItem
		const label = getNodeTitle(currentItem)
		if (!label) {
			throw new Error('The current item does not have a name or a title')
		}
		const { inspect, ...searchParams } = parseQueryString(location.search)
		const newQueryString = buildQueryString({
			inspect: `${__typename}-${uid}-${label}`,
			...searchParams,
		})

		const newPath = `${location.pathname}${newQueryString}`
		history.push(newPath)
	}, [currentItem, location.search])

	const value = {
		...actions,
		inspectorHistory,
		currentItem,
	}

	return (
		<InspectorContext.Provider value={value}>
			<Inspector />
			{children}
		</InspectorContext.Provider>
	)
}
