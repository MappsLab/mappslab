// @flow
import type { DBEdge, Txn } from 'Types/database'
import dbClient from './client'
import removeNode from './removeNode'
import removeEdge from './removeEdge'

const debug = require('debug')('api')

/**
 * RemoveNodeWithEdges
 *
 * Remove a node with its edges
 *
 */

type Relationships = Array<DBEdge>

const removeNodeWithEdges = async (
	uid: string,
	relationships: Relationships,
	existingTxn?: Txn,
): Promise<boolean> => {
	const txn = existingTxn || dbClient.newTxn()
	try {
		debug(`Removing node ${uid} and edges:`)
		debug(relationships)
		await removeNode(uid, txn)
		await Promise.all(relationships.map((r) => removeEdge(r, txn)))
		if (!existingTxn) await txn.commit()
		return true
	} catch (e) {
		debug(e)
		throw e
	} finally {
		if (!existingTxn) await txn.discard()
	}
}

export default removeNodeWithEdges
