// @flow
import * as React from 'react'
import { assoc } from 'ramda'
import type { DocumentNode } from 'graphql'
import { Mutation } from 'react-apollo'

type Config = {
	options?: (Object) => Object | Object, // Use the component's props to provide `variables`, ...
	props?: (Object) => Object, // A function that takes the response and returns an object.
	update?: (mixed) => void, // Takes the client and incoming data and updates the cache
	name?: string, // the name of the mutation that will be called from the component, i.e. 'addToDo'
}

const defaultConfig = {
	options: { variables: null }, // eslint-disable-line no-unused-vars
	props: (response) => response,
	update: () => {},
	name: 'mutate',
}

const withMutation = (mutation: DocumentNode, opts?: Config = {}) => (
	Component: React.ComponentType<any>, // The component we are wrapping
) => (componentProps: Object) => {
	const config = { ...defaultConfig, ...opts }
	const { options, props, name: mutationName } = config
	/**
	 * MutationOptions:
	 * 	variables
	 * 	update
	 * 	refetchQueries
	 */
	const mutationOptions = typeof options === 'function' ? options(componentProps) : options
	return (
		<Mutation mutation={mutation} {...mutationOptions}>
			{(mutate, response) => {
				const responseProps = props(response)
				const mutationProps = assoc(mutationName, mutate)({})
				return <Component {...mutationProps} {...componentProps} {...responseProps} />
			}}
		</Mutation>
	)
}

export default withMutation
