// @flow
import type { DBEdge, Txn, EdgeConfig } from 'Types/database'
import dbClient from './client'
import { removeEdge } from './removeEdge'
import { serializeFacets } from './utils'

const dgraph = require('dgraph-js')
const debug = require('debug')('api')

export type Relationship = [DBEdge, EdgeConfig]

const defaultConfig = {
	unique: false,
}

const createEdge = async (
	{ fromUid, pred, toUid, facets }: DBEdge,
	opts: EdgeConfig,
	existingTxn?: Txn,
): Promise<true> => {
	const config = { ...defaultConfig, ...opts }
	const txn = existingTxn || dbClient.newTxn()
	try {
		const mu = new dgraph.Mutation()

		// If this relationship is singular, delete the existing edges
		if (config.unique) {
			await removeEdge({ fromUid, pred, toUid: '*' }, txn).catch((e) => {
				throw e
			})
		}
		const facetString = serializeFacets(facets)
		mu.setSetNquads(`<${fromUid}> <${pred}> <${toUid}> ${facetString} .`)
		await txn.mutate(mu)
		debug(`Created new edge: <${fromUid}> <${pred}> <${toUid}>`)
		if (!existingTxn) await txn.commit()
		return true
	} catch (e) {
		debug(e)
		throw e
	} finally {
		if (!existingTxn) await txn.discard()
	}
}

export default createEdge
