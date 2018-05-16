// @flow
import type { UserType } from '../UserTypes'
import { clean, defaultValues, validateNew } from './userDBSchema'
import { ValidationError } from '../../../errorTypes'
import db from '../../../database'

const dgraph = require('dgraph-js')
const debug = require('debug')('api:user')

export const createUser = async (userData: UserType): Promise<UserType | void> => {
	const cleaned = await clean({ ...defaultValues, ...userData, createdAt: new Date() })
	const validatedUserData = await validateNew(cleaned).catch((err) => {
		debug(err.details)
		debug(err._object)
		throw new ValidationError(err)
	})
	const txn = db.newTxn()
	try {
		const mu = new dgraph.Mutation()
		mu.setSetJson(validatedUserData)
		const newUser = await txn.mutate(mu)
		if (process.env.NO_COMMIT !== 'true') await txn.commit()
		const uid = newUser.getUidsMap().get('blank-0')
		debug(`Created new user ${validatedUserData.username} with uid ${uid}`)
		if (process.env.NO_COMMIT === 'true') debug('   [transaction was not comitted]')
		return {
			uid,
			...validatedUserData,
		}
	} catch (e) {
		debug('fucked')
		debug(e)
		throw new Error('Sorry, something went wrong when creating a new user')
	} finally {
		await txn.discard()
	}
}
