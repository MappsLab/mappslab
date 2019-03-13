// @flow
import config from '../config'

/* dgraph-js and grpc don't support ESM, use require() instead */
const grpc = require('grpc')
const dgraph = require('dgraph-js')
const debug = require('debug')('db')

const address = config.get('db.address')

if (!address) throw new Error('No database address was supplied.')

debug(`DB Connecting to address: ${address}`)

const clientStub = new dgraph.DgraphClientStub(
	// addr: optional, default: "localhost:9080"
	address,
	// credentials: optional, default: grpc.credentials.createInsecure()
	grpc.credentials.createInsecure(),
)

const dbClient = new dgraph.DgraphClient(clientStub)
export default dbClient
