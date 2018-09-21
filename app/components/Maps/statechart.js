// @flow

// STATES

// Child States
const DROP = 'drop'
const DETAILS = 'details'

export const states = {
	NORMAL: 'normal',
	INSPECT_PIN: 'inspectPin',
	CREATE_PIN: 'createNewPin',
	CREATE_PIN__DROP: `createNewPin.${DROP}`,
	CREATE_PIN__DETAILS: `createNewPin.${DETAILS}`,
	EDIT_PIN: 'editPin',
}

// ACTIONS

export const transitions = {
	NEXT: 'next',
	CANCEL: 'cancel',
	ENTER_DROP_PIN: 'startedAddPin',
	SUCCESS: 'success',
	CLICKED_PIN: 'clickedPin',
	CLICKED_EDIT_PIN: 'clickedEditPin',
}

export const statechart = {
	initial: 'init',
	states: {
		init: {
			on: {
				[transitions.NEXT]: states.NORMAL,
			},
		},
		[states.NORMAL]: {
			on: {
				[transitions.ENTER_DROP_PIN]: states.CREATE_PIN,
				[transitions.CLICKED_PIN]: states.INSPECT_PIN,
			},
			onEntry: ['allowPinHover'],
		},
		// The user has opened a pin info window
		[states.INSPECT_PIN]: {
			on: {
				[transitions.CANCEL]: states.NORMAL,
				[transitions.CLICKED_EDIT_PIN]: states.EDIT_PIN,
			},
		},

		[states.CREATE_PIN]: {
			on: {
				[transitions.CANCEL]: states.NORMAL,
				[transitions.SUCCESS]: states.NORMAL,
			},
			initial: DROP,
			states: {
				[DROP]: {
					on: {
						[transitions.NEXT]: DETAILS,
					},
				},
				[DETAILS]: {},
			},
		},

		// The user is entering / editing info for an existing pin
		[states.EDIT_PIN]: {
			on: {
				[transitions.SUCCESS]: states.NORMAL,
				[transitions.CANCEL]: states.NORMAL,
			},
		},
	},
}
