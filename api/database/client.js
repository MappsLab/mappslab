// @flow

const dgraph = require('dgraph-js')
const grpc = require('grpc')
const dotenv = require('dotenv')

dotenv.config()

const address = process.env.NODE_ENV === 'development' ? 'localhost:9088' : '//mappslab-db.now.sh'

const clientStub = new dgraph.DgraphClientStub(
	// addr: optional, default: "localhost:9080"
	address,
	// credentials: optional, default: grpc.credentials.createInsecure()
	grpc.credentials.createInsecure(),
)

const dbClient = new dgraph.DgraphClient(clientStub)
// if (process.env.NODE_ENV === 'development') db.setDebugMode(true)

export default dbClient
