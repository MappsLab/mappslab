// @flow
import type { MapOptions } from 'mapp/types/mapTypes'
import type { View } from './Provider'

const defaults = {
	draggable: true,
	draggableCursor: 'initial',
	clickableIcons: false,
}

const optionsForView = new Map([
	[
		'addPin',
		{
			draggable: true,
			draggableCursor: 'url("/images/newPin.svg") 18 49, crosshair',
			clickableIcons: false,
		},
	],
	[
		'inspect',
		{
			draggable: false,
		},
	],
	['normal', {}],
	['street', {}],
])

export const getOptionsForView = (view: View): MapOptions => {
	const options = optionsForView.get(view) || {}
	return {
		...defaults,
		...options,
	}
}
