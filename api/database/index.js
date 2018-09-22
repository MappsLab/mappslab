// @flow
import { mapObjIndexed } from 'ramda'
import { unflatten } from 'flat'
import { createVariables } from 'Database/utils'
import dbClient from './client'

export { default as createEdge } from './createEdge'
export { default as createNode } from './createNode'
export { default as createNodeWithEdges } from './createNodeWithEdges'
export { default as removeNode } from './removeNode'
export { default as removeEdge } from './removeEdge'
export { default as removeNodeWithEdges } from './removeNodeWithEdges'
export { default as mutateNode } from './mutateNode'

const debug = require('debug')('api')

/* Shortcuts */

/** ideal API: 

const addUserWithAvatar = db.txn(
	createNode({ input: { ...userData}, config }), // creates User
	createNode(({ output }) => ({ input: { ...imageData }}, { userData: output.data }))
	createEdge(({ output, prev, txns }) => ({ fromUid: newUid, pred: 'has_avatar', toUid: imageUid }, { unique: true }))
)

pipe the data through a series of transactions, finally commit it at the end.

mabye: No config object? If you want an edge to be unique, just include a removeEdges txn.

6 functions: createNode, createEdge, updateNode, updateEdge, removeNode, removeEdge

all functions return an accumulator. User responsibility to append to it

all functions accept input, or a function that:
	- supplies the accumulator
	- returns the output and accumulator ({ output: newOutput, prev })
	- output takes the shape: { data: returned data, response: dgraph-js response,}

*/

export const query = async (queryString: string, vars?: Object): Promise<Object | null> => {
	try {
		const q = vars
			? // if we have vars, parse them
			  dbClient.newTxn().queryWithVars(queryString, createVariables(vars))
			: // Otherwise, normal query
			  dbClient.newTxn().query(queryString)
		const result = await q
		return result ? mapObjIndexed((value) => value.map(unflatten))(result.getJson()) : null
	} catch (err) {
		debug('--------- Dgraph query error:')
		debug(err)
		debug('-----------------------------')
		throw err
	}
}
