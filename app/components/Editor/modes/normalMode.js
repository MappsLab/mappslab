// @flow

import { DROPPED_PIN } from './statechart'
import type { EditorProps, EditorState } from '../Editor'

export const normalOptions = {
	center: { lat: 40.65, lng: -111.85 },
	zoom: 10,
	disableDefaultUI: true,
	zoomControlOptions: false,
	streetViewControlOptions: false,
}

const normalMode = (initialProps) => ({
	onEntry: (props) => () => {
		props.updateMapOptions(normalOptions)
	},
	onClick: () => () => {},
})

export default normalMode
