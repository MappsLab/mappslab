// @flow
import type { ComponentType } from 'react'
import * as R from 'ramda'
import { graphql } from 'react-apollo'
// import { mapProps } from 'recompose'

// export const defaultPropsToMap = {
// 	props: ({ ownProps, data }) => {
// 		return {
// 			...data,
// 		}
// 	},
// }

const _makeQuery = (query, config: Object, Component: ComponentType<any>) => graphql(query, config)(Component)

export const makeQuery = R.curry(_makeQuery)

export const unwindEdges = (prop: string, data: Object): Object | Array<Object> => {
	return R.pipe(
		R.when(
			R.path([prop, 'edges']),

			R.pipe(
				// Get the prop -> edges
				R.path([prop, 'edges']),
				// Get all of the nodes
				R.pluck('node'),
				// Check each node to see if there are more edges to unwind
				R.map(
					// For each key of the node,
					R.mapObjIndexed(
						(value, key, obj) =>
							value.edges
								? // If the key is 'edge', unwind it
								  unwindEdges(key, obj)
								: // otherwise, just return the value
								  value,
					),
				),
			),
		),
	)(data)
}
