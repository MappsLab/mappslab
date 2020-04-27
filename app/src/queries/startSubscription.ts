import { Subscription, StartSubscriptionOptions } from '../types-ts'

export const startSubscription = <PreviousResponse, ResponseData>({
	subscribeToMore,
	variables,
	callback,
	name,
	document,
	updateQuery,
}: StartSubscriptionOptions<PreviousResponse, ResponseData>): Subscription => {
	const noop = () => {}
	const cb = callback || noop

	const subscription = subscribeToMore({
		document,
		updateQuery: updateQuery(cb),
		variables: variables || {},
	})
	return subscription
}

export default startSubscription
