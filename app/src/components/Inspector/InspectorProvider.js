// @flow
import * as React from 'react'
import { withRouter } from 'react-router-dom'
import type { RouterHistory, Location as LocationType } from 'react-router-dom'
import { parseQueryString, buildQueryString } from 'Utils/url'
import { findLastIndex } from 'Utils/data'
import { CurrentViewerQuery } from 'Queries/Viewer'
import Inspector from './Inspector'

export type InspectorItem = {
	uid: string,
	__typename: 'User' | 'Classroom' | 'Map' | 'Pin' | 'Route',
	title: string,
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

type Props = {
	children: React.Node,
	history: RouterHistory,
	location: LocationType,
}

type State = {
	inspectorHistory: Array<InspectorItem>,
}

class InspectorProviderBase extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		const { location } = props
		const { inspect } = parseQueryString(decodeURI(location.search))
		const [__typename, uid, title] = inspect ? inspect.split('-') : [undefined, undefined, undefined]
		const currentItem = {
			__typename,
			uid,
			title,
		}

		/* Initialize the history with the first item */
		const inspectorHistory = [currentItem]
		this.state = {
			inspectorHistory,
		}
	}

	pushToHistory = (nextItem: InspectorItem) => {
		this.setState(({ inspectorHistory }) => ({
			inspectorHistory: [...inspectorHistory, nextItem],
		}))
	}

	inspectItem = (item: InspectorItem) => {
		const nextItem = {
			...item,
			title: item.title || item.name,
		}
		this.pushToHistory(nextItem)
		this.pushPath(nextItem)
	}

	pushPath = (item: InspectorItem) => {
		const { history, location } = this.props
		const { __typename, uid, title, name } = item
		const { inspect, ...searchParams } = parseQueryString(location.search)

		const newQueryString = buildQueryString({
			inspect: `${__typename}-${uid}-${title || name}`,
			...searchParams,
		})

		const newPath = `${location.pathname}${newQueryString}`
		history.push(newPath)
	}

	goBackTo = (item: InspectorItem) => {
		this.setState(
			({ inspectorHistory }) => {
				const index = findLastIndex<InspectorItem>(inspectorHistory, (i) => i.uid === item.uid)
				return {
					inspectorHistory: inspectorHistory.slice(0, index + 1),
				}
			},
			() => {
				this.pushPath(item)
			},
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

export const InspectorProvider = withRouter(InspectorProviderBase)
