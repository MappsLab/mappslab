// @flow
import withModes from 'Components/helpers/withModes'
import createPinMode from './createPinMode'
import normalMode from './normalMode'
import editPinMode from './editPinMode'
import inspectPinMode from './inspectPinMode'

import { states } from '../statechart'

const modes = {
	[states.NORMAL]: normalMode,
	[states.CREATE_PIN]: createPinMode,
	[states.EDIT_PIN]: editPinMode,
	[states.INSPECT_PIN]: inspectPinMode,
}

const withMapModes = withModes(modes)

export default withMapModes
