// @flow
import { createObjectSearchByState } from './utils'

const debug = require('debug')('app')

const mapEvents = {
	Lesson: {
		handlers: {
			onClick: () => {
				// console.log('lesson onClick')
			},
		},
		DropPin: {
			DropMode: {
				handlers: {
					onClick: async (e, props) => {
						const { createPin, mapUid, lessonUid, transition } = props
						const result = await createPin({
							variables: {
								lat: e.latLng.lat(),
								lng: e.latLng.lng(),
								draft: true,
								addToMaps: [mapUid],
								addToLesson: [lessonUid],
							},
						})
						const newPin = result.data.createPin
						transition('droppedPin', { inspectedItem: newPin })
					},
				},
			},
		},
		Inspect: {
			handlers: {
				onEntry: (e, props) => {
					const { panTo, inspectedItem } = props
					debug('panning to', inspectedItem)
					const yOffset = window.innerHeight / 2 - 150
					panTo(inspectedItem, { x: 0, y: -yOffset })
				},
				onClick: (e, props) => {
					const { transition } = props
					transition('close')
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
