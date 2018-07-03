// @flow
import { pick } from 'ramda'
import dbClient from './client'
import createEdge from './createEdge'
import type { PartialEdge, EdgeConfig, Txn } from '../flowTypes/database'

const dgraph = require('dgraph-js')
const debug = require('debug')('api')

/**
 * CreateNodeWithEdge:
 *
 * Creates a node with edges.
 *
 */

// TODO: Define FlowType to allow for an empty EdgeConfig,
// Or create a wrapper function to apply a default
type NewRelationship = [PartialEdge, EdgeConfig]

// TODO: Allow for a single relationship. Do some arrayifying or something
type NewRelationships = Array<NewRelationship>

const createNodeWithEdges = async (nodeData: Object, relationships: NewRelationships, existingTxn?: Txn): Promise<Object> => {
	const txn = dbClient.newTxn()
	try {
		// create the new node
		const mu = new dgraph.Mutation()
		mu.setSetJson(nodeData)
		const newNode = await txn.mutate(mu)
		const newNodeUid = newNode.getUidsMap().get('blank-0')
		const newEdges = await Promise.all(
			relationships.map(async ([partialEdge, edgeConfig]) => {
				const { toUid, fromUid, pred } = pick(['toUid', 'fromUid', 'pred'], partialEdge)
				if ((toUid && fromUid) || (!toUid && !fromUid))
					throw new Error('To create a new edge, supply either a toUid or a fromUid, not both')
				const newRelationship = toUid
					? // If a toUid exists set the new node as the 'from' uid
					  { toUid, pred, fromUid: newNodeUid }
					: // Otherwise, set the new node as the 'to' uid
					  { toUid: newNodeUid, pred, fromUid }
				return createEdge(newRelationship, edgeConfig, txn)
			}),
		)
		debug(`Created new node with uid ${newNodeUid} with ${newEdges.length} edges`)
		if (!existingTxn) await txn.commit()
		return existingTxn
			? txn
			: {
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
