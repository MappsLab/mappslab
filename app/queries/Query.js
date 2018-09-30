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

type QueryConfig = {
	query: DocumentNode,
	variables?: {},
	pollInterval?: number,
	ssr?: boolean,
	delayQuery?: boolean,
	skip?: boolean,
	displayName?: void | string,
	onCompleted?: ({}) => void,
	onError?: ({}) => void,
	// An optional "Loading" component. Use a skeleton here. Pass 'false' to disable
	LoadingComponent?: false | React.ComponentType<LoadingProps>,
	// An optional "Error" component. Pass 'false' to disable
	ErrorComponent?: false | React.ComponentType<any>,
	notifyOnNetworkStatusChange?: boolean,
	// fetchPolicy?: '..'
	// errorPolicy?: ''
}

type QueryChildrenProps = {
	children: (QueryRenderProps<any, any>) => React.Node,
	// eslint-disable-next-line react/require-default-props
	query?: void | DocumentNode,
}

type QueryProps = QueryConfig & {
	children: (QueryRenderProps<any, any>) => React.Node,
}

const Query = (props: QueryProps) => {
	// A few more query props are available:
	// https://www.apollographql.com/docs/react/essentials/queries.html#props
	const { children, skip, delayQuery, ...queryProps } = props
	return (
		<ApolloQuery {...queryProps} skip={skip || delayQuery}>
			{(response) => {
				const { networkStatus, error, client, subscribeToMore } = response
				// if `delay === true`, pass in a 'load' function to manually fire the query
				// and return the results
				const loadQuery = async (variables) => {
					const result = await client.query({
						query: queryProps.query,
						variables,
					})
					const { data, ...results } = result
					return {
						data: data ? unwindEdges(data) : data,
						...results,
					}
				}
				const status = getNetworkStatus(networkStatus)
				const { LoadingComponent, ErrorComponent } = props
				const { data, ...responseProps } = response
				if (!delayQuery && LoadingComponent !== false && status === 'loading')
					return LoadingComponent && <LoadingComponent status={status} {...response} />
				if (error && ErrorComponent !== false) {
					return ErrorComponent && <ErrorComponent status={status} {...responseProps} />
				}
				const renderProps = {
					data: data ? unwindEdges(data) : data,
					loadQuery,
					subscribeToMore,
					...responseProps,
				}
				return children(renderProps)
			}}
		</ApolloQuery>
	)
}

Query.defaultProps = {
	variables: {},
	displayName: undefined,
	LoadingComponent: Loading,
	ErrorComponent: FetchError,
	skip: false,
	delayQuery: false,
	notifyOnNetworkStatusChange: true,
	ssr: false,
	pollInterval: 0,
	onCompleted: () => {},
	onError: () => {},
}

export default Query

export const withDefaultQuery = (defaultQuery: DocumentNode, config?: QueryConfig) => (props: QueryChildrenProps) => (
	<Query query={props.query || defaultQuery} {...props} {...config} />
)
