// @flow

// STATES

// Child States
export const createPinStates = {
	DROP_PIN: 'dropPin',
	DROP_CONNECTED_PIN: 'dropConnectedPin',
	DETAILS: 'details',
}

export const states = {
	NORMAL: 'normal',
	INSPECT_PIN: 'inspectPin',
	CREATE_PIN: 'createNewPin',
	CREATE_PIN__DROP: `createNewPin.${createPinStates.DROP_PIN}`,
	CREATE_PIN__DROP_CONNECTED_PIN: `createNewPin.${createPinStates.DROP_CONNECTED_PIN}`,
	CREATE_PIN__DETAILS: `createNewPin.${createPinStates.DETAILS}`,
	EDIT_PIN: 'editPin',
}

// ACTIONS

export const transitions = {
	NEXT: 'next',
	CANCEL: 'cancel',
	ENTER_DROP_PIN: 'startedAddPin',
	CONNECT_PIN: 'conectPin',
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
			initial: createPinStates.DROP_PIN,
			states: {
				[createPinStates.DROP_PIN]: {
					on: {
						[transitions.CONNECT_PIN]: createPinStates.DROP_PIN,
						[transitions.NEXT]: createPinStates.DETAILS,
					},
				},
				[createPinStates.DROP_CONNECTED_PIN]: {
					on: {
						[transitions.CANCEL]: states.NORMAL,
					},
				},
				[createPinStates.DETAILS]: {},
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
