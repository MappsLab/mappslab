// @flow
import dbClient from './client'
import type { DBNode, Txn, TxnWithNode } from '../types/shared/sharedTypes'

const dgraph = require('dgraph-js')
const debug = require('debug')('api')

const mutateNode = async (uid: string, data: DBNode, existingTxn?: Txn): Promise<DBNode | Error> => {
	const txn = existingTxn || dbClient.newTxn()
	if (!uid && typeof uid !== 'string') throw new Error('You must supply a node UID for a mutation')
	try {
		const mu = new dgraph.Mutation()
		mu.setSetJson({
			uid,
			...data,
		})
		await txn.mutate(mu)
		if (!existingTxn) await txn.commit()
		debug(`Mutated node with uid ${uid}:`)
		debug({ uid, ...data })
		return {
			txn,
			data: {
				uid,
				...data,
			},
		}
	} catch (e) {
		debug(e)
		throw e
	} finally {
		if (!existingTxn) await txn.discard()
	}
}

export default mutateNode
