import { StateSchema } from 'xstate'
import { ModeStateSchema } from '../../providers/CurrentMap/mapStateMachine'
import {
	NamedEventListeners,
	MapEventListeners,
	MarkerEventListeners,
	PolylineEventListeners,
} from '../../types-ts'
import { definitely } from '../../utils'
import { mappedEventNames } from './eventNames'

export const addListeners = <T>(
	entity: google.maps.MVCObject,
	handlers: NamedEventListeners<T>,
): Array<google.maps.MapsEventListener> =>
	definitely(
		Object.keys(handlers).map((eventName) => {
			const googleEvent = mappedEventNames[eventName]
			const handler = handlers[eventName]
			if (googleEvent && typeof handler === 'function') {
				const listener = entity.addListener(googleEvent, handler)
				return listener
			}
			return null
		}),
	)

export const removeListeners = (
	handlers: google.maps.MapsEventListener[],
): void => handlers.forEach((listener) => listener.remove())

export type StateEventHandlers<
	S extends StateSchema,
	E extends NamedEventListeners<any>
> = {
	[K in keyof S]: string
}

interface HandlersForState<
	S extends StateSchema,
	Listeners extends NamedEventListeners<any>
> {
	states: {
		[K in keyof StateSchema['states']]:
			| Listeners
			| HandlersForState<S, Listeners>
	}
}

export interface MapStateHandlers {
	schema: ModeStateSchema
	handlers: HandlersForState<ModeStateSchema, MapEventListeners>
}

interface MarkerStateHandlers {}

interface PolylineEventHandlers {}

type ValidHandlers = MapStateHandlers

export const getHandlersForState = ({
	schema,
	handlers,
}: ValidHandlers): google.maps.MapsEventListener[] => {
	alert('TODO Get handlers')
	return []
}
