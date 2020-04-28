import { createObjectSearchByState } from 'Utils/statecharts'

const defaults = {
	draggable: true,
	draggableCursor: 'initial',
	clickableIcons: false,
}

const PIN_CURSOR = 'url("/images/newPin.svg") 18 49, crosshair'

const mapOptions = {
	Welcome: {
		options: {
			draggable: false,
			clickableIcons: false,
		},
	},
	Lesson: {
		options: defaults,

		DropPin: {
			DropMode: {
				options: {
					draggableCursor: PIN_CURSOR,
				},
			},
		},
	},
}

export const getOptionsForState = createObjectSearchByState({
	chart: mapOptions,
	searchKey: 'options',
})
