// @flow
import React from 'react'
import RoundButton from 'Components/UI/RoundButton'
import { State } from 'react-automata'

/**
 * NewPinButton
 */

type Props = {
	onClick: () => void,
}

const NewPinButton = ({ onClick }: Props) => (
	<State is="Lesson*">
		<RoundButton onClick={onClick} label="Add a new Pin" icon="📍" size="large" />
	</State>
)

export default NewPinButton
