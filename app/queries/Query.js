// @flow
import * as React from 'react'
import type { DocumentNode } from 'graphql'
import type { QueryRenderProps } from 'react-apollo'

import { Query as ApolloQuery } from 'react-apollo'
import { Loading, FetchError } from './Network'
import { getNetworkStatus, unwindEdges } from './utils'

export type LoadingState = 'loading' | 'refetching' | 'passivelyRefetching' | 'fetchingMore' | 'ready' | 'errors'

type LoadingProps = QueryRenderProps<any> & {
	status: LoadingState,
}

type QueryProps = {
	query: DocumentNode,
	children: (QueryRenderProps<any, any>) => React.Node,
	variables?: {},
	// pollInterval?: number
	// fetchPolicy?: '..'
	// errorPolicy?: ''
	delay?: boolean,
	skip?: boolean,
	displayName?: void | string,
	// An optional "Loading" component, with default. Use a skeleton here. Pass 'false' to disable
	LoadingComponent?: false | React.ComponentType<LoadingProps>,
	// An optional "Error" component, with default. Pass 'false' to disable
	ErrorComponent?: false | React.ComponentType<any>,
}

type State = {
	newVariables: null | {},
	delay: boolean,
}

class Query extends React.Component<QueryProps, State> {
	static defaultProps = {
		variables: {},
		displayName: undefined,
		LoadingComponent: Loading,
		ErrorComponent: FetchError,
		skip: false,
		delay: false,
	}

	state = {
		delay: this.props.delay || false,
		newVariables: null,
	}

	load = (newVariables: {}, refetch: ({}) => Promise<{}>) =>
		new Promise((resolve) => {
			this.setState({ delay: false, newVariables }, async () => {
				console.log('load method')
				const r = await refetch({ variables: newVariables })
				console.log('load method fetched')
				console.log(r)
				resolve(r)
			})
		})

	render() {
		const { children, skip, variables, ...queryProps } = this.props
		const { delay, newVariables } = this.state
		// allow a 'delay' prop
		const shouldSkip = skip || delay
		const vars = newVariables || variables
		console.log(vars)

		return (
			<ApolloQuery {...queryProps} variables={vars} skip={skip || delay} notifyOnNetworkStatusChange>
				{(response) => {
					const { networkStatus, error, refetch } = response
					const load = async (_newVariables: {}) => {
						console.log('load func', _newVariables)
						return this.load(_newVariables, refetch)
						// return await refetch(newVariables)
					}
					console.log(response)
					const status = getNetworkStatus(networkStatus)
					const { LoadingComponent, ErrorComponent } = this.props
					const { data, ...responseProps } = response
					if (!shouldSkip && LoadingComponent !== false && status === 'loading')
						return LoadingComponent && <LoadingComponent status={status} {...response} />
					if (error && ErrorComponent !== false) {
						return ErrorComponent && <ErrorComponent status={status} {...responseProps} />
					}
					const renderProps = {
						data: data ? unwindEdges(data) : data,
						load,
						...responseProps,
					}
					return children(renderProps)
				}}
			</ApolloQuery>
		)
	}
}

export default Query

export const withDefaultQuery = (defaultQuery: DocumentNode) => (props: any) => (
	<Query query={props.query || defaultQuery} {...props} />
)
