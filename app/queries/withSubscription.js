// @flow
import * as React from 'react'
import { assoc } from 'ramda'
import type { DocumentNode } from 'graphql'
import { Subscription } from 'react-apollo'

type Config = {
	options?: (Object) => Object | Object, // Use the component's props to provide `variables`, ...
	props?: (Object) => Object, // A function that takes the response and returns an object.
	update?: (mixed) => void, // Takes the client and incoming data and updates the cache
	name?: string, // the name of the mutation that will be called from the component, i.e. 'addToDo'
}

const defaultConfig = {
	options: { variables: null }, // eslint-disable-line no-unused-vars
	props: (response) => response,
}

const withSubscription = (subscription: DocumentNode, opts?: Config = {}) => (
	Component: React.ComponentType<any>, // The component we are wrapping
) => (componentProps: Object) => {
	const config = { ...defaultConfig, ...opts }
	const { options, props } = config
	/**
	 * Subscription Options:
	 * 	variables
	 * 	update
	 * 	refetchQueries
	 */
	const subscriptionOptions = typeof options === 'function' ? options(componentProps) : options
	console.log(subscriptionOptions)
	return (
		<Subscription subscription={subscription} {...subscriptionOptions}>
			{(response) => {
				const responseProps = props(response)
				return <Component {...componentProps} {...responseProps} />
			}}
		</Subscription>
	)
}

export default withSubscription
