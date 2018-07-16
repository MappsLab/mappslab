// @flow
import React from 'react'
import RoundButton from 'Components/UI/RoundButton'
import { State } from 'react-automata'
import { ADD_PIN, ADD_PIN_INFO } from '../modes/statechart'

/**
 * NewPinButton
 */

type Props = {
	onClick: () => void,
}

const NewPinButton = ({ onClick }: Props) => (
	<State
		value={[ADD_PIN, ADD_PIN_INFO]}
		render={(isActive) => <RoundButton onClick={onClick} active={isActive} label="Add a new Pin" icon="" />}
	/>
)

export default NewPinButton
