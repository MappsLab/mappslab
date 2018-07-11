// @flow

// STATES
export const NORMAL = 'normal'
export const ADD_PIN = 'addPin'
export const ADD_PIN_INFO = 'addPinInfo'

// ACTIONS
export const NEXT = 'next'
export const CANCEL = 'cancel'
export const STARTED_ADD_PIN = 'startedAddPin'
export const SUCCESS = 'success'
// const DROPPED_PIN = 'droppedPin'

export const statechart = {
	initial: NORMAL,
	states: {
		[NORMAL]: {
			on: {
				[STARTED_ADD_PIN]: ADD_PIN,
			},
		},
		[ADD_PIN]: {
			on: {
				[STARTED_ADD_PIN]: NORMAL,
				[NEXT]: ADD_PIN_INFO,
				[CANCEL]: NORMAL,
			},
		},
		[ADD_PIN_INFO]: {
			on: {
				[SUCCESS]: NORMAL,
				[CANCEL]: NORMAL,
			},
		},
	},
}
