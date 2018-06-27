// @flow
import dbClient from './client'

const dgraph = require('dgraph-js')
const debug = require('debug')('api')

const deleteNode = async (uid: string): Promise<boolean | Error> => {
	const txn = dbClient.newTxn()
	try {
		const mu = new dgraph.Mutation()
		mu.setDelNquads(`<${uid}> * * .`)
		await txn.mutate(mu)
		await txn.commit()
		debug(`Deleted all nodes with uid ${uid}`)
		return true
	} catch (e) {
		debug(e)
		throw e
	} finally {
		await txn.discard()
	}
}

export default deleteNode
