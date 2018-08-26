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
	// delay?: boolean,
	// skip?: boolean,
	displayName?: void | string,
	// An optional "Loading" component, with default. Use a skeleton here. Pass 'false' to disable
	LoadingComponent?: false | React.ComponentType<LoadingProps>,
	// An optional "Error" component, with default. Pass 'false' to disable
	ErrorComponent?: false | React.ComponentType<any>,
}

const Query = (props: QueryProps) => {
	// A few more query props are available:
	// https://www.apollographql.com/docs/react/essentials/queries.html#props
	const { variables, children, query } = props
	return (
		<ApolloQuery query={query} variables={variables} notifyOnNetworkStatusChange>
			{(response) => {
				const { networkStatus, error } = response
				const status = getNetworkStatus(networkStatus)
				const { LoadingComponent, ErrorComponent } = props
				const { data, ...responseProps } = response
				if (LoadingComponent !== false && status === 'loading')
					return LoadingComponent && <LoadingComponent status={status} {...response} />
				if (error && ErrorComponent !== false) {
					return ErrorComponent && <ErrorComponent status={status} {...responseProps} />
				}
				const renderProps = {
					data: data ? unwindEdges(data) : data,
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
}

export default Query

export const withDefaultQuery = (defaultQuery: DocumentNode) => (props: any) => (
	<Query query={props.query || defaultQuery} {...props} />
)
