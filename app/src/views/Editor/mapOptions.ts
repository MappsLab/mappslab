import { createObjectSearchByState } from '../../utils/statecharts'

const defaults = {
	disableDefaultUI: true,
	zoomControlOptions: false,
	streetViewControlOptions: false,
	mapTypeControlOptions: {
		mapTypeIds: ['baseImage'],
	},
	mapContainerStyle: {
		width: '100%',
		height: '100%',
	},
	draggable: true,
	draggableCursor: 'initial',
	clickableIcons: false,
}

const PIN_CURSOR = 'url("/images/newPin.svg") 18 49, crosshair'

const mapOptions = {
	Welcome: {
		options: {
			...defaults,
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
