// @flow
import { query as mapQuery } from 'Queries/Map/MapQuery'
import type { EditorProps } from './MapEditor'

const debug = require('debug')('app')

type MapEvent<EventType> = {
	payload: EventType,
	props: EditorProps,
	actions: {
		[key: string]: (any) => void,
	},
}

export const mapEvents = {
	Welcome: {
		keyup: ({ payload, props }: MapEvent<KeyboardEvent>) => {
			const transition = payload.key === 'Enter' ? () => props.transition('enterLesson') : null
			return {
				actions: {
					transition,
				},
			}
		},
	},
	Lesson: {
		keyup: ({ payload, props }: MapEvent<KeyboardEvent>) => {
			const transition = payload.key === ' ' ? () => props.transition('clickedDropPin') : null
			return transition
				? {
						actions: {
							transition,
						},
				  }
				: null
		},
		Browse: {
			handlers: {},
		},
		DropPin: {
			DropMode: {
				keyup: ({ payload, props }: MapEvent<KeyboardEvent>) => {
					const transition = payload.key === 'Escape' || payload.key === ' ' ? () => props.transition('enterLesson') : null
					return transition
						? {
								actions: {
									transition,
								},
						  }
						: null
				},
				onEntry: ({ props }: MapEvent<null>) => {
					const { sendNotification } = props

					return {
						actions: {
							sendNotification: () => sendNotification({ message: 'Click to drop a new pin' }),
						},
					}
				},
				onClick: ({ payload, props }: MapEvent<MouseEvent>) => {
					const { createPin, mapUid, lessonUid, transition, connectToPin } = props
					const createNewPin = async () => {
						const addToRoute = connectToPin
							? {
									connectToPin: connectToPin.pin.uid,
									position: connectToPin.position,
							  }
							: undefined

						const variables = {
							input: {
								lat: payload.latLng.lat(),
								lng: payload.latLng.lng(),
								addToMaps: [mapUid],
								lessonUids: [lessonUid],
								addToRoute,
							},
						}
						const result = await createPin({
							variables,
							refetchQueries: [{ query: mapQuery, variables: { uid: props.mapData.uid } }],
						})
						const newPin = result.data.createPin
						transition('droppedPin', { inspectedItem: newPin, connectToPin: null })
					}

					const actions = {
						createNewPin,
					}
					return { actions }
				},
				Connect: {
					onMouseMove: ({ payload, props }: MapEvent<KeyboardEvent>) => {
						const updateMapState = () => {
							props.updateMapState({
								userLatLng: {
									lat: payload.latLng.lat(),
									lng: payload.latLng.lng(),
								},
							})
						}
						return {
							actions: { updateMapState },
						}
					},
				},
			},
		},
		Inspect: {
			keyup: ({ payload, props }: MapEvent<KeyboardEvent>) => {
				const transition = payload.key === 'Escape' ? () => props.transition('close', { inspectedItem: null }) : null
				return {
					actions: {
						transition,
					},
				}
			},
			onEntry: ({ props }: MapEvent<null>) => {
				const { panTo, inspectedItem } = props
				const pan = () => {
					debug('panning to', inspectedItem)
					const yOffset = window.innerHeight / 2 - 150
					panTo(inspectedItem, { x: 0, y: -yOffset })
				}
				return {
					actions: { pan },
				}
			},
			onClick: ({ props }: MapEvent<MouseEvent>) => {
				const transition = () => props.transition('close', { inspectedItem: null })
				return {
					actions: { transition },
				}
			},
		},
	},
}

// export const mapEvents
