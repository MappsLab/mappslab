// @flow

import { DROPPED_PIN } from './statechart'
import type { EditorProps, EditorState } from '../Editor'

const addPinMode = (initialProps) => ({
	onEntry: () => {},
	onClick: (props) => () => {
		props.transition(DROPPED_PIN, { hi: 'hello' })
	},
	handleMapClick: (e) => {},
})

export default addPinMode
