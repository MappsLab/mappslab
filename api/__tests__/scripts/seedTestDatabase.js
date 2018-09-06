// @flow
import faker from 'faker'
import * as R from 'ramda'
import { setSchema } from 'Database/setSchema'
import dbClient from 'Database/client'
import { createTeacher, createStudent } from '../utils/user'
import { createClassroom, assignUser } from '../utils/classroom'
import { createAdminUser } from '../utils/db'

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
	const admin = await createAdminUser()
	debug('👶  Creating and inserting users...')
	const teachers = await promiseSerial(R.times(() => async () => createTeacher({}, { viewer: admin }), 6))
	const students = await promiseSerial(R.times(() => async () => createStudent({}, { viewer: admin }), 50))

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
					2,
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
			return assignUser({ input: { classroomUid: classroom.uid, userUid: student.uid } }, { viewer: classroom.teacher })
		}),
	)
	debug(`🏫  Assigned ${students.length} students to ${classrooms.length} classrooms.`)

	debug('🗺  Adding maps to classrooms')
}

seedDatabase()
