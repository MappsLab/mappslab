// @flow
import faker from 'faker'
import db from '../../index'
import { flatten } from 'ramda'

import { generateUsers, generateFollowerConnections } from './generate'
import { createUser, createFriendship } from '../../../types/User/UserModel'

const dgraph = require('dgraph-js')
const debug = require('debug')('api:testDatabase')

faker.seed(666)

const dropAll = async () => {
	const op = new dgraph.Operation()
	op.setDropAll(true)
	await db.alter(op)
}
const promiseSerial = (funcs) =>
	funcs.reduce((promise, func) => promise.then((result) => func().then(Array.prototype.concat.bind(result))), Promise.resolve([]))

const setSchema = async () => {
	const schema = `
		type: string @index(hash) .
		username: string @index(hash) .
		email: string @index(hash) .
		follows: uid @reverse @count .
		locale: string @index(hash) .
	`
	const op = new dgraph.Operation()
	op.setSchema(schema)
	await db.alter(op)
}

const seedDatabase = async () => {
	await dropAll()
	await setSchema()
	debug('🌻 🌻 🌻 Seeding Test Database... 🌻 🌻 🌻 ')
	debug('👶  Creating and inserting users...')
	const newUsers = await promiseSerial(generateUsers(50).map((u) => () => createUser(u)))
	debug(`👶  Created ${newUsers.length} users`)

	debug('🤝  Making some friends..')
	const userKeys = newUsers.map((u) => u.uid)
	const makeFriends = generateFollowerConnections(userKeys)
	const friendships = flatten(await Promise.all(newUsers.map(makeFriends))).filter(
		({ userUid, followedUid }) => userUid !== followedUid,
	)

	const connections = await promiseSerial(
		friendships.map(({ userUid, followedUid, date }) => () => createFriendship(userUid, followedUid, date)),
	)

	debug(`🤝  Made ${connections.length} friendships`)
	debug('🌻 🌻 🌻 Successfully seeded test database 🌻 🌻 🌻 ')
}

seedDatabase()
