// @flow
import type { ClassroomType } from '../ClassroomTypes'
import { clean, defaultValues, validateNew } from './classroomDBSchema'
import { ValidationError } from '../../../errorTypes'
import db from '../../../database'

const dgraph = require('dgraph-js')
const debug = require('debug')('api:user')

export const createClassroom = async (classroomData: ClassroomType): Promise<ClassroomType | void> => {
	const cleaned = await clean({ ...defaultValues, ...classroomData, createdAt: new Date() })
	const validatedClassroomData = await validateNew(cleaned).catch((err) => {
		debug(err.details)
		debug(err._object)
		throw new ValidationError(err)
	})
	const txn = db.newTxn()
	try {
		const mu = new dgraph.Mutation()
		mu.setSetJson(validatedClassroomData)
		const newClassroom = await txn.mutate(mu)
		if (process.env.NO_COMMIT !== 'true') await txn.commit()
		const uid = newClassroom.getUidsMap().get('blank-0')
		debug(`Created new user ${validatedClassroomData.username} with uid ${uid}`)
		if (process.env.NO_COMMIT === 'true') debug('   [transaction was not comitted]')
		return {
			uid,
			...validatedClassroomData,
		}
	} catch (e) {
		debug('fucked')
		debug(e)
		throw new Error('Sorry, something went wrong when creating a new user')
	} finally {
		await txn.discard()
	}
}

export const createClassroomConnection = async (connection: {
	fromUid: string,
	pred: 'teaches_in' | 'learns_in',
	toUid: string,
}): Promise<boolean | Error> => {
	const { fromUid, pred, toUid } = connection
	const txn = db.newTxn()
	try {
		const mu = new dgraph.Mutation()
		mu.setSetNquads(`<${fromUid}> <${pred}> <${toUid}> .`)
		await txn.mutate(mu)
		await txn.commit()
		return true
	} catch (e) {
		debug(e)
		throw e
	} finally {
		await txn.discard()
	}
}
