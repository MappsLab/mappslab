import { mapQuery } from '../../queries'
import {
	useCurrentMap,
	modeSchema,
	ModeStateSchema,
} from '../../providers/CurrentMap'
import { getHandlersForState, MapStateHandlers } from '../../utils'
import { MapEventListeners } from '../../types-ts'

const debug = require('debug')('app')

export const useMapEvents = () => {
	const {
		addEventListeners,
		setViewerLatLng,
		mapMode,
		transitionMode,
	} = useCurrentMap()

	const options: MapStateHandlers = {
		schema: modeSchema,
		handlers: mapEventHandlers,
	}
	const handlersForState = getHandlersForState(options)
}

interface MapEvent<EventType> {
	event: EventType
	actions: {
		[key: string]: (arg?: any) => void
	}
}

const mapEventHandlers: MapStateHandlers['handlers'] = {
	states: {
		Welcome: {
			keyup: ({ event, actions }: MapEvent<KeyboardEvent>) => {
				console.log('Welcome Keyup')
				// if (event.key === 'Enter') {
				// 	actions.transition({ type: 'enterLesson' })
				// }
			},
		},
		Lesson: {
			onClick: ({ actions }: MapEvent<MouseEvent>) => {
				console.log('Lesson onclick')
				// actions.closeInspector()
			},
			Browse: {
				handlers: {},
			},
			DropPin: {
				DropMode: {
					keyup: ({ event, actions }: MapEvent<KeyboardEvent>) => {
						console.log('DropMode keyup')
						// if (event.key === 'Escape' || event.key === ' ') {
						// 	actions.transition({ type: 'enterLesson' })
						// }
					},
					onClick: ({ event, actions }: MapEvent<MouseEvent>) => {
						console.log('DropMode onClick')
						// const {
						// 	createPin,
						// 	mapUid,
						// 	lessonUid,
						// 	transition,
						// 	connectToPin,
						// 	inspectItem,
						// } = props
						// const createNewPin = async () => {
						// 	const addToRoute = connectToPin
						// 		? {
						// 				connectToPin: connectToPin.pin.uid,
						// 				position: connectToPin.position,
						// 		  }
						// 		: undefined
						// 	const variables = {
						// 		input: {
						// 			lat: event.latLng.lat(),
						// 			lng: event.latLng.lng(),
						// 			addToMaps: [mapUid],
						// 			lessonUids: [lessonUid],
						// 			addToRoute,
						// 		},
						// 	}
						// 	const result = await createPin({
						// 		variables,
						// 		refetchQueries: [
						// 			{ query: mapQuery, variables: { uid: props.mapData.uid } },
						// 		],
						// 	})
						// 	const newPin = result.data.createPin
						//
						// 	const position = {
						// 		lat: newPin.lat,
						// 		lng: newPin.lng,
						// 	}
						//
						// 	inspectItem(newPin, position)
						// 	transition('droppedPin', { connectToPin: null })
						// }
						//
						// // const actions = {
						// // 	createNewPin,
						// // }
						// // return { actions }
					},
					Connect: {
						onMouseMove: ({ event, actions }: MapEvent<KeyboardEvent>) => {
							console.log('Connect OnMouseMove')
							// const updateMapState = () => {
							// 	props.updateMapState({
							// 		userLatLng: {
							// 			lat: event.latLng.lat(),
							// 			lng: event.latLng.lng(),
							// 		},
							// 	})
							// }
							// return {
							// 	actions: { updateMapState },
							// }
						},
					},
				},
			},
			Inspect: {
				keyup: ({ event, actions }: MapEvent<KeyboardEvent>) => {
					console.log('Inspect Keyup')
					// const transition =
					// 	event.key === 'Escape'
					// 		? () => props.transition('close', { inspectedItem: null })
					// 		: null
					// return {
					// 	actions: {
					// 		transition,
					// 	},
					// }
				},
				onEntry: ({ actions }: MapEvent<null>) => {
					console.log('Inspect onEntry')
					/* todo DISABLED */
					// const { panTo, inspectedItem } = props
					// const pan = () => {
					// 	debug('panning to', inspectedItem)
					// 	const yOffset = window.innerHeight / 2 - 150
					// 	console.log('TO DO: move this to a generic InspectedItem component')
					// 	// panTo(inspectedItem, { x: 0, y: -yOffset })
					// }
					// return {
					// 	actions: { pan },
					// }
				},
				onClick: ({ actions }: MapEvent<MouseEvent>) => {
					console.log('Inspect onclick')
					// const { closeInspector } = props
					// closeInspector()
				},
			},
		},
	},
}
// export const mapEvents
