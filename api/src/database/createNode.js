// @flow
import { flatten } from 'flat'
import type { Txn, DBNode } from 'Types/database'
import dbClient from './client'

const dgraph = require('dgraph-js')
const debug = require('debug')('api')

const createNode = async (data: Object, existingTxn?: Txn): Promise<DBNode> => {
	const txn = existingTxn || dbClient.newTxn()
	try {
		const mu = new dgraph.Mutation()
		mu.setSetJson(flatten(data, { safe: true }))
		const newClassroom = await txn.mutate(mu)
		const uid = newClassroom.getUidsMap().get('blank-0')
		debug(`Created new node with uid ${uid}`)
		if (!existingTxn) await txn.commit()
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

export default createNode