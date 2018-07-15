// @flow
import React from 'react'
import styled from 'styled-components'
import { State } from 'react-automata'
import { ADD_PIN, ADD_PIN_INFO } from '../modes/statechart'

const Wrapper = styled.button`
	border: 2px solid ${({ active }) => (active ? 'red' : 'green')};
	width: 50px;
	height: 50px;
	border-radius: 25px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 35px;
	text-align: center;
`

/**
 * NewPinButton
 */

type Props = {
	onClick: () => void,
}

const NewPinButton = ({ onClick }: Props) => (
	<State
		value={[ADD_PIN, ADD_PIN_INFO]}
		render={(isActive) => (
			<Wrapper onClick={onClick} active={isActive}>
				<span role="img" aria-label="Add a New Pin">
					📍
				</span>
			</Wrapper>
		)}
	/>
)

export default NewPinButton
