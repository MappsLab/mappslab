// @flow
import * as React from 'react'
import merge from 'deepmerge'
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
	const [loadDelayed, setLoadDelayed] = useState(false)
	const [loadDelayedVariables, setLoadDelayedVariables] = useState({})
	// A few more query props are available:
	// https://www.apollographql.com/docs/react/essentials/queries.html#props
	const { children, skip, delayQuery, variables, ...queryProps } = props
	if (!queryProps.query) throw new Error('No query was supplied.')
	const mergedVariables = merge(variables, loadDelayedVariables)
	const shouldSkip = loadDelayed ? false : skip || delayQuery
	return (
		<ApolloQuery {...queryProps} variables={mergedVariables} skip={shouldSkip}>
			{(response: QueryRenderProps<T>) => {
				const { networkStatus, error, client } = response
				// if `delay === true`, pass in a 'load' function to manually fire the query
				// and return the results
				const loadQuery = (delayedVariables) => {
					if (!loadDelayed) {
						setLoadDelayed(true)
						setLoadDelayedVariables(delayedVariables)
					}
					// // console.log('v', variables)
					// const result = await client.query({
					// 	query: queryProps.query,
					// 	variables,
					// })
					// const { data } = result
					// // console.log(result)
					// console.log('called')
					// client.writeQuery({ query: queryProps.query, data: data || null })
					// return {
					// 	...result,
					// 	data: data ? unwindEdges(data) : data,
					// }
				}
				const status = getNetworkStatus(networkStatus)
				const { LoadingComponent, ErrorComponent } = props
				if (!delayQuery && LoadingComponent !== false && status === 'loading')
					return LoadingComponent && <LoadingComponent status={status} {...response} />
				if (error && ErrorComponent !== false) {
					return ErrorComponent && <ErrorComponent status={status} {...response} />
				}
				const { data } = response
				const renderProps = {
					...response,
					data: data ? unwindEdges(data) : data,
					loadQuery,
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
