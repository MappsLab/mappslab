// @flow
import withModes from 'Components/helpers/withModes'
import addPinMode from './addPinMode'
import normalMode from './normalMode'
import editPinMode from './editPinMode'
import { NORMAL, EDIT_PIN, ADD_PIN } from '../../statechart'

const modes = {
	[NORMAL]: normalMode,
	[ADD_PIN]: addPinMode,
	[EDIT_PIN]: editPinMode,
}

const withPinModes = withModes(modes)

export default withPinModes
