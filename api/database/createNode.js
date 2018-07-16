// @flow
import { flatten } from 'flat'
import dbClient from './client'
import type { Txn, DBNode } from '../flowTypes/database'

const dgraph = require('dgraph-js')
const debug = require('debug')('api')

const createNode = async (data: Object, existingTxn?: Txn): Promise<DBNode | Error> => {
	const txn = existingTxn || dbClient.newTxn()
	try {
		const mu = new dgraph.Mutation()
		mu.setSetJson(flatten(data))
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
