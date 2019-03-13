// @flow
import { flatten } from 'flat'
import type { DBNode, EdgeInput, Txn } from 'Types/database'
import dbClient from './client'
import createEdge from './createEdge'

const dgraph = require('dgraph-js')
const debug = require('debug')('api')

type MutateArgs = {
	data: DBNode,
	edges?: Array<EdgeInput>,
}

const promiseSerial = (funcs) =>
	funcs.reduce((promise, func) => promise.then((result) => func().then(Array.prototype.concat.bind(result))), Promise.resolve([]))

const mutateNode = async (uid: string, { data, edges }: MutateArgs, existingTxn?: Txn): Promise<DBNode> => {
	const txn = existingTxn || dbClient.newTxn()
	if (!uid && typeof uid !== 'string') throw new Error('You must supply a node UID for a mutation')
	try {
		const mu = new dgraph.Mutation()

		// Add / update the edges

		const updatedEdges = edges
			? await promiseSerial(
					edges.map(([partialEdge, edgeConfig]) => async () => {
						const { toUid, fromUid, pred, facets } = partialEdge
						if ((toUid && fromUid) || (!toUid && !fromUid))
							throw new Error('To create or update an edge, supply either a toUid or a fromUid, not both')
						const newEdge = toUid
							? // If a toUid exists set the mutated node as the 'from' uid
							  { toUid, pred, fromUid: uid, facets }
							: // Otherwise, set the mutated node as the 'to' uid
							  { toUid: uid, pred, fromUid, facets }
						// $FlowFixMe
						await createEdge(newEdge, edgeConfig, txn)
						return newEdge
					}),
			  )
			: []

		// Flatten object data to dot-keys, i.e. { address: { line1: 'xyz' }} => { address.line1: 'xyz' }
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
		console.log(flattened)
		console.log(deleteJson)
		if (Object.keys(deleteJson).length > 0) mu.setDeleteJson({ uid, ...deleteJson })
		await txn.mutate(mu)
		if (!existingTxn) await txn.commit()
		debug(`Mutated node with uid ${uid}:`)
		debug({ uid, ...flattened })
		debug(`Updated ${updatedEdges.length} edges:`)
		debug({ updatedEdges })
		/* @todo add polymorphic input type to mutateNode */
		// $FlowFixMe
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
