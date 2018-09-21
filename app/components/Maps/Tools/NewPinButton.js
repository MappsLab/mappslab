// @flow
import React from 'react'
import RoundButton from 'Components/UI/RoundButton'
import { State } from 'react-automata'
import { states } from '../statechart'

/**
 * NewPinButton
 */

type Props = {
	onClick: () => void,
}

const NewPinButton = ({ onClick }: Props) => (
	<State
		is={`${states.CREATE_PIN}*`}
		render={(isActive) => <RoundButton onClick={onClick} active={isActive} label="Add a new Pin" icon="📍" size="large" />}
	/>
)

export default NewPinButton
