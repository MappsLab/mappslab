// @flow

const statechart = {
	states: {
		Welcome: { id: 'Welcome', states: {} },
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
							initial: 'Drop',
							on: {},
						},
					},
					initial: 'DropMode',
					on: {
						clickedDropPin: '#Browse',
						droppedPin: '#Inspect',
						enterConnect: '#Connect',
					},
				},
				Inspect: { id: 'Inspect', states: {}, on: { close: '#Lesson' } },
			},
			initial: 'Browse',
			on: { clickedDropPin: '#DropPin' },
		},
		CaptureView: { id: 'CaptureView', states: {} },
	},
	initial: 'Welcome',
	on: { enterLesson: '#Lesson', returnToWelcome: '#Welcome' },
}

export default statechart
