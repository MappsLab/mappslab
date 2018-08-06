// @flow

// STATES
export const NORMAL = 'normal'
export const INSPECT_PIN = 'inspectPin'
export const ADD_PIN = 'addPin'
export const PUT_PIN = 'putPin'
export const ADD_PIN_INFO = 'addPinInfo'

export const states = [NORMAL, INSPECT_PIN, PUT_PIN, ADD_PIN_INFO]

// ACTIONS
export const NEXT = 'next'
export const CANCEL = 'cancel'
export const DROPPED_PIN = 'startedAddPin'
export const SUCCESS = 'success'
export const CLICKED_PIN = 'clickedPin'
export const CLICKED_EDIT_PIN = 'clickedEditPin'

export const statechart = {
	initial: NORMAL,
	states: {
		[NORMAL]: {
			on: {
				[DROPPED_PIN]: ADD_PIN,
				[CLICKED_PIN]: INSPECT_PIN,
			},
			onEntry: 'enterNormal',
		},
		// The user has opened a pin info window
		[INSPECT_PIN]: {
			on: {
				[CANCEL]: NORMAL,
				[CLICKED_EDIT_PIN]: PUT_PIN,
			},
			onEntry: 'enterInspectPin',
		},
		// The user can drop a pin on the
		[ADD_PIN]: {
			on: {
				[SUCCESS]: PUT_PIN,
				[CANCEL]: NORMAL,
			},
		},
		// The user is entering / editing info for a new or existing pin
		[PUT_PIN]: {
			on: {
				[SUCCESS]: NORMAL,
				[CANCEL]: NORMAL,
			},
		},
	},
}
