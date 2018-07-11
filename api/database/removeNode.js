// @flow
import dbClient from './client'
import type { DBEdge } from '../types/shared/sharedTypes'

const dgraph = require('dgraph-js')
const debug = require('debug')('api')

/**
 * Removes a node and all outgoing edges
 */
export const removeNode = async (uid: string): Promise<boolean | Error> => {
	const txn = dbClient.newTxn()
	try {
		const mu = new dgraph.Mutation()
		mu.setDelNquads(`<${uid}> * * .`)
		await txn.mutate(mu)
		await txn.commit()
		debug(`Deleted all nodes with uid ${uid}`)
		return true
	} catch (e) {
		debug(e)
		throw e
	} finally {
		await txn.discard()
	}
}

/**
 * Removes an edge.
 * When deleting a node, all incoming edges (where it is the 'to' in the edge) must be
 * deleted manually.
 */
export const removeEdge = async ({ fromUid, pred, toUid }: DBEdge): Promise<boolean | Error> => {
	const txn = dbClient.newTxn()
	try {
		const mu = new dgraph.Mutation()
		mu.setDelNquads(`<${fromUid}> <${pred}> <${toUid}> .`)
		await txn.mutate(mu)
		await txn.commit()
		debug(`Deleted edge <${fromUid}> <${pred}> <${toUid}> .`)
		return true
	} catch (e) {
		debug(e)
		throw e
	} finally {
		await txn.discard()
	}
}
