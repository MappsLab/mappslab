// @flow
import React from 'react'
import styled from 'styled-components'

export const ButtonWrapper = styled.button`
	${({ theme, level }) => `
		display: block;
		margin: ${level === 'tertiary' ? theme.layout.spacing.quarter : theme.layout.spacing.single} auto;	
		padding: ${level === 'tertiary' ? theme.layout.spacing.half : theme.layout.spacing.single};
		font-size: ${level === 'tertiary' ? theme.text.size.h5 : theme.text.size.p};
		font-weight: ${level === 'primary' ? theme.text.weight.semi : theme.text.weight.normal};
		border-radius: ${theme.mixins.borderRadius};
		box-shadow: ${level === 'tertiary' ? '' : theme.mixins.boxShadow.normal};
		background-color: ${level === 'primary' ? theme.color.primary.normal : 'white'};
		color: ${
			level === 'primary'
				? theme.color.primary.text
				: level === 'secondary '
					? theme.color.primary.normal
					: theme.color.middleGray
		};
		border: ${level === 'secondary' ? `1px solid ${theme.color.primary.normal}` : ''};
		transition: 0.1s;

		&:hover {
			background-color: ${level === 'primary' ? theme.color.primary.accent : ''};
			box-shadow: ${level === 'tertiary' ? theme.mixins.boxShadow.normal : ''};

		`};
	}
`

type ButtonProps = {
	type?: 'button' | 'submit' | 'reset',
	level?: 'primary' | 'secondary' | 'tertiary',
}

export const Button = (props: ButtonProps) => <ButtonWrapper {...props} />

Button.defaultProps = {
	type: 'button',
	level: 'primary',
}

type SubmitButtonProps = {
	disabled: boolean,
}

export const SubmitButton = (props: SubmitButtonProps) => <ButtonWrapper {...props} type="submit" level="primary" />
