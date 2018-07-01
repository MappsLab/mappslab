// @flow

import type { MapEntity } from '../types'

type Listener = Object

export const addListeners = (entity: MapEntity, events: Object, props: Object): Array<Listener> =>
	Object.entries(props)
		.map(([eventName, handler]) => {
			const googleEvent = events[eventName]
			if (googleEvent && typeof handler === 'function') {
				const listener = entity.addListener(googleEvent, handler)
				return listener
			}
			return null
		})
		.filter(Boolean)

export const removeListeners = (listeners: Array<Listener>): Array<Listener> =>
	listeners
		.map((listener) => {
			window.google.maps.event.removeListener(listener)
			return null
		})
		.filter(Boolean)
