// @flow
import * as React from 'react'
import { Route } from 'react-router-dom'
import type { RouterHistory, Location as LocationType } from 'react-router-dom'
import type { ViewerType } from 'Types'
import { parseQueryString, buildQueryString } from 'Utils/url'
import { findLastIndex } from 'Utils/data'
import { CurrentViewerQuery } from 'Queries/Viewer'
import Inspector from './Inspector'

export type InspectorItem = {
	uid: string,
	__typename: string,
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
	uid?: string,
	__typename?: string,
	title?: string,
	viewer?: ViewerType,
}

type State = {
	inspectorHistory: Array<InspectorItem>,
}

class InspectorProviderBase extends React.Component<Props, State> {
	static defaultProps = {
		viewer: undefined,
		uid: undefined,
		__typename: undefined,
		title: undefined,
	}

	constructor(props: Props) {
		super(props)
		const { uid, __typename, title } = props
		/* Initialize the history with the first item */
		const inspectorHistory = uid && __typename && title ? [{ uid, __typename, title }] : []
		this.state = {
			inspectorHistory,
		}
	}

	pushToHistory = ({ uid, __typename, title }) => {
		if (!uid || !__typename || !title) return
		this.setState(({ inspectorHistory }) => ({
			inspectorHistory: [...inspectorHistory, { uid, __typename: __typename.toLowerCase(), title }],
		}))
	}

	inspectItem = (item: InspectorItem) => {
		this.pushToHistory(item)
		this.pushPath(item)
	}

	pushPath = (item: InspectorItem) => {
		const { history, location } = this.props
		const { __typename, uid, title } = item
		const { inspect, ...searchParams } = parseQueryString(location.search)

		const newQueryString = buildQueryString({
			inspect: `${__typename}-${uid}-${title}`,
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
		const { children, viewer, uid, __typename, title } = this.props
		const { inspectorHistory } = this.state

		const value = {
			inspectItem: this.inspectItem,
		}
		// console.log(uid, type, title)
		return (
			<Provider value={value}>
				{__typename && (
					<Inspector
						viewer={viewer}
						uid={uid}
						__typename={__typename}
						title={title}
						inspectorHistory={inspectorHistory}
						inspectItem={this.inspectItem}
						goBackTo={this.goBackTo}
					/>
				)}
				{children}
			</Provider>
		)
	}
}

type BaseProps = {
	children: React.Node,
}

export const InspectorProvider = (props: BaseProps) => (
	<Route
		render={({ location, history }) => {
			const { inspect } = parseQueryString(decodeURI(location.search))
			const [type, uid, title] = inspect ? inspect.split('-') : [undefined, undefined, undefined]

			return (
				<CurrentViewerQuery>
					{({ data }) => (
						<InspectorProviderBase
							history={history}
							location={location}
							uid={uid}
							title={title}
							__typename={type}
							viewer={data && data.currentViewer && data.currentViewer.viewer}
							{...props}
						/>
					)}
				</CurrentViewerQuery>
			)
		}}
	/>
)
