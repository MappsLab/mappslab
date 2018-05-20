// @flow
import type { ComponentType } from 'react'
import * as R from 'ramda'
import { graphql } from 'react-apollo'

const _makeQuery = (query, config: Object, Component: ComponentType<any>) => graphql(query, config)(Component)

export const makeQuery = R.curry(_makeQuery)

export const unwindEdges = R.pipe(
	R.toPairs,
	// Iterate over the properties and their values
	R.reduce(
		(acc, [key, value]) =>
			value && value.edges && Array.isArray(value.edges)
				? // When the value has an 'edges' property that is an array,
				  R.pipe(
						// Pull out the 'pageInfo' prop and rename it
						R.assoc(`${key}PageInfo`, value.pageInfo || {}),
						// And pluck out the nodes
						R.assoc(key, R.pluck('node', value.edges).map(unwindEdges)),
				  )(acc)
				: // otherwise, if it's an object
				  typeof value === 'object'
					? // unwind it
					  R.assoc(key, unwindEdges(value))(acc)
					: // lastly, return the value as is
					  R.assoc(key, value)(acc),
		{},
	),
)
