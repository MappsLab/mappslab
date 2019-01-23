// @flow
import { createObjectSearchByState } from '../utils'

// 	onAnimationChanged
// 	onClick
// 	onClickableChanged
// 	onCursorChanged
// 	onDblClick
// 	onDrag
// 	onDragEnd
// 	onDraggableChanged
// 	onDragStart
// 	onFlatChanged
// 	onIconChanged
// 	onMouseDown
// 	onMouseOut
// 	onMouseOver
// 	onMouseUp
// 	onPositionChanged
// 	onRightClick
// 	onShapeChanged
// 	onTitleChanged
// 	onVisibleChanged
// 	onZIndexChanged

export const pinEvents = {
	Lesson: {
		onClick: (payload, props) => {
			const transition = () => props.transition('clickedItem', { inspectedItem: props.pin })
			return { props, transition, state: { mouseOver: false } }
		},
		onMouseOver: () => ({
			state: { mouseOver: true },
		}),
		onMouseOut: () => ({
			state: { mouseOver: false },
		}),
		DropPin: {
			onMouseOver: ({ state }) => {
				console.log('HERE')
				return { state: { ...state, something: 'nothing' } }
			},
			onClick: ({ state, props }) => {
				// override the previos 'transition'
				const transition = () => props.transition('enterConnect')
				return { state, transition, props }
			},
		},
		// Browse: {
		// },
		// Inspect: {
		// 	handlers: {
		// 		onClick: (payload, props) => {
		// 			props.transition('clickedItem', { inspectedItem: props.pin })
		// 			return { mouseOver: false }
		// 		},
		// 	},
		// },
	},
}
