// @flow

const dgraph = require('dgraph-js')
const grpc = require('grpc')
const dotenv = require('dotenv')

dotenv.config()

const address =
	process.env.ENV === 'production'
		? // Local Development
		  'TBD'
		: process.env.ENV === 'staging'
			? // Staging Database
			  '167.99.175.140:9080'
			: // Local
			  'localhost:9099'

const clientStub = new dgraph.DgraphClientStub(
	// addr: optional, default: "localhost:9080"
	address,
	// credentials: optional, default: grpc.credentials.createInsecure()
	grpc.credentials.createInsecure(),
)

const dbClient = new dgraph.DgraphClient(clientStub)
export default dbClient
