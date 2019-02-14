// @flow
import faker from 'faker'
import { setSchema } from 'Database/setSchema'
import dbClient from 'Database/client'
import { createAdminUsers } from '../utils/db'

const dgraph = require('dgraph-js')
const debug = require('debug')('seed')

faker.seed(667)

const dropAll = async () => {
	const op = new dgraph.Operation()
	op.setDropAll(true)
	debug('Dropping..')
	await dbClient.alter(op)
}

const seedDatabase = async () => {
	debug('🌻 🌻 🌻 Seeding Test Database... 🌻 🌻 🌻 ')
	await dropAll()
	await setSchema()
	debug('🤓  Creating admin users')
	await createAdminUsers()

	debug('🌻 🌻 🌻 Successfully seeded test database 🌻 🌻 🌻 ')
}

seedDatabase()
