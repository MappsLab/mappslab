// @flow
import { PubSub } from 'graphql-subscriptions'

// Topics
export const MAP_RECEIVED_PIN = 'pinAddedToMap'
export const PIN_MODIFIED = 'pinModified'

const pubsub = new PubSub()
pubsub.ee.setMaxListeners(30) // raise max listeners in event emitter

export default pubsub
