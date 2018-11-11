// @flow
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const ButtonWrapper = styled.button`
	${({ theme, level }) => `
		display: inline-block;
		margin: ${level === 'tertiary' ? theme.layout.spacing.quarter : theme.layout.spacing.single} auto;	
		padding: ${level === 'tertiary' ? theme.layout.spacing.half : theme.layout.spacing.single};
		font-size: ${level === 'tertiary' ? theme.font.size.h5 : theme.font.size.p};
		font-weight: ${level === 'primary' ? theme.font.weight.semi : theme.font.weight.normal};
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
	onClick?: () => any | (() => Promise<any>),
	to?: string,
}

export const Button = (props: ButtonProps) => (
	<ButtonWrapper {...props} as={props.to ? Link : undefined} type={props.to ? undefined : props.type} />
)

Button.defaultProps = {
	type: 'button',
	level: 'primary',
	onClick: undefined,
	to: undefined,
}

type SubmitButtonProps = {
	disabled: boolean,
}

export const SubmitButton = (props: SubmitButtonProps) => <ButtonWrapper {...props} type="submit" level="primary" />
