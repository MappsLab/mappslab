// @flow
import createEdge from './createEdge'
import createNode from './createNode'
import dbClient from './client'
import { createVariables } from './utils'

const debug = require('debug')('api')

/** Shortcuts **/

const query = (query: string, vars?: Object): Function => {
	return vars
		? // if we have vars, parse them
		  dbClient.newTxn().queryWithVars(query, createVariables(vars))
		: // Otherwise, normal query
		  dbClient.newTxn().query(query)
}

module.exports = {
	createEdge,
	createNode,
	dbClient,
	query,
}
