// @flow

import type { MVCObject } from '../types/coreTypes'
import type { MapsEventListener } from '../types/mapTypes'

type Handlers = {
	[key: string]: (...args: any[]) => void,
}

export const addListeners = (entity: MVCObject, events: Object, handlers: Handlers): Array<MapsEventListener> =>
	Object.keys(handlers)
		.map((eventName) => {
			const googleEvent = events[eventName]
			const handler = handlers[eventName]
			if (googleEvent && typeof handler === 'function') {
				const listener = entity.addListener(googleEvent, handler)
				return listener
			}
			return null
		})
		.filter(Boolean)

export const removeListeners = (handlers: Array<Object>): Array<void> =>
	handlers
		.map((listener) => {
			window.google.maps.event.removeListener(listener)
			return null
		})
		.filter(Boolean)
