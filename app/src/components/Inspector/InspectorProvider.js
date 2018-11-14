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
	type: string,
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
	type?: string,
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
		type: undefined,
		title: undefined,
	}

	constructor(props: Props) {
		super(props)
		const { uid, type, title } = props
		const inspectorHistory = uid && type && title ? [{ uid, type, title }] : []
		this.state = {
			inspectorHistory,
		}
	}

	pushToHistory = ({ uid, type, title }) => {
		if (!uid || !type || !title) return
		this.setState(({ inspectorHistory }) => ({
			inspectorHistory: [...inspectorHistory, { uid, type, title }],
		}))
	}

	inspectItem = (item: InspectorItem) => {
		this.pushToHistory(item)
		this.pushPath(item)
	}

	pushPath = (item) => {
		const { history, location } = this.props
		const { type, uid, title } = item
		const { inspect, ...searchParams } = parseQueryString(location.search)

		const newQueryString = buildQueryString({
			inspect: `${type}-${uid}-${title}`,
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
		const { children, viewer, uid, type, title } = this.props
		const { inspectorHistory } = this.state

		const value = {
			inspectItem: this.inspectItem,
		}

		return (
			<Provider value={value}>
				{uid && type && title && (
					<Inspector
						viewer={viewer}
						uid={uid}
						type={type}
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
							type={type}
							viewer={data && data.currentViewer && data.currentViewer.viewer}
							{...props}
						/>
					)}
				</CurrentViewerQuery>
			)
		}}
	/>
)
