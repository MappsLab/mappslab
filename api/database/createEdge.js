// @flow
import dbClient from './client'
import type { DBEdge, Txn, EdgeConfig } from '../flowTypes/database'
import { removeEdge } from './removeEdge'

const dgraph = require('dgraph-js')
const debug = require('debug')('api')

export type Relationship = [DBEdge, EdgeConfig]

const defaultConfig = {
	unique: false,
}

const createEdge = async ({ fromUid, pred, toUid }: DBEdge, opts: EdgeConfig, existingTxn?: Txn): Promise<Object> => {
	const config = { ...defaultConfig, ...opts }
	let txn = existingTxn || dbClient.newTxn()
	try {
		const mu = new dgraph.Mutation()

		// If this relationship is singular, delete the existing edges
		if (config.unique) {
			txn = await removeEdge({ fromUid, pred, toUid: '*' }, txn).catch((e) => {
				throw e
			})
		}

		mu.setSetNquads(`<${fromUid}> <${pred}> <${toUid}> .`)
		await txn.mutate(mu)
		debug(`Created new edge: <${fromUid}> <${pred}> <${toUid}>`)
		if (!existingTxn) await txn.commit()
		return txn
	} catch (e) {
		console.log(e)
		debug(e)
		throw e
	} finally {
		if (!existingTxn) await txn.discard()
	}
}

export default createEdge
