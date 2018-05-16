// @flow

import { GraphQLServer } from 'graphql-yoga'
import { typeDefs, resolvers } from './schema'
import { PORT } from './config'

const debug = require('debug')('api')

const server = new GraphQLServer({ typeDefs, resolvers })

const port = PORT || 3000

server.start({ port: 3000 }, () => {
	debug(`Server running on port ${port}`)
})
