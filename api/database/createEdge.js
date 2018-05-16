// @flow
import dbClient from './client'
import type { DBEdge } from '../types/shared/sharedTypes'

const dgraph = require('dgraph-js')
const debug = require('debug')('api')

type ClassroomEdge = DBEdge & {
	pred: 'teaches_in' | 'learns_in',
}

const createEdge = async ({ fromUid, pred, toUid }: ClassroomEdge): Promise<true | Error> => {
	const txn = dbClient.newTxn()
	try {
		const mu = new dgraph.Mutation()
		mu.setSetNquads(`<${fromUid}> <${pred}> <${toUid}> .`)
		await txn.mutate(mu)
		if (process.env.NO_COMMIT !== 'true') await txn.commit()
		debug(`Created new node: <${fromUid}> <${pred}> <${toUid}>`)
		if (process.env.NO_COMMIT === 'true') debug('   [transaction was not comitted]')
		return true
	} catch (e) {
		debug(e)
		throw e
	} finally {
		await txn.discard()
	}
}

export default createEdge
