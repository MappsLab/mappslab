// @flow

const dgraph = require('dgraph-js')
const grpc = require('grpc')
const dotenv = require('dotenv')

dotenv.config()

const clientStub = new dgraph.DgraphClientStub(
	// addr: optional, default: "localhost:9080"
	'localhost:9088',
	// credentials: optional, default: grpc.credentials.createInsecure()
	grpc.credentials.createInsecure(),
)

const dbClient = new dgraph.DgraphClient(clientStub)
// if (process.env.NODE_ENV === 'development') db.setDebugMode(true)

export default dbClient
