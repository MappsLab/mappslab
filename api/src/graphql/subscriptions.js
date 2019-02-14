// @flow
import { PubSub } from 'apollo-server'

const pubsub = new PubSub()
pubsub.ee.setMaxListeners(30) // raise max listeners in event emitter

export default pubsub
