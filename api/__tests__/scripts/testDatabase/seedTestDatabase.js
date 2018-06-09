// @flow
import faker from 'faker'
import { dbClient } from '../../../database'
import { generateUsers, generateClassrooms, generateClassroomConnections, generatePins } from './generate'
import { createUser } from '../../../types/User/UserModel'
import { createClassroom, createClassroomConnection } from '../../../types/Classroom/ClassroomModel'
import { createPin, createPinConnection } from '../../../types/Pin/PinModel'

const dgraph = require('dgraph-js')
const debug = require('debug')('api:testDatabase')

faker.seed(667)

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
		slug: string @index(hash) .
		email: string @index(hash) .
		teaches_in: uid @reverse @count .
		learns_in: uid @reverse @count .
	`
	const op = new dgraph.Operation()
	op.setSchema(schema)
	await dbClient.alter(op)
}

const seedDatabase = async () => {
	debug('🌻 🌻 🌻 Seeding Test Database... 🌻 🌻 🌻 ')
	await dropAll()
	await setSchema()

	debug('👶  Creating and inserting users...')
	const users = await promiseSerial(generateUsers(100).map((u) => () => createUser(u)))
	const students = users.filter((u) => u.role === 'student')
	const teachers = users.filter((u) => u.role === 'teacher')
	debug(`👶  Created ${students.length} students and ${teachers.length} teachers`)

	debug('🏫  Adding some classrooms..')
	const cCount = Math.floor(teachers.length * 2)
	const classrooms = await promiseSerial(generateClassrooms(cCount).map((c) => () => createClassroom(c)))
	debug(`🏫  Made ${classrooms.length} classrooms`)

	debug('🏫  Assigning students and teachers to classrooms..')
	await promiseSerial(
		generateClassroomConnections(users, classrooms).map((connection) => () => createClassroomConnection(connection)),
	)
	debug(`🏫  Assigned students and teachers to classrooms`)

	debug('📍  Creating some pins for students..')

	const pins = await students.reduce(async (accP, student) => {
		const pinCount = faker.random.number({ min: 5, max: 20 })
		const newPins = await promiseSerial(generatePins(pinCount).map((pinData) => () => createPin(pinData)))
		await promiseSerial(newPins.map((p) => () => createPinConnection({ fromUid: student.uid, pred: 'pinned', toUid: p.uid })))
		const acc = await accP
		return [...acc, ...newPins]
	}, [])

	debug(`📍  Created ${pins.length} pins for ${students.length} students`)

	debug('🌻 🌻 🌻 Successfully seeded test database 🌻 🌻 🌻 ')
}

seedDatabase()
