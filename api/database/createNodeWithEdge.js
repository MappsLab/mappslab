// @flow
import { assoc } from 'ramda'
import dbClient from './client'

const dgraph = require('dgraph-js')
const debug = require('debug')('api')

/**
 * CreateNodeWithEdge:
 *
 * Creates a node with an immediate edge. For instance:
 *  - Create an image and associate it with an artwork.
 *  - Create an address and associate it with a user.
 *
 */

type PartialEdge = {
	relatedUid: string,
	reverse: boolean, //
	pred: string,
}

type EdgeConfig = {
	unique?: boolean,
}

const defaultConfig = {
	unique: false,
}

const createNodeWithEdge = async (nodeData: Object, relationship: PartialEdge, opts?: EdgeConfig): Promise<Object> => {
	const config = { ...defaultConfig, ...opts }
	const { relatedUid, pred, reverse } = relationship
	if (!relatedUid) throw new Error('A related UID must be supplied')
	const txn = dbClient.newTxn()
	try {
		// create the new node
		const mu = new dgraph.Mutation()
		mu.setSetJson(nodeData)
		const newNode = await txn.mutate(mu)
		// If this relationship is singular. I.e. a user can only have one has_image edge,
		// delete the existing edges
		if (config.unique) {
			const delMu = new dgraph.Mutation()
			const delNquad = reverse
				? // if the related node owns this edge
				  `<${relatedUid}> <${pred}> * .`
				: // otherwise the new node owns
				  `* <${pred}> <${relatedUid}> .`
			delMu.setDelNquads(delNquad)
			await txn.mutate(delMu)
		}
		// create the edge
		const newNodeUid = newNode.getUidsMap().get('blank-0')
		const edgeMu = new dgraph.Mutation()
		const edgeNQuad = reverse
			? // if the related node owns this edge
			  `<${relatedUid}> <${pred}> <${newNodeUid}> .`
			: // otherwise the new node owns
			  `<${newNodeUid}> <${pred}> <${relatedUid}> .`
		edgeMu.setSetNquads(edgeNQuad)
		await txn.mutate(edgeMu)
		debug(`Created new node with edge ${edgeNQuad}`)
		await txn.commit()
		const assocPred = reverse ? `~${pred}` : pred
		return assoc(assocPred, relatedUid)({ uid: newNodeUid, ...nodeData })
	} catch (e) {
		debug(e)
		throw e
	} finally {
		await txn.discard()
	}
}

export default createNodeWithEdge
