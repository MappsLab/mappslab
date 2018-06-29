// @flow
import { mapObjIndexed } from 'ramda'
import { unflatten } from 'flat'
import createEdge from './createEdge'
import createNode from './createNode'
import removeNode from './removeNode'
import createNodeWithEdge from './createNodeWithEdge'
import mutateNode from './mutateNode'
import dbClient from './client'
import { createVariables } from './utils'

// const debug = require('debug')('api')

/* Shortcuts */

const query = async (queryString: string, vars?: Object): Promise<Object | null> => {
	try {
		const q = vars
			? // if we have vars, parse them
			  dbClient.newTxn().queryWithVars(queryString, createVariables(vars))
			: // Otherwise, normal query
			  dbClient.newTxn().query(queryString)
		const result = await q
		return result ? mapObjIndexed((value) => value.map(unflatten))(result.getJson()) : null
	} catch (err) {
		debug('--------- Dgraph query error:')
		debug(err)
		debug('-----------------------------')
		throw err
	}
}

module.exports = {
	createEdge,
	createNode,
	createNodeWithEdge,
	mutateNode,
	removeNode,
	dbClient,
	query,
}
