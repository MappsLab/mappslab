import { DocumentNode } from 'graphql'
import { Subscription } from './generated'

interface Edge<T> {
	cursor: string | number
	node: T
}

/**
 * The subscription as it is returned to the component
 */

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

export type SubscriptionCallback = (prev: {}, newData: {}) => void

/**
 * The shape of the initial setup for a subscription.
 */

export type SubscriptionConfig<PreviousResponse, ResponseData> = {
	name: string
	document: DocumentNode
	updateQuery: (
		callback: SubscriptionCallback,
	) => (
		previous: PreviousResponse,
		response: ApolloSubscriptionResponse,
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

export type StartSubscriptionOptions<
	PreviousResponse,
	ResponseData
> = SubscriptionConfig<PreviousResponse, ResponseData> & {
	variables?: {}
	subscribeToMore: (options: SubscribeToMoreOptions) => Subscription
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

