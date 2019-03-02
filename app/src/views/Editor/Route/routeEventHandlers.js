// @flow
import { createObjectSearchByState } from 'Utils/statecharts'

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

const routeEvents = {
	Lesson: {
		handlers: {
			onClick: (payload, props) => {
				props.transition('clickedItem', { inspectedItem: props.route })
				return { mouseOver: false }
			},
			onMouseOver: () => ({
				mouseOver: true,
			}),
			onMouseOut: () => ({
				mouseOver: false,
			}),
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

export const getHandlersForState = createObjectSearchByState({
	chart: routeEvents,
	searchKey: 'handlers',
})
