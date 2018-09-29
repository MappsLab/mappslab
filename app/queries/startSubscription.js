// @flow
import type { Subscription, StartSubscriptionOptions } from 'Types/GraphQL'

export const startSubscription = ({
	subscribeToMore,
	variables,
	callback,
	name,
	document,
	updateQuery,
}: StartSubscriptionOptions): Subscription => {
	// eslint-disable-next-line no-unused-vars
	const noop = (_) => {}
	const cb = callback || noop

	const unsubscribe = subscribeToMore({
		document,
		updateQuery: updateQuery(cb),
		variables: variables || {},
	})

	return {
		name,
		unsubscribe,
	}
}

export default startSubscription
