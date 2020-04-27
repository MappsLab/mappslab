// @flow
import React from 'react'
import styled, { css, DefaultTheme } from 'styled-components'
import { State } from 'react-automata'
import { RoundButton } from '../../../components/Buttons'

const PIN_CURSOR = 'url("/images/newPin.svg") 18 49, crosshair'

interface WrapperProps {
	active: boolean
	theme: DefaultTheme
}
const Wrapper = styled.div`
	${({ active }: WrapperProps) => css`
		& button {
			cursor: ${active ? PIN_CURSOR : ''};
		}
	`}
`
/**
 * NewPinButton
 */

type Props = {
	onClick: () => void
}

const NewPinButton = ({ onClick }: Props) => (
	<State
		is="Lesson.DropPin.*"
		render={(dropMode: boolean) => {
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
