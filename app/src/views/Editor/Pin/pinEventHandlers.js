// @flow

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
		onClick: ({ payload, props }) => {
			const transition = () => props.transition('clickedItem', { inspectedItem: props.pin })
			return { transition, state: { mouseOver: false } }
		},
		onMouseOver: () => ({
			state: { mouseOver: true },
		}),
		onMouseOut: () => ({
			state: { mouseOver: false },
		}),
		DropPin: {
			onClick: ({ state, props }) => {
				// override the previous transition
				const transition = () => props.transition('enterConnect', { connectToPin: props.pin.uid })
				return { state, props, transition }
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
