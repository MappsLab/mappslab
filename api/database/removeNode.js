// @flow
import type { Txn } from 'Types/database'
import dbClient from './client'

const dgraph = require('dgraph-js')
const debug = require('debug')('api')

/**
 * Removes a node and all outgoing edges
 */
const removeNode = async (uid: string, existingTxn: Txn): Promise<boolean> => {
	const txn = existingTxn || dbClient.newTxn()
	try {
		const mu = new dgraph.Mutation()
		mu.setDelNquads(`<${uid}> * * .`)
		await txn.mutate(mu)
		if (!existingTxn) await txn.commit()
		debug(`Deleted all nodes with uid ${uid}`)
		return true
	} catch (e) {
		debug(e)
		throw e
	} finally {
		if (!existingTxn) await txn.discard()
	}
}

export default removeNode
