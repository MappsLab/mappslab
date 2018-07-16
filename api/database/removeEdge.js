// @flow
import dbClient from './client'
import type { DBEdge, Txn } from '../flowTypes/database'
import { validateUid, validateUidOrWildcard } from './utils'

const dgraph = require('dgraph-js')
const debug = require('debug')('api')

type EdgeConfig = {
	unique?: boolean,
}

export type Relationship = [DBEdge, EdgeConfig]

export const removeEdge = async ({ fromUid, pred, toUid }: DBEdge, existingTxn?: Txn): Promise<Object> => {
	const txn = existingTxn || dbClient.newTxn()
	try {
		if (!validateUid(fromUid)) throw new Error(`Uid ${fromUid} is not in a valid format`)
		if (!validateUidOrWildcard(toUid)) throw new Error(`Uid ${toUid} is not in a valid format`)
		const mu = new dgraph.Mutation()
		const predQuad = pred === '*' ? pred : `<${pred}>`
		const toQuad = toUid === '*' ? toUid : `<${toUid}>`
		const nQuads = `<${fromUid}> ${predQuad} ${toQuad} .`
		mu.setDelNquads(nQuads)
		await txn.mutate(mu)
		debug(`Removed edge(s): ${nQuads}`)
		if (!existingTxn) await txn.commit()
		return true
	} catch (e) {
		debug(e)
		throw e
	} finally {
		if (!existingTxn) await txn.discard()
	}
}

// Removes all existing edges
export const removeEdges = ({ fromUid }: DBEdge, existingTxn?: Txn): Promise<Object> =>
	removeEdge({ fromUid, pred: '*', toUid: '*' }, existingTxn)

export default removeEdge
