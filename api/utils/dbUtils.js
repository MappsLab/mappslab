// @flow
import * as R from 'ramda'
import { arrayify } from './'

// TODO annotate result with "DBResult" type
export const getEdges = (result: Object, queryName: string, field: string | Array<string>): Array<Array<Object>> =>
	R.pipe(
		// Get the root result array from the query
		R.prop(queryName),
		// For each of these results,
		R.map(
			R.pipe(
				// Get the field result array
				R.path(arrayify(field)),
				// and return this as a proper 'edge' with a cursor and node
				R.map((node) => ({
					cursor: node.uid,
					node,
				})),
			),
		),
	)(result.getJson())

export const getEdgesOfFirst = R.head(getEdges)
