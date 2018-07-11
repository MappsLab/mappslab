// @flow
import { flatten } from 'flat'
import dbClient from './client'
import type { DBNode } from '../types/shared/sharedTypes'

const dgraph = require('dgraph-js')
const debug = require('debug')('api')

const createNode = async (data: Object): Promise<DBNode | Error> => {
	const txn = dbClient.newTxn()
	try {
		const mu = new dgraph.Mutation()
		mu.setSetJson(flatten(data))
		const newClassroom = await txn.mutate(mu)
		await txn.commit()
		const uid = newClassroom.getUidsMap().get('blank-0')
		debug(`Created new node with uid ${uid}`)
		return {
			uid,
			...data,
		}
	} catch (e) {
		debug(e)
		throw e
	} finally {
		await txn.discard()
	}
}

export default createNode
