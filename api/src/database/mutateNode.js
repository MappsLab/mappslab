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
		// setSetJson does not delete nodes.
		// Separate out truthy and 'null' values into `setJson` and `deleteJson` objects
		const split = Object.entries(flattened).reduce(
			({ setJson, deleteJson }, [key, val]) => {
				if (val === null) {
					return {
						setJson,
						deleteJson: {
							[key]: val,
							...deleteJson,
						},
					}
				}
				return {
					deleteJson,
					setJson: {
						[key]: val,
						...setJson,
					},
				}
			},
			{ setJson: {}, deleteJson: {} },
		)
		const { setJson, deleteJson } = split
		mu.setSetJson(setJson)
		// Only delete if there are values to delete, otherwise dGraph deletes everything!
		if (Object.keys(deleteJson).length > 0) mu.setDeleteJson({ uid, ...deleteJson })
		await txn.mutate(mu)
		if (!existingTxn) await txn.commit()
		debug(`Mutated node with uid ${uid}:`)
		debug({ uid, ...flattened })
		// @todo add polymorphic input type to mutateNode
		// $FlowFixMse
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
