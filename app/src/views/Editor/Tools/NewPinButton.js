// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import { RoundButton } from 'Components/Buttons'
import { State } from 'react-automata'

const PIN_CURSOR = 'url("/images/newPin.svg") 18 49, crosshair'

const Wrapper = styled.div`
	${({ active }) => css`
		& button {
			cursor: ${active ? PIN_CURSOR : ''};
		}
	`}
`
/**
 * NewPinButton
 */

type Props = {
	onClick: () => void,
}

const NewPinButton = ({ onClick }: Props) => (
	<State
		is="Lesson.DropPin.*"
		render={(dropMode) => {
			return (
				<Wrapper active={dropMode}>
					<RoundButton
						tooltip={dropMode ? 'Cancel' : 'Add a New Pin'}
						onClick={onClick}
						label="Add a new Pin"
						icon={dropMode ? '' : '📍'}
						size="large"
					/>
				</Wrapper>
			)
		}}
	/>
)

export default NewPinButton
