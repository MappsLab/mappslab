// @flow

import type { MVCObject } from '../types'

type Listener = Object

export const addListeners = (entity: MVCObject, events: Object, handlers: Object): Array<Listener> =>
	Object.entries(handlers)
		.map(([eventName, handler]) => {
			const googleEvent = events[eventName]
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
