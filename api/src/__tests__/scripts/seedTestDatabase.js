// @flow
import faker from 'faker'
import * as R from 'ramda'
import { setSchema } from 'Database/setSchema'
import dbClient from 'Database/client'
import { getUser, createTeacher, createStudent } from '../utils/user'
import { createClassroom, assignUser } from '../utils/classroom'
import { createGeneratedMap } from '../utils/map'
import { createGeneratedPin } from '../utils/pin'
import { createRoute } from '../utils/route'
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

const promiseSerial = (funcs) =>
	funcs.reduce((promise, func) => promise.then((result) => func().then(Array.prototype.concat.bind(result))), Promise.resolve([]))

const seedDatabase = async () => {
	debug('🌻 🌻 🌻 Seeding Test Database... 🌻 🌻 🌻 ')
	await dropAll()
	await setSchema()
	debug('🤓  Creating admin user')
	const [admin, admin2] = await createAdminUsers()
	debug('👶  Creating and inserting users...')

	const teachers = await promiseSerial(R.times(() => async () => createTeacher({}, { viewer: admin }), 3))
	const students = await promiseSerial(R.times(() => async () => createStudent({}, { viewer: admin }), 36))

	debug('🏫  Adding some classrooms..')
	const teacherClassrooms = await Promise.all(
		teachers.map(async (teacher) =>
			promiseSerial(
				R.times(
					() => async () => {
						const classroom = await createClassroom({}, { viewer: teacher })
						return {
							...classroom,
							teacher,
						}
					},
					3,
				),
			),
		),
	)

	const classrooms = teacherClassrooms.reduce((acc, rooms) => [...acc, ...rooms], [])
	debug(`🏫  Made ${classrooms.length} classrooms for ${teachers.length} teachers`)

	debug('🏫  Assigning students to classrooms..')
	await promiseSerial(
		students.map((student, index) => async () => {
			const classroomIndex = index % classrooms.length
			const classroom = classrooms[classroomIndex]
			return assignUser({ input: { addToClassrooms: [classroom.uid], uid: student.uid } }, { viewer: classroom.teacher })
		}),
	)
	debug(`🏫  Assigned ${students.length} students to ${classrooms.length} classrooms.`)

	debug('🗺  Adding maps to classrooms')
	const maps = await Promise.all(
		classrooms.map(async (classroom) =>
			promiseSerial(
				R.times(() => async () => createGeneratedMap({ classroomUid: classroom.uid }, { viewer: classroom.teacher }), 1),
			),
		),
	)
	debug(`🗺  Added ${maps.length} maps to ${classrooms.length} classrooms`)

	debug('📍  Creating some classroom map pins for students..')
	const userPins = await promiseSerial(
		students.map((student) => async () => {
			const currentUser = await getUser(student.uid)
			const userClassroomMapIds = R.pipe(
				R.path(['classrooms', 'edges']),
				R.pluck('node'),
				R.map(R.path(['maps', 'edges'])),
				R.flatten,
				R.pluck('node'),
				R.pluck('uid'),
			)(currentUser)
			// return userClassrooms

			// const newPins = await Promise.all(userClassroomMaps.map(m => R.times(() => async () => createPin({ addToMaps: []}, { viewer: fullUserData}))))
			const PIN_COUNT = 6
			const newPinsByClassroom = await Promise.all(
				userClassroomMapIds.map((id) =>
					promiseSerial(R.times(() => async () => createGeneratedPin({ addToMaps: [id] }, { viewer: currentUser }), PIN_COUNT)),
				),
			)

			const newRoutes = await Promise.all(
				newPinsByClassroom.map(async (pins) => {
					const addPins = pins.slice(0, Math.round(PIN_COUNT / 2)).map((p) => p.uid)
					const route = await createRoute({ pins: addPins }, { viewer: currentUser })
					return route
					// createRoute({})
				}),
			)

			// (newRoutes)

			return newPinsByClassroom

			// const userMaps = fullUserData.classrooms.reduce
		}),
	)

	const pins = R.flatten(userPins)
	debug(`📍  Created ${pins.length} pins for ${students.length} students`)

	debug('🌻 🌻 🌻 Successfully seeded test database 🌻 🌻 🌻 ')
}

seedDatabase()
