// @flow
import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { ApolloServer } from 'apollo-server-express'
import createErrorFormatter from 'Utils/graphql-error-formatter'
import { typeDefs, resolvers } from './schema'
import config from './config'
import getCurrentViewer from './middleware/getCurrentViewer'
import context from './serverContext'

const debug = require('debug')('api')
const port = config.get('server.port')
const path = '/graphql'

const isProduction = process.env.NODE_ENV === 'production'

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context,
	formatError: createErrorFormatter,
	playground: !isProduction,
	introspection: !isProduction,
})
const app = express()
app.use(cors())
app.use(path, getCurrentViewer)

server.applyMiddleware({ app, path })

const httpServer = createServer(app)

server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port: 3000 }, () => {
	debug(`Server running on port ${port}`)
})
