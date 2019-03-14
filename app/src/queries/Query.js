// @flow
import * as React from 'react'
import type { DocumentNode } from 'graphql'
import type { QueryRenderProps } from 'react-apollo'
import { Query as ApolloQuery } from 'react-apollo'
import { Loading, FetchError } from './Network'
import { getNetworkStatus, unwindEdges } from './utils'

const { useState } = React

export type LoadingState = 'loading' | 'refetching' | 'passivelyRefetching' | 'fetchingMore' | 'ready' | 'errors'

type LoadingProps<T> = QueryRenderProps<T> & {
	status: LoadingState,
}

type CustomRenderProps<T> = QueryRenderProps<T>

type QueryConfig<T> = {
	query?: DocumentNode,
	variables?: {},
	pollInterval?: number,
	ssr?: boolean,
	delayQuery?: boolean,
	skip?: boolean,
	displayName?: void | string,
	onCompleted?: (any) => void,
	onError?: (any) => void,
	// An optional "Loading" component. Use a skeleton here. Pass 'false' to disable
	LoadingComponent?: false | React.ComponentType<LoadingProps<T>>,
	// An optional "Error" component. Pass 'false' to disable
	ErrorComponent?: false | React.ComponentType<any>,
	notifyOnNetworkStatusChange?: boolean,
	// fetchPolicy?: '..'
	// errorPolicy?: ''
}

type GenericResponse = { [key: string]: any }

type QueryProps<T> = QueryConfig<T> & {
	query: void | DocumentNode,
	children: (CustomRenderProps<T>) => React.Node,
}

const Query = <T: GenericResponse>(props: QueryProps<T>) => {
	const [fetchedAfterSkip, setFetchAfterSkip] = useState(false)
	const [fetchAfterSkipVariables, setFetchAfterSkipVariables] = useState(null)
	const { children, skip, delayQuery, variables: originalVariables, ...queryProps } = props
	if (!queryProps.query) throw new Error('No query was supplied.')
	const variables = fetchAfterSkipVariables || originalVariables || {}

	const shouldSkip = (skip === true || delayQuery === true) && fetchedAfterSkip === false
	return (
		<ApolloQuery {...queryProps} variables={variables} skip={shouldSkip}>
			{(response: QueryRenderProps<T>) => {
				const { networkStatus, error } = response
				const betterRefetch = async (newVariables) => {
					setFetchAfterSkip(true)
					setFetchAfterSkipVariables(newVariables)
				}

				const status = getNetworkStatus(networkStatus)
				const { LoadingComponent, ErrorComponent } = props
				if (!delayQuery && LoadingComponent !== false && status === 'loading')
					return LoadingComponent && <LoadingComponent status={status} {...response} />
				if (error && ErrorComponent !== false) {
					return ErrorComponent && <ErrorComponent status={status} {...response} />
				}

				const { data, refetch } = response
				const renderProps = {
					...response,
					data: data ? unwindEdges(data) : data,
					refetch: shouldSkip ? betterRefetch : refetch,
					queryConfig: {
						query: queryProps.query,
						variables,
					},
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

export type QueryWrapper<Response> = (props: QueryProps<Response>) => React.Element<typeof Query>

export const withDefaultQuery = <ResponseType: GenericResponse>(
	defaultQuery: DocumentNode,
	config?: QueryConfig<ResponseType>,
) => (props: QueryProps<ResponseType>) => <Query query={props.query || defaultQuery} {...props} {...config} />
