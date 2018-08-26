// @flow
import faker from 'faker'
import dbClient from 'Database/client'
import models from 'Models'
import { generateUsers, generateClassrooms, generateClassroomConnections, generatePins, generateMaps } from './generate'

const { User, Map, Classroom, Pin } = models

const dgraph = require('dgraph-js')
const debug = require('debug')('seed')

faker.seed(667)

const dropAll = async () => {
	const op = new dgraph.Operation()
	op.setDropAll(true)
	await dbClient.alter(op)
}
const promiseSerial = (funcs) =>
	funcs.reduce((promise, func) => promise.then((result) => func().then(Array.prototype.concat.bind(result))), Promise.resolve([]))

const setSchema = async () => {
	const schema: string = [
		/**
		 * Shared Indices
		 * type: 'user' | 'classroom' | ...
		 * slug: unique string identifier
		 */
		'type: string @index(hash) .',
		'slug: string @index(hash) . ',

		/**
		 * User Indices
		 */
		'email: string @index(hash) . ',
		'roles: [string] @index(term) .',
		/* <user> <teaches_in> <classroom> */
		'teaches_in: uid @reverse @count . ',
		/* <user> <learns_in> <classroom> */
		'learns_in: uid @reverse @count . ',
		/* <user> <pinned> <pin> */
		'pinned: uid @reverse @count . ',

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
		'has_pin: uid @reverse @count . ',
		'has_route: uid @reverse @count . ',
		'has_group: uid @reverse @count . ',

		/**
		 * Lesson Indices
		 */
		'has_goal: uid @reverse @count . ',
		'has_pin: uid @reverse @count . ',
		'has_route: uid @reverse @count . ',
		'has_group: uid @reverse @count . ',
	].join('\n')

	debug(schema)
	const op = new dgraph.Operation()
	op.setSchema(schema)
	await dbClient.alter(op)
}

const seedDatabase = async () => {
	debug('🌻 🌻 🌻 Seeding Test Database... 🌻 🌻 🌻 ')
	await dropAll()
	await setSchema()
	debug('👶  Creating and inserting users...')
	const users = await promiseSerial(generateUsers(100).map((u) => () => User.createUser(u)))
	const students = users.filter((u) => u.roles.includes('student'))
	const teachers = users.filter((u) => u.roles.includes('teacher'))
	debug(`👶  Created ${students.length} students and ${teachers.length} teachers`)

	debug('🏫  Adding some classrooms..')

	const classrooms = await Promise.all(
		teachers.map(async (teacher) => {
			return promiseSerial(generateClassrooms(2).map((classroom) => () => Classroom.createClassroom(classroom, teacher.uid)))
			// return [...acc, ...teacherClassrooms]
		}),
	).then((all) => all.reduce((acc, current) => [...acc, ...current], []))
	debug(`🏫  Made ${classrooms.length} classrooms for ${teachers.length} teachers`)

	debug('🏫  Assigning students to classrooms..')
	await promiseSerial(
		generateClassroomConnections(students, classrooms).map((connection) => () => Classroom.createClassroomConnection(connection)),
	)
	debug(`🏫  Assigned students and teachers to classrooms`)

	debug('🗺  Adding maps to classrooms')
	const maps = await Promise.all(
		classrooms.map(async (classroom) => {
			// const mapCount = faker.random.number({ min: 1, max: 3 })
			return promiseSerial(generateMaps(2).map((m) => () => Map.createMap(m, classroom.uid)))
		}),
	).then((all) => all.reduce((acc, current) => [...acc, ...current], []))

	debug(`🗺  Added ${maps.length} maps to ${classrooms.length} classrooms`)

	// debug('📍  Creating some free play pins for students..')

	// const pins = await students.reduce(async (accP, student) => {
	// 	const pinCount = faker.random.number({ min: 3, max: 8 })
	// 	const newPins = await promiseSerial(generatePins(pinCount).map((pinData) => () => Pin.createPin(pinData, student.uid))).catch(
	// 		(e) => debug(e),
	// 	)
	// 	const acc = await accP
	// 	return [...acc, ...newPins]
	// }, [])

	// debug(`📍  Created ${pins.length} pins for ${students.length} students`)

	debug('📍  Creating some classroom map pins for students..')

	const newPins = []
	await promiseSerial(
		students.map((student) => async () => {
			const userClassrooms = await Classroom.getUserClassrooms(student.uid)
			await promiseSerial(
				userClassrooms.map((classroom) => async () => {
					const classroomMaps = await Map.getClassroomMaps(classroom.uid)
					// For each map in a student's classroom, add some pins
					await promiseSerial(
						classroomMaps.map((m) => async () => {
							const pinCount = faker.random.number({ min: 1, max: 4 })
							const newClassroomMapPins = await promiseSerial(
								generatePins(pinCount).map((pinData) => async () => {
									const args = {
										...pinData,
										addToMaps: [m.uid],
									}
									return Pin.createPin(args, student.uid)
								}),
							)
							newPins.push(newClassroomMapPins)
						}),
					)
				}),
			)
		}),
	)

	debug(`📍  Created ${newPins.length} pins in classroom maps`)

	debug('🌻 🌻 🌻 Successfully seeded test database 🌻 🌻 🌻 ')
}

seedDatabase()
