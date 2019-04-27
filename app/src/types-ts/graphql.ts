import { DocumentNode } from 'graphql'

/**
 * The subscription as it is returned to the component
 */
export type Subscription = {
	name: string
	unsubscribe: () => {}
}

/**
 *
 */

type ApolloSubscriptionResponse = {
	subscriptionData: {
		data: {}
	}
}

/**
 * The payload returned from the actual response
 */

export type SubscriptionPayload = {
	prev: {}
	newData: {}
}

/**
 * An additional, optional callback that passes the payload
 */

export type SubscriptionCallback = (SubscriptionPayload) => void

/**
 * The shape of the initial setup for a subscription.
 */

export type SubscriptionConfig<PreviousResponse, ResponseData> = {
	name: string
	document: DocumentNode
	updateQuery: (
		SubscriptionCallback,
	) => (
		previous: PreviousResponse,
		ApolloSubscriptionResponse,
	) => {
		data: ResponseData
		// ResponseData,
	}
}

type SubscribeToMoreOptions = {
	document: DocumentNode
	updateQuery: (prev: {}, subscriptionData: {}) => {}
	variables: {}
}

export type StartSubscriptionOptions<PreviousResponse, ResponseData> = SubscriptionConfig<PreviousResponse, ResponseData> & {
	variables?: {}
	subscribeToMore: (SubscribeToMoreOptions) => Subscription
	callback?: SubscriptionCallback
}

export type Variables = {
	[key: string]: any
}

export type QueryConfig = {
	query: DocumentNode
	variables: Variables
}

export type MutationOptions = {
	variables: Variables
	refetchQueries?: Array<QueryConfig>
}

export type Mutation = (options?: MutationOptions) => Promise<void>
