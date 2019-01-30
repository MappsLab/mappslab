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
		onClick: ({ props }) => {
			const transition = () => props.transition('clickedItem', { inspectedItem: props.pin })
			return { actions: { transition }, state: { mouseOver: false } }
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
				const transition = () => props.transition('enterConnect', { connectToPin: { pin: props.pin, position: 'AFTER' } })
				return { state, props, actions: { transition } }
			},
		},
	},
}
