// @flow
import React from 'react'
import styled from 'styled-components'

export const ButtonWrapper = styled.button`
	display: block;
	transition: 0.2s;
	border-radius: 2px;
	text-transform: uppercase;

	${({ theme, secondary }) => `
		${secondary ? '' : theme.lightShadow};
		${theme.text.display};
		margin: ${theme.spacing.single} auto;	
		padding: ${theme.spacing.half} ${theme.spacing.single};
		background-color: ${secondary ? 'white' : theme.colors.primary};
		border: ${secondary ? `1px solid ${theme.colors.middleGray}` : ''};
		color: ${secondary ? theme.colors.gray : 'black'};
	`};

	& :hover {
		${({ theme, secondary }) => `
			background-color: ${secondary ? '' : theme.colors.primaryLight};
		`};
	}
`

type ButtonProps = {
	type?: 'button' | 'submit' | 'reset',
	secondary?: boolean,
}

export const Button = (props: ButtonProps) => <ButtonWrapper {...props} />

Button.defaultProps = {
	type: 'button',
	secondary: false,
}

type SubmitButtonProps = {
	disabled: boolean,
}

export const SubmitButton = (props: SubmitButtonProps) => <ButtonWrapper {...props} type="submit" />
