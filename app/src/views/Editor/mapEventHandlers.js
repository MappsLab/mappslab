// @flow
import { createObjectSearchByState } from './utils'
import type { EditorProps } from './MapEditor'

const debug = require('debug')('app')

const mapEvents = {
	Welcome: {
		handlers: {
			keyup: (e, props: EditorProps) => {
				switch (e.key) {
					case 'Enter':
						props.transition('enterLesson')
						break
					default:
						break
				}
			},
		},
	},
	Lesson: {
		handlers: {
			keyup: (e, props: EditorProps) => {
				if (e.key === ' ') {
					props.transition('clickedDropPin')
				}
			},
		},
		Browse: {
			handlers: {},
		},
		DropPin: {
			DropMode: {
				handlers: {
					keyup: (e, props: EditorProps) => {
						if (e.key === 'Escape' || e.key === ' ') {
							// Exit Drop Pin mode
							props.transition('enterLesson')
						}
					},
					onEntry: (e, props: EditorProps) => {
						const { sendNotification } = props

						sendNotification({ message: 'Click to drop a new pin' })
					},
					onClick: async (e, props) => {
						const { createPin, mapUid, lessonUid, transition, connectToPin } = props

						const result = await createPin({
							variables: {
								input: {
									lat: e.latLng.lat(),
									lng: e.latLng.lng(),
									draft: true,
									addToMaps: [mapUid],
									lessonUids: [lessonUid],
									addToRoute: connectToPin
										? {
												routeUid: connectToPin.routes ? connectToPin.routes[0].uid : null,
												connectToPin: connectToPin.uid,
										  }
										: undefined,
								},
							},
						})

						const newPin = result.data.createPin
						transition('droppedPin', { inspectedItem: newPin })
					},
				},
				Connect: {
					handlers: {
						onMouseMove: (e, props: EditorProps) => {
							props.updateMapState({
								userLatLng: {
									lat: e.latLng.lat(),
									lng: e.latLng.lng(),
								},
							})
						},
					},
				},
			},
		},
		Inspect: {
			handlers: {
				keyup: (e, props: EditorProps) => {
					if (e.key === 'Escape') {
						props.transition('close', { inspectedItem: null })
					}
				},
				onEntry: (e, props) => {
					const { panTo, inspectedItem } = props
					debug('panning to', inspectedItem)
					const yOffset = window.innerHeight / 2 - 150
					panTo(inspectedItem, { x: 0, y: -yOffset })
				},
				onClick: (e, props) => {
					const { transition } = props
					transition('close', { inspectedItem: null })
				},
			},
		},
	},
}

export const getHandlersForState = createObjectSearchByState({
	chart: mapEvents,
	searchKey: 'handlers',
})
// export const mapEvents
