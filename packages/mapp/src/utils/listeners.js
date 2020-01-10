// @flow

import type { MVCObject } from '../types/coreTypes'
import type { MapsEventListener, NamedEventListeners } from '../types/mapTypes'

export const addListeners = (
	entity: MVCObject,
	events: Object,
	handlers: NamedEventListeners,
): Array<MapsEventListener> =>
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
