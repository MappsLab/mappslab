// @flow
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.button`
	border: 2px solid ${({ active }) => (active ? 'red' : 'green')};
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	${({ size }) =>
		size === 'large'
			? `
		width: 50px;
		height: 50px;
		border-radius: 25px;
		margin: 5px;
		font-size: 35px;
	`
			: `
		width: 35px;
		height: 35px;
		border-radius: 18px;
		margin: 4px;
		font-size: 22px;
	`};
`

/**
 * RoundButton
 */

type Props = {
	onClick: () => void,
	isActive?: boolean,
	disabled?: boolean,
	label: string,
	icon: string,
	size?: 'normal' | 'large',
}

const RoundButton = ({ onClick, isActive, label, disabled, icon, size }: Props) => (
	<Wrapper size={size} onClick={onClick} active={isActive} disabled={disabled}>
		<span role="img" aria-label={label}>
			{icon}
		</span>
	</Wrapper>
)

RoundButton.defaultProps = {
	isActive: false,
	disabled: false,
	size: 'normal',
}

export default RoundButton
