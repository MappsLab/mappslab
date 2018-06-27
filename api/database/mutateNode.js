// @flow
import dbClient from './client'
import type { DBNode } from '../types/shared/sharedTypes'

const dgraph = require('dgraph-js')
const debug = require('debug')('api')

const mutateNode = async (uid: string, data: DBNode): Promise<DBNode | Error> => {
	const txn = dbClient.newTxn()
	if (!uid && typeof uid !== 'string') throw new Error('You must supply a node UID for a mutation')
	try {
		const mu = new dgraph.Mutation()
		mu.setSetJson({
			uid,
			...data,
		})
		await txn.mutate(mu)
		await txn.commit()
		debug(`Mutated node with uid ${uid}:`)
		debug({ uid, ...data })
		return {
			...data,
		}
	} catch (e) {
		debug(e)
		throw e
	} finally {
		await txn.discard()
	}
}

export default mutateNode
