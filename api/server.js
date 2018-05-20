// @flow

import { GraphQLServer } from 'graphql-yoga'
import { typeDefs, resolvers } from './schema'
import { PORT } from './config'
import createErrorFormatter from './utils/graphql-error-formatter'

const debug = require('debug')('api')

const server = new GraphQLServer({ typeDefs, resolvers })

const port = PORT || 3000

const options = {
	formatError: createErrorFormatter,
}

server.start({ port: 3000, ...options }, () => {
	debug(`Server running on port ${port}`)
})
