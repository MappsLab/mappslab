import Debug from 'debug'
import { Machine } from 'xstate'
import { useMachine } from '@xstate/react'
import { Pin, Route } from '../../types-ts'

const debug = Debug('app:map-mode')

interface NewPinConnection {
	pin: Pin
	position?: 'BEFORE' | 'AFTER'
}

type ModeContext = {
	inspectedItem: Pin | Route | null
	connectToPin: NewPinConnection
}

export interface ModeStateSchema {
	states: {
		Welcome: {}
		Lesson: {
			states: {
				Browse: {}
				DropPin: {
					states: {
						DropMode: {
							states: {
								Drop: {}
								Connect: {}
							}
						}
					}
				}
				Inspect: {}
			}
		}
		CaptureView: {}
	}
}

export type ModeEvent =
	| { type: 'enterLesson' }
	| { type: 'clickedItem' }
	| { type: 'close' }
	| { type: 'droppedPin' }
	| { type: 'enterConnect'; context: Pick<ModeContext, 'connectToPin'> }
	| { type: 'clickedDropPin' }

export const modeSchema = {
	id: 'modeMachine',
	initial: 'Welcome' as 'Welcome',
	states: {
		Welcome: { id: 'Welcome', states: {}, on: { enterLesson: '#Lesson' } },
		Lesson: {
			id: 'Lesson',
			states: {
				Browse: { id: 'Browse', states: {}, on: { clickedItem: '#Inspect' } },
				DropPin: {
					id: 'DropPin',
					states: {
						DropMode: {
							id: 'DropMode',
							states: {
								Drop: { id: 'Drop', states: {} },
								Connect: { id: 'Connect', states: {} },
							},
							initial: 'Drop' as 'Drop',
							on: {},
						},
					},
					initial: 'DropMode' as 'DropMode',
					on: {
						clickedDropPin: '#Browse',
						droppedPin: '#Inspect',
						enterConnect: '#Connect',
					},
				},
				Inspect: { id: 'Inspect', states: {}, on: { close: '#Lesson' } },
			},
			initial: 'Browse' as 'Browse',
			on: { clickedDropPin: '#DropPin' },
		},
		CaptureView: { id: 'CaptureView', states: {} },
	},
}

const modeMachine = Machine<ModeContext, ModeStateSchema, ModeEvent>(modeSchema)

const machineOptions = {
	logger: debug,
}

export const useMapMode = () => {
	const [state, send] = useMachine(modeMachine)
	return {
		state,
		transitionMode: send,
	}
}
