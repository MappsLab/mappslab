// @flow

// STATES
export const NORMAL = 'normal'
export const INSPECT_PIN = 'inspectPin'
export const ADD_PIN = 'addPin'
export const EDIT_PIN = 'editPin'
export const ADD_PIN_INFO = 'addPinInfo'

export const states = [NORMAL, INSPECT_PIN, ADD_PIN, EDIT_PIN, ADD_PIN_INFO]

// ACTIONS
export const NEXT = 'next'
export const CANCEL = 'cancel'
export const DROPPED_PIN = 'startedAddPin'
export const SUCCESS = 'success'
export const CLICKED_PIN = 'clickedPin'
export const CLICKED_EDIT_PIN = 'clickedEditPin'

export const statechart = {
	initial: 'init',
	states: {
		init: {
			on: {
				[NEXT]: NORMAL,
			},
		},
		[NORMAL]: {
			on: {
				[DROPPED_PIN]: ADD_PIN,
				[CLICKED_PIN]: INSPECT_PIN,
			},
			onEntry: ['allowPinHover'],
		},
		// The user has opened a pin info window
		[INSPECT_PIN]: {
			on: {
				[CANCEL]: NORMAL,
				[CLICKED_EDIT_PIN]: EDIT_PIN,
			},
			onEntry: 'enterInspectPin',
		},
		// The user can drop a pin on the
		[ADD_PIN]: {
			on: {
				[NEXT]: EDIT_PIN,
				[CANCEL]: NORMAL,
			},
			onEntry: 'addPin',
		},
		// The user is entering / editing info for a new or existing pin
		[EDIT_PIN]: {
			on: {
				[SUCCESS]: NORMAL,
				[CANCEL]: NORMAL,
			},
			onEntry: 'editPin',
		},
	},
}
