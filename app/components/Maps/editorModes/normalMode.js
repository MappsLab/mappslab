// @flow

import type { HandlerProps } from './types'

const defaultOptions = {
	center: { lat: 40.65, lng: -111.85 },
	zoom: 10,
	disableDefaultUI: true,
	zoomControlOptions: false,
	streetViewControlOptions: false,
}

const normalMode = {
	onEntry: (props: HandlerProps) => () => {
		props.googleMap.setOptions({
			draggable: true,
			draggableCursor: undefined,
		})
	},
	onClick: () => () => {},
}

export default normalMode
