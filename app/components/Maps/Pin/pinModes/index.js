// @flow
import withModes from 'Components/helpers/withModes'
import addPinMode from './addPinMode'
import normalMode from './normalMode'
import editPinMode from './editPinMode'
import { states } from '../../statechart'

const modes = {
	[states.NORMAL]: normalMode,
	[states.ADD_PIN]: addPinMode,
	[states.EDIT_PIN]: editPinMode,
}

const withPinModes = withModes(modes)

export default withPinModes
