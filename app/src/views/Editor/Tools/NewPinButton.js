// @flow
import React from 'react'
import { RoundButton } from 'Components/Buttons'
import { State } from 'react-automata'

/**
 * NewPinButton
 */

type Props = {
	onClick: () => void,
}

const NewPinButton = ({ onClick }: Props) => (
	<State is="Lesson*">
		<RoundButton toolTip="Add a New Pin" onClick={onClick} label="Add a new Pin" icon="📍" size="large" />
	</State>
)

export default NewPinButton
