// @flow
import withModes from 'Components/helpers/withModes'
import addPinMode from './addPinMode'
import normalMode from './normalMode'
import editPinMode from './editPinMode'
import inspectPinMode from './inspectPinMode'

import { NORMAL, EDIT_PIN, ADD_PIN, INSPECT_PIN } from '../statechart'

const modes = {
	[NORMAL]: normalMode,
	[ADD_PIN]: addPinMode,
	[EDIT_PIN]: editPinMode,
	[INSPECT_PIN]: inspectPinMode,
}

const withMapModes = withModes(modes)

export default withMapModes
