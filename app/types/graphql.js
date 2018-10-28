// @flow
import type { DocumentNode } from 'graphql'

/**
 * The subscription as it is returned to the component
 */
export type Subscription = {
	name: string,
	unsubscribe: () => {},
}

/**
 *
 */

type ApolloSubscriptionResponse = {
	subscriptionData: {
		data: {},
	},
}

/**
 * The payload returned from the actual response
 */

export type SubscriptionPayload = {
	prev: {},
	newData: {},
}

/**
 * An additional, optional callback that passes the payload
 */

export type SubscriptionCallback = (SubscriptionPayload) => void

/**
 * The shape of the initial setup for a subscription.
 */

export type SubscriptionConfig = {
	name: string,
	document: DocumentNode,
	updateQuery: (SubscriptionCallback) => (previous: {}, ApolloSubscriptionResponse) => {},
}

type SubscribeToMoreOptions = {
	document: DocumentNode,
	updateQuery: (prev: {}, subscriptionData: {}) => {},
	variables: {},
}

export type StartSubscriptionOptions = SubscriptionConfig & {
	variables?: {},
	subscribeToMore: (SubscribeToMoreOptions) => Subscription,
	callback?: SubscriptionCallback,
}

type MutationOptions = {
	variables: {},
	// refetchQueries:
	// optimisticResponse:
	// update:
}

export type Mutation = (options?: MutationOptions) => Promise<void>
