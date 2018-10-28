// // States
// const WELCOME = 'welcome'
// const LESSON = 'lesson'
// const CAPTURE = 'captureView'

// // Child States
// // -> LESSON
// const BROWSE = 'browse'
// const DROP_PIN = 'dropPin'
// const INSPECT = 'inspect'

// // Transitions
// const RESTART = 'restart'
// const ENTER_LESSON = 'enterLesson'
// const ENTER_DROP_PIN = 'enterDropPin'
// const DROPPED_PIN = 'droppedPin'
// const CONNECTED_PIN = 'connectedPin'
// const END_CONNECTION = 'endedConnection'
// const CLOSE = 'close'

const statechart = {
	states: {
		Welcome: { id: 'Welcome', states: {} },
		Lesson: {
			id: 'Lesson',
			states: {
				Browse: { id: 'Browse', states: {}, on: { clickedDropPin: '#DropPin', clickedItem: '#Inspect' } },
				DropPin: {
					id: 'DropPin',
					states: {
						DropMode: {
							id: 'DropMode',
							states: {
								Drop: { id: 'Drop', states: {} },
								Connect: { id: 'Connect', states: {} },
							},
							initial: 'Drop',
							on: {},
						},
					},
					initial: 'DropMode',
					on: {
						droppedPin: '#Inspect',
						enterConnect: '#Connect',
					},
				},
				Inspect: { id: 'Inspect', states: {}, on: { close: '#Lesson' } },
			},
			initial: 'Browse',
			on: {},
		},
		CaptureView: { id: 'CaptureView', states: {} },
	},
	initial: 'Welcome',
	on: { enterLesson: '#Lesson', returnToWelcome: '#Welcome' },
}

// const statechart = {
// 	initial: WELCOME,
// 	states: {
// 		[WELCOME]: {},
// 		[LESSON]: {
// 			initial: BROWSE,
// 			states: {
// 				[BROWSE]: {
// 					on: {
// 						[ENTER_DROP_PIN]: DROP_PIN,
// 					},
// 				},
// 				[DROP_PIN]: {},
// 				[INSPECT]: {},
// 			},
// 			on: {
// 				[ENTER_DROP_PIN]: DROP_PIN,
// 				[DROPPED_PIN]: INSPECT,
// 			},
// 		},
// 		[CAPTURE]: {},
// 		on: {
// 			[ENTER_LESSON]: LESSON,
// 			[RESTART]: WELCOME,
// 		},
// 	},
// }

export default statechart
