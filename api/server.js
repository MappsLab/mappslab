// @flow
import { GraphQLServer } from 'graphql-yoga'
import { typeDefs, resolvers } from './schema'
import { PORT } from './config'
import createErrorFormatter from 'Utils/graphql-error-formatter'
import getCurrentViewer from './middleware/getCurrentViewer'
import context from './serverContext'

const debug = require('debug')('api')

const server = new GraphQLServer({ typeDefs, resolvers, context })

const port = PORT || 3000

const options = {
	formatError: createErrorFormatter,
}

server.express.use(getCurrentViewer)
server.start({ port: 3000, ...options }, () => {
	debug(`Server running on port ${port}`)
})
