// @flow
import { flatten } from 'flat'
import type { DBNode, Txn } from 'Types/database'
import dbClient from './client'

const dgraph = require('dgraph-js')
const debug = require('debug')('api')

const mutateNode = async (uid: string, data: DBNode, existingTxn?: Txn): Promise<DBNode> => {
	const txn = existingTxn || dbClient.newTxn()
	if (!uid && typeof uid !== 'string') throw new Error('You must supply a node UID for a mutation')
	try {
		const mu = new dgraph.Mutation()
		const flattened = flatten(
			{
				uid,
				...data,
			},
			{ safe: true },
		)
		mu.setSetJson(flattened)
		await txn.mutate(mu)
		if (!existingTxn) await txn.commit()
		debug(`Mutated node with uid ${uid}:`)
		debug({ uid, ...data })
		// $FlowFixMe --- TODO
		return {
			uid,
			...data,
		}
	} catch (e) {
		debug(e)
		throw e
	} finally {
		if (!existingTxn) await txn.discard()
	}
}

export default mutateNode
