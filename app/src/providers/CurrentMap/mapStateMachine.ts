/* eslint-disable @typescript-eslint/ban-types */
import Debug from 'debug'
import { assign, Machine } from 'xstate'
import { useMachine } from '@xstate/react'
import { Pin, Route } from '../../types-ts'

const debug = Debug('app:map-mode')

interface NewPinConnection {
	pin: Pin
	position?: 'BEFORE' | 'AFTER'
}

export type ModeContext = {
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

interface ModeEventInterface {
	type: string
	context?: any
}

export type ModeEvent = ModeEventInterface &
	(
		| { type: 'enterLesson' }
		| { type: 'clickedItem' }
		| { type: 'close'; context: any }
		| { type: 'droppedPin' }
		| { type: 'enterConnect'; context: Pick<ModeContext, 'connectToPin'> }
		| { type: 'clickedDropPin' }
	)

export const modeSchema = {
	id: 'mapStateMachine',
	initial: 'Welcome' as const,
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
							initial: 'Drop' as const,
							on: {},
						},
					},
					initial: 'DropMode' as const,
					on: {
						clickedDropPin: {
							target: '#Browse',
							actions: assign({ connectToPin: undefined }),
						},
						enterConnect: {
							target: '#Connect',
							actions: assign((_, event: ModeEvent) => event.context),
						},
						droppedPin: {
							target: '#Browse',
						},
					},
				},
				Inspect: {
					id: 'Inspect',
					states: {},
					on: {
						close: '#Lesson',
					},
				},
			},
			initial: 'Browse' as const,
			on: {
				clickedDropPin: {
					target: '#DropPin',
					actions: assign({ connectToPin: undefined }),
				},
			},
		},
		CaptureView: { id: 'CaptureView', states: {} },
	},
}

const mapMachine = Machine<ModeContext, ModeStateSchema, ModeEvent>(modeSchema)

const machineOptions = {
	logger: debug,
}

export const useMapStateMachine = () => useMachine(mapMachine)
