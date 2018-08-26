// @flow
import * as React from 'react'
import type { DocumentNode } from 'graphql'
import type { FetchResult, ApolloError, DataProxy, MutationResult } from 'react-apollo'
import { Mutation as ApolloMutation } from 'react-apollo'
import { unwindEdges } from './utils'

type MutationProps = {
	mutation: DocumentNode,
	children: (Function, MutationResult<any>) => React.Node,
	variables?: {},
	update?: (DataProxy, FetchResult<any>) => void,
	ignoreResults?: boolean,
	optimisticResponse?: void | {},
	refetchQueries?: (FetchResult<any>) => Array<{ query: DocumentNode, variables?: {} }>,
	awaitRefetchQueries?: boolean,
	onCompleted?: void | ((any) => void),
	onError?: void | ((ApolloError) => void),
}

const Mutation = ({ children, ...mutationProps }: MutationProps) => (
	<ApolloMutation {...mutationProps}>
		{(mutate, { data, ...response }) => {
			const responseProps = {
				data: unwindEdges(data),
				...response,
			}
			return children(mutate, responseProps)
		}}
	</ApolloMutation>
)

Mutation.defaultProps = {
	variables: {},
	update: () => {},
	ignoreResults: false,
	optimisticResponse: undefined,
	refetchQueries: () => {},
	awaitRefetchQueries: false,
	onCompleted: undefined,
	onError: undefined,
}

export const withDefaultMutation = (mutation: DocumentNode, options: MutationProps | {} = {}) => (props: any) => (
	<Mutation mutation={mutation} {...options} {...props} />
)
