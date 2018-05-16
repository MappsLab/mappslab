// @flow
import faker from 'faker'
import { dbClient } from '../../index'
import { generateUsers, generateClassrooms, generateClassroomConnections } from './generate'
import { createUser } from '../../../types/User/UserModel'
import { createClassroom, createClassroomConnection } from '../../../types/Classroom/ClassroomModel'

const dgraph = require('dgraph-js')
const debug = require('debug')('api:testDatabase')

faker.seed()

const dropAll = async () => {
	const op = new dgraph.Operation()
	op.setDropAll(true)
	await dbClient.alter(op)
}
const promiseSerial = (funcs) =>
	funcs.reduce((promise, func) => promise.then((result) => func().then(Array.prototype.concat.bind(result))), Promise.resolve([]))

const setSchema = async () => {
	const schema = `
		role: string @index(hash) .
		type: string @index(hash) .
		teaches_in: uid @reverse .
		learns_in: uid @reverse .
	`
	const op = new dgraph.Operation()
	op.setSchema(schema)
	await dbClient.alter(op)
}

const seedDatabase = async () => {
	await dropAll()
	await setSchema()
	debug('🌻 🌻 🌻 Seeding Test Database... 🌻 🌻 🌻 ')
	debug('👶  Creating and inserting users...')
	const users = await promiseSerial(generateUsers(100).map((u) => () => createUser(u)))
	const students = users.filter((u) => u.role === 'student')
	const teachers = users.filter((u) => u.role === 'teacher')
	debug(`👶  Created ${students.length} students and ${teachers.length} teachers`)

	debug('🏫  Adding some classrooms owned by teachers..')
	const cCount = Math.floor(teachers.length * 2)
	const classrooms = await promiseSerial(generateClassrooms(cCount).map((c) => () => createClassroom(c)))
	debug(`🏫  Made ${classrooms.length} classrooms`)

	debug('🏫  Assigning students and teachers to classrooms..')
	await promiseSerial(
		generateClassroomConnections(users, classrooms).map((connection) => () => createClassroomConnection(connection)),
	)
	debug(`🏫  Assigned students and teachers to classrooms`)

	// debug('📍  Creating some pins for students..')
	// debug(`📍  Created ${pins.length} pins for ${students.length} students`)

	debug('🌻 🌻 🌻 Successfully seeded test database 🌻 🌻 🌻 ')
}

seedDatabase()
