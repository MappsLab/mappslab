// @flow

import type { PinProps, PinState } from './Pin'

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

type HandlerProps = {
	props: PinProps,
	state: PinState,
}

export const pinEvents = {
	Lesson: {
		onClick: ({ props }: HandlerProps) => {
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
			onClick: ({ state, props }: HandlerProps) => {
				const { pin } = props
				// Don't allow clicks on pins that are not in a route
				if (!pin.route) return null
				const { isFirst, isLast } = pin.route
				// Don't allow clicks on pins that are first or last in a route
				if (!isFirst && !isLast) return null
				const position = props.pin.route && props.pin.route.isFirst ? 'BEFORE' : 'AFTER'
				const transition = () => props.transition('enterConnect', { connectToPin: { pin: props.pin, position } })
				return { state, props, actions: { transition } }
			},
		},
	},
}
