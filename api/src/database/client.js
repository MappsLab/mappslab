// @flow

const dgraph = require('dgraph-js')
const grpc = require('grpc')
const config = require('../config')

const { address } = config.database

const clientStub = new dgraph.DgraphClientStub(
	// addr: optional, default: "localhost:9080"
	address,
	// credentials: optional, default: grpc.credentials.createInsecure()
	grpc.credentials.createInsecure(),
)

const dbClient = new dgraph.DgraphClient(clientStub)
export default dbClient
