// @flow
import * as React from 'react'
import type { DocumentNode } from 'graphql'
import { Query } from 'react-apollo'
import { Loading } from '../components/Loading'

type Config = {
	options?: (Object) => Object | Object, // Use the component's props to provide `variables`, ...
	props?: (Object) => Object, // A function that takes the response and returns an object.
	subscriptionOptions: ({}) => {},
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
	const { props, options, subscriptionOptions } = config
	const { variables } = typeof options === 'function' ? options(componentProps) : options

	return (
		<Query query={query} variables={variables}>
			{(response) => {
				const { loading, error, subscribeToMore } = response
				const subscribeToMoreOptions = subscriptionOptions ? subscriptionOptions(componentProps) : null
				const unSubscribe = subscribeToMoreOptions ? subscribeToMore(subscribeToMoreOptions) : () => {}
				// const unSubscribe = config.subscriptionOptions ? subscribeToMore(config.subscriptionOptions(componentProps)) : () => {}
				const responseProps = props(response)
				if (loading) return <LoadingComponent />
				if (error) return 'error!'
				return <Component {...componentProps} {...responseProps} />
			}}
		</Query>
	)
}

export default withQuery
