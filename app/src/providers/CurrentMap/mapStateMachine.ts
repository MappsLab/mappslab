/* eslint-disable @typescript-eslint/ban-types */
import Debug from 'debug'
import { assign, createMachine } from 'xstate'
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

interface ModeEventInterface {
	type: string
	context?: any
}

type EnterEvent = {
	type: 'enterConnect'
	context: Pick<ModeContext, 'connectToPin'>
}

export type ModeEvent = ModeEventInterface &
	(
		| { type: 'close' }
		| { type: 'enterLesson' }
		| { type: 'clickedItem' }
		| { type: 'droppedPin' }
		| EnterEvent
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
							actions: ['clearConnectToPin'],
						},
						enterConnect: {
							target: '#Connect',
							actions: ['setConnectToPin'],
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
					actions: ['clearConnectToPin'],
				},
			},
		},
		CaptureView: { id: 'CaptureView', states: {} },
	},
	actions: {
		clearConnectToPin: assign({ connectToPin: undefined }),
		setConnectToPin: assign((context, event: EnterEvent) => {
			return {
				connectToPin: event.context.connectToPin,
			}
		}),
	},
}

export type ModeStateSchema = typeof modeSchema

const mapMachine = createMachine<ModeContext, ModeEvent>(modeSchema)

// const machineOptions = {
// 	logger: debug,
// }

export const useMapStateMachine = () => useMachine(mapMachine)
