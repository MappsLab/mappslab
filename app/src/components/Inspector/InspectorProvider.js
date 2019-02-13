// @flow
import * as React from 'react'
import { Route } from 'react-router-dom'
import type { RouterHistory, Location as LocationType } from 'react-router-dom'
import { parseQueryString, buildQueryString } from 'Utils/url'
import { findLastIndex, objEquals } from 'Utils/data'
import { CurrentViewerQuery } from 'Queries/Viewer'
import Inspector from './Inspector'

export type InspectorItem = {
	uid: string,
	__typename: 'User' | 'Classroom' | 'Map' | 'Pin' | 'Route',
	title?: string,
	name?: string,
}

export type InspectItem = (InspectorItem) => void

type ContextType = {
	inspectItem: InspectItem,
}

const { Consumer, Provider } = React.createContext<ContextType>({
	inspectItem: () => undefined,
})

export const InspectorConsumer = Consumer

/**
 * InspectorProvider
 */

type BaseProps = {
	children: React.Node,
}

type Props = BaseProps & {
	initialItem: null | InspectorItem,
	location: {
		pathname: string,
		search: string,
	},
	history: RouterHistory,
}

type State = {
	inspectorHistory: Array<InspectorItem>,
}

const getItemFromQueryString = (locationSearch: string): InspectorItem | null => {
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
		this.state = {
			inspectorHistory: [initialItem].filter(Boolean),
		}
	}

	clearHistory = () => {
		this.setState({
			inspectorHistory: [],
		})
	}

	inspectItem = (nextItem: InspectorItem) => {
		this.setState(({ inspectorHistory }) => ({ inspectorHistory: [...inspectorHistory, nextItem] }))
	}

	goBackTo = (item: InspectorItem) => {
		this.setState(
			({ inspectorHistory }) => {
				const index = findLastIndex<InspectorItem>(inspectorHistory, (i) => i.uid === item.uid)
				return {
					inspectorHistory: inspectorHistory.slice(0, index + 1),
				}
			},
			// () => {
			// 	this.props.pushToBrowserHistory(item)
			// },
		)
	}

	render() {
		const { children } = this.props
		const { inspectorHistory } = this.state
		const currentItem = inspectorHistory[inspectorHistory.length - 1]

		const value = {
			inspectItem: this.inspectItem,
		}
		return (
			<CurrentViewerQuery>
				{({ data }) => (
					<Provider value={value}>
						{currentItem && (
							<Inspector
								viewer={data && data.currentViewer && data.currentViewer.viewer}
								currentItem={currentItem}
								inspectorHistory={inspectorHistory}
								inspectItem={this.inspectItem}
								goBackTo={this.goBackTo}
							/>
						)}
						{children}
					</Provider>
				)}
			</CurrentViewerQuery>
		)
	}
}

export const InspectorProvider = (baseProps: BaseProps) => (
	<Route
		render={({ location, history }) => (
			<InspectorProviderBase
				{...baseProps}
				location={location}
				history={history}
				initialItem={getItemFromQueryString(location.search)}
			/>
		)}
	/>
)
