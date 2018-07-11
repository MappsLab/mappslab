// @flow
import React from 'react'
import styled from 'styled-components'

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
	active?: boolean,
}

const NewPinButton = ({ onClick, active }: Props) => (
	<Wrapper onClick={onClick} active={active}>
		<span role="img" aria-label="Add a New Pin">
			📍
		</span>
	</Wrapper>
)

NewPinButton.defaultProps = {
	active: false,
}

export default NewPinButton
