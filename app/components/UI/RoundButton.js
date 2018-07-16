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
 * RoundButton
 */

type Props = {
	onClick: () => void,
	isActive?: boolean,
	label: string,
}

const RoundButton = ({ onClick, isActive, label }: Props) => (
	<Wrapper onClick={onClick} active={isActive}>
		<span role="img" aria-label={label}>
			📍
		</span>
	</Wrapper>
)

RoundButton.defaultProps = {
	isActive: false,
}

export default RoundButton
