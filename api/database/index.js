// @flow
import { mapObjIndexed } from 'ramda'
import { unflatten } from 'flat'
import createEdge from './createEdge'
import createNode from './createNode'
import createNodeWithEdge from './createNodeWithEdge'
import mutateNode from './mutateNode'
import dbClient from './client'
import { createVariables } from './utils'

// const debug = require('debug')('api')

/* Shortcuts */

const query = async (queryString: string, vars?: Object): Promise<Object | null> => {
	const q = vars
		? // if we have vars, parse them
		  dbClient.newTxn().queryWithVars(queryString, createVariables(vars))
		: // Otherwise, normal query
		  dbClient.newTxn().query(queryString)
	const result = await q
	return result ? mapObjIndexed((value) => value.map(unflatten))(result.getJson()) : null
}

module.exports = {
	createEdge,
	createNode,
	createNodeWithEdge,
	mutateNode,
	dbClient,
	query,
}
