import * as React from 'react'
import { History } from 'history'
import { Route } from 'react-router-dom'
import { parseQueryString, buildQueryString } from 'Utils/url'
import { findLastIndex } from 'Utils/data'
import { Viewer } from '../../types-ts'
import { useCurrentViewer } from '../../providers/CurrentViewer'
import Inspector from './Inspector'

const { useContext } = React

export interface InspectorItem {
	uid: string
	__typename: string
	// __typename: 'User' | 'Classroom' | 'Map' | 'Pin' | 'Route',
	title?: string
	name?: string
}

export type InspectItem = (item: InspectorItem) => Promise<void>

interface ContextType {
	inspectItem: InspectItem
}

const InspectorContext = React.createContext<ContextType | undefined>(undefined)

export const useInspector = () => {
	const ctx = useContext(InspectorContext)
	if (!ctx)
		throw new Error('`useInspector` must be used within a InspectorProvider')
	return ctx
}

export const InspectorConsumer = InspectorContext.Consumer

/**
 * InspectorProvider
 */

interface BaseProps {
	children: React.ReactNode
}

interface Props extends BaseProps {
	viewer: Viewer
	initialItem: null | InspectorItem
	currentItem: null | InspectorItem
	location: {
		pathname: string
		search: string
	}
	history: History
}

type State = {
	inspectorHistory: Array<InspectorItem>
}

const getItemFromQueryString = (
	locationSearch: string,
): InspectorItem | null => {
	if (!locationSearch.length) return null
	const { inspect } = parseQueryString(decodeURI(locationSearch))
	if (!inspect) return null
	const [__typename, uid, title] = inspect.split('-')
	return {
		__typename,
		uid,
		title,
	}
}

class InspectorProviderBase extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		const { initialItem } = props

		/* Initialize the history with the first item, filtering out a `null` inspectorItem */
		const inspectorHistory = initialItem ? [initialItem] : []
		this.state = {
			inspectorHistory,
		}
	}

	componentDidUpdate(prevProps: Props) {
		if (this.props.initialItem && !prevProps.initialItem) {
			/* This is OK because we're wrapping it in a condition */
			/* eslint-disable-next-line react/no-did-update-set-state */
			this.setState({
				inspectorHistory: [this.props.initialItem],
			})
		}
	}

	clearHistory = () => {
		this.setState({
			inspectorHistory: [],
		})
	}

	inspectItem = async (nextItem: InspectorItem) => {
		this.setState(({ inspectorHistory }) => ({
			inspectorHistory: [...inspectorHistory, nextItem],
		}))
		this.updateLocation(nextItem)
	}

	goBackTo = async (item: InspectorItem) => {
		this.setState(({ inspectorHistory }) => {
			const index = findLastIndex<InspectorItem>(
				inspectorHistory,
				(i) => i.uid === item.uid,
			)
			return {
				inspectorHistory: inspectorHistory.slice(0, index + 1),
			}
		})
		this.updateLocation(item)
	}

	updateLocation(item: InspectorItem) {
		const { location, history } = this.props
		const { __typename, uid, title, name } = item
		const { inspect, ...searchParams } = parseQueryString(location.search)
		const label = title || name
		if (!label)
			throw new Error('The current item does not have a name or a title')
		const newQueryString = buildQueryString({
			inspect: `${__typename}-${uid}-${label}`,
			...searchParams,
		})

		const newPath = `${location.pathname}${newQueryString}`
		history.push(newPath)
	}

	render() {
		const { children, currentItem, viewer } = this.props
		const { inspectorHistory } = this.state
		// const currentItem = inspectorHistory[inspectorHistory.length - 1]

		const value = {
			inspectItem: this.inspectItem,
		}

		return (
			<InspectorContext.Provider value={value}>
				{currentItem && (
					<Inspector
						viewer={viewer}
						currentItem={currentItem}
						inspectorHistory={inspectorHistory}
						inspectItem={this.inspectItem}
						goBackTo={this.goBackTo}
					/>
				)}
				{children}
			</InspectorContext.Provider>
		)
	}
}

export const InspectorProvider = (baseProps: BaseProps) => {
	const { viewer } = useCurrentViewer()
	return (
		<Route
			render={({ location, history }) => (
				<InspectorProviderBase
					{...baseProps}
					location={location}
					history={history}
					viewer={viewer}
					initialItem={getItemFromQueryString(location.search)}
					currentItem={getItemFromQueryString(location.search)}
				/>
			)}
		/>
	)
}
