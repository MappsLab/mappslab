// @flow

// STATES
export const NORMAL = 'normal'
export const ADD_PIN = 'addPin'
export const ADD_PIN_INFO = 'addPinInfo'

export const states = [NORMAL, ADD_PIN, ADD_PIN_INFO]

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
			onEntry: 'enterNormal',
		},
		[ADD_PIN]: {
			on: {
				[NEXT]: ADD_PIN_INFO,
				[CANCEL]: NORMAL,
			},
			onEntry: 'enterAddPin',
		},
		[ADD_PIN_INFO]: {
			on: {
				[SUCCESS]: NORMAL,
				[CANCEL]: NORMAL,
			},
			onEntry: 'enterAddPinInfo',
		},
	},
}
