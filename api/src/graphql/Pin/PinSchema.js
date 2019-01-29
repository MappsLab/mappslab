// @flow

const Pin = /* GraphQL */ `
	type Pin implements Node {
		uid: String!
		title: String
		lat: Float!
		lng: Float!
		description: String
		owner: User
		maps: MapConnection
		routes: RouteConnection
		draft: Boolean
	}

	# Relationships

	type PinEdge implements Edge {
		cursor: String!
		node: Pin
	}

	type PinConnection implements Connection {
		pageInfo: PageInfo!
		edges: [PinEdge]!
	}

	# Inputs

	input NewPinInput {
		title: String
		draft: Boolean
		lat: Float!
		lng: Float!
		description: String
		deleted: Boolean
		addToMaps: [String]!
		lessonUids: [String]
		addToRoute: AddPinToRouteInput
	}

	input AddPinToRouteInput {
		# if no routeUid is supplied, a new route will be created
		routeUid: String
		# if no connectToPin is supplied, this new pin will be placed at the beginning
		connectToPin: String
	}

	input GetPinInput {
		uid: String!
	}

	input UpdatePinInput {
		uid: String
		title: String
		lat: Float
		lng: Float
		description: String
		addToMaps: [String]
		lessonUids: [String]
		addToRoute: AddPinToRouteInput
	}

	input PinSortParameter {
		title: SortOrder
		lat: SortOrder
		lng: SortOrder
	}

	input PinFilterParameter {
		title: StringOperators
		# Pin-specific relationship filters
		pinnedByUser: RelationshipOperators
		pinnedInMap: RelationshipOperators
	}

	input PinListOptions {
		first: Int
		after: String
		sort: PinSortParameter
		where: PinFilterParameter
	}

	input PinSubscriptionInput {
		mapUid: String!
	}

	type PinSubscription {
		pin: Pin!
	}

	# Queries & Mutations

	extend type Query {
		pin(input: GetPinInput!): Pin
		pins(input: PinListOptions): PinConnection
	}

	extend type Mutation {
		createPin(input: NewPinInput!): Pin!
		updatePin(input: UpdatePinInput!): Pin!
		deletePin(input: GetPinInput!): Success!
	}

	extend type Subscription {
		pinAddedToMap(input: PinSubscriptionInput!): PinSubscription!
		pinUpdated(input: PinSubscriptionInput!): PinSubscription!
		pinDeleted(input: PinSubscriptionInput!): PinSubscription!
	}
`

export default Pin
