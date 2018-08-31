// @flow
import * as React from 'react'
import type { DocumentNode } from 'graphql'
import type { QueryRenderProps } from 'react-apollo'
import { Query as ApolloQuery } from 'react-apollo'

type QueryProps = {
	query: DocumentNode,
	children: (QueryRenderProps<any, any>) => React.Node,
	variables?: {},
	delayQuery?: boolean,
	skip?: boolean,
	displayName?: void | string,
	notifyOnNetworkStatusChange?: boolean,
	ssr?: boolean,
	pollInterval?: number,
	// Incomplete, missing:
	// fetchPolicy?: FetchPolicy
	// errorPolicy?: ErrorPolicy
}

const Query = ({ children, skip, delayQuery, ...queryProps }: QueryProps) => (
	<ApolloQuery {...queryProps} skip={skip || delayQuery}>
		{(response) => {
			const { client } = response
			// if `delay === true`, supply in a 'load' function to manually fire the query
			// and return the results
			const loadQuery = async (variables) =>
				client.query({
					query: queryProps.query,
					variables,
				})

			const renderProps = delayQuery
				? {
						loadQuery,
						...response,
				  }
				: response

			return children(renderProps)
		}}
	</ApolloQuery>
)

Query.defaultProps = {
	variables: {},
	displayName: undefined,
	skip: false,
	delayQuery: false,
	notifyOnNetworkStatusChange: true,
	ssr: false,
	pollInterval: 0,
}

export default Query
