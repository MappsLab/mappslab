// @flow
import type { EdgeInput, Txn } from 'Types/database'
import dbClient from './client'
import createEdge from './createEdge'

const dgraph = require('dgraph-js')
const debug = require('debug')('api')

/**
 * CreateNodeWithEdge:
 *
 * Creates a node with edges.
 *
 */

/*
 * @todo Define FlowType to allow for an empty EdgeConfig
 * @body Or create a wrapper function to apply a default
 */

type NewEdges = Array<EdgeInput>

const createNodeWithEdges = async (nodeData: Object, edges: NewEdges, existingTxn?: Txn): Promise<Object> => {
	const txn = existingTxn || dbClient.newTxn()
	try {
		// create the new node
		const mu = new dgraph.Mutation()
		mu.setSetJson(nodeData)
		const newNode = await txn.mutate(mu)

		const newNodeUid = newNode.getUidsMap().get('blank-0')
		debug(newNodeUid)

		const newEdges = await Promise.all(
			edges.map(async ([partialEdge, edgeConfig]) => {
				const { toUid, fromUid, pred, facets } = partialEdge
				if ((toUid && fromUid) || (!toUid && !fromUid))
					throw new Error('To create a new edge, supply either a toUid or a fromUid, not both')
				const newEdge = toUid
					? // If a toUid exists set the new node as the 'from' uid
					  { toUid, pred, fromUid: newNodeUid, facets }
					: // Otherwise, set the new node as the 'to' uid
					  { toUid: newNodeUid, pred, fromUid, facets }
				debug(newEdge)
				// $FlowFixMe
				await createEdge(newEdge, edgeConfig, txn)
				return newEdge
			}),
		)
		debug(`Created new node with uid ${newNodeUid} with ${newEdges.length} edges`)
		if (!existingTxn) await txn.commit()
		debug(newEdges)
		return {
			uid: newNodeUid,
			...nodeData,
		}
	} catch (e) {
		debug(e)
		throw e
	} finally {
		if (!existingTxn) await txn.discard()
	}
}

export default createNodeWithEdges
