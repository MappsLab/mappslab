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

const pinEvents = {
	Lesson: {
		Browse: {
			handlers: {
				onClick: (payload, props) => {
					props.transition('clickedItem', { inspectedItem: props.pin })
					return { mouseOver: false }
				},
				onMouseOver: () => ({
					mouseOver: true,
				}),
				onMouseOut: () => ({
					mouseOver: false,
				}),
			},
		},
	},
}

export const getHandlersForState = createObjectSearchByState({
	chart: pinEvents,
	searchKey: 'handlers',
})
