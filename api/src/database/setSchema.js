// @flow
import dbClient from './client'

const dgraph = require('dgraph-js')
const debug = require('debug')('api')

export const setSchema = async () => {
	const schema: string = [
		/**
		 * Shared Indices
		 * type: 'user' | 'classroom' | ...
		 * slug: unique string identifier
		 */
		'type: string @index(hash) .',
		'slug: string @index(hash) . ',
		'title: string @index(hash, trigram) . ',
		'deleted: bool @index(bool) . ',

		/**
		 * User Indices
		 */
		'email: string @index(hash) . ',
		'roles: [string] @index(term) .',
		'name: string @index(hash, trigram) . ',
		'passwordReset.token: string @index(hash) .',
		/* <user> <teaches_in> <classroom> */
		'teaches_in: uid @reverse @count . ',
		/* <user> <learns_in> <classroom> */
		'learns_in: uid @reverse @count . ',
		/* <user> <pinned> <pin> */
		'pinned: uid @reverse @count . ',
		/* <user> <owns_route> <route> */
		'owns_route: uid @reverse . ',

		/**
		 * Classroom Indices
		 */
		'has_map: uid @reverse .',

		/**
		 * Map Indices
		 */
		'created_by: uid @reverse . ',
		'has_lesson: uid @reverse @count . ',
		'has_goal: uid @reverse @count . ',
		/* <map> <has_pin> <pin> */
		'has_pin: uid @reverse @count . ',
		/* <map> <has_pin> <pin> */
		'has_pin: uid @reverse @count . ',

		/**
		 * Route Indices
		 */

		'includes_pin: uid @reverse @count . ',

		/**
		 * Lesson Indices
		 */
		'has_goal: uid @reverse @count . ',
		/* <lesson> <has_pin> <pin> */
		'has_pin: uid @reverse @count . ',
		'has_route: uid @reverse @count . ',
		'has_group: uid @reverse @count . ',
	].join('\n')

	debug(schema)
	const op = new dgraph.Operation()
	op.setSchema(schema)
	await dbClient.alter(op)
}
