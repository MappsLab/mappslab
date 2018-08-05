// @flow
import * as React from 'react'
import type { DocumentNode } from 'graphql'
import { Query } from 'react-apollo'
import { Loading } from '../components/Loading'

type SubscriptionOptions = {
	document?: DocumentNode,
	onError?: (error: Error) => void,
	updateQuery?: (any, any) => any,
	variables?: {},
}

type Config = {
	options?: (Object) => Object | Object, // Use the component's props to provide `variables`, ...
	props?: (Object) => Object, // A function that takes the response and returns an object.
	subscriptionOptions?: ({ uid: string }, Function) => SubscriptionOptions,
	subscriptionName?: string,
}

const defaultConfig = {
	options: { variables: null }, // eslint-disable-line no-unused-vars
	props: (response) => response,
}

const withQuery = (query: DocumentNode, opts?: Config = {}) => (
	Component: React.ComponentType<any>, // The component we are wrapping
	LoadingComponent?: React.ComponentType<any> = Loading, // An optional "Loading" component. Use a skeleton here
) => (componentProps: Object) => {
	const config = { ...defaultConfig, ...opts }
	const { props: transformProps, options, subscriptionOptions, subscriptionName } = config
	const { variables } = typeof options === 'function' ? options(componentProps) : options

	return (
		<Query query={query} variables={variables}>
			{(response) => {
				const { loading, error, subscribeToMore } = response
				// If there are subscriptionOptions in the config,
				// prepare the 'subscribe' function

				const subscribe = subscriptionOptions
					? // $FlowFixMse
					  (callback) => subscribeToMore(subscriptionOptions(componentProps, callback))
					: undefined
				const responseProps = Object.assign({}, transformProps(response), { [subscriptionName || 'subscribe']: subscribe })
				if (loading) return <LoadingComponent />
				if (error) return 'error!'
				return <Component {...componentProps} {...responseProps} />
			}}
		</Query>
	)
}

export default withQuery
