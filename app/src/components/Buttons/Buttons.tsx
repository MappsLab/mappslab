import React from 'react'
import styled, { css, DefaultTheme } from 'styled-components'
import { Link } from 'react-router-dom'
import { ToolTip } from '../ToolTip'

interface ButtonWrapperProps {
	theme: DefaultTheme
	disabled: boolean
	level: string
}

export const ButtonWrapper = styled.button`
	${({ theme, level, disabled }: ButtonWrapperProps) => css`
		display: inline-flex;
		align-items: center;
		cursor: pointer;
		margin: ${level === 'tertiary'
				? theme.layout.spacing.quarter
				: theme.layout.spacing.single}
			auto;
		padding: ${level === 'tertiary'
			? theme.layout.spacing.half
			: theme.layout.spacing.single};
		font-size: ${level === 'tertiary' ? theme.font.size.h5 : theme.font.size.p};
		font-weight: ${level === 'primary'
			? theme.font.weight.semi
			: theme.font.weight.normal};
		border-radius: ${theme.mixins.borderRadius};
		box-shadow: ${level === 'tertiary' ? '' : theme.mixins.boxShadow.normal};
		background-color: ${level === 'primary'
			? theme.color.primary.normal
			: 'white'};
		color: ${level === 'primary'
			? theme.color.primary.text
			: level === 'secondary '
			? theme.color.primary.normal
			: theme.color.middleGray};
		border: ${level === 'secondary'
			? css`1px solid ${theme.color.primary.normal}`
			: ''};
		transition: 0.1s;
		${disabled &&
			css`
				opacity: 0.6;
				pointer-events: none;
			`}

		& > svg {
			margin: 0 0.5em;
		}

		&:hover {
			background-color: ${level === 'primary'
				? theme.color.primary.accent
				: ''};
			box-shadow: ${level === 'tertiary' ? theme.mixins.boxShadow.normal : ''};
		}
	`}
`

interface ButtonProps {
	type?: string
	level?: string
	onClick?: () => any | (() => Promise<any>)
	tooltip?: string
	to?: string
	as?: string
	children?: React.ReactNode
	disabled?: boolean
	htmlFor?: string
}

export const Button = (props: ButtonProps) => (
	<ToolTip message={props.tooltip}>
		<ButtonWrapper
			{...props}
			// @ts-ignore
			as={props.as || (props.to ? Link : undefined)}
			type={props.to || props.as ? undefined : props.type}
		/>
	</ToolTip>
)

Button.defaultProps = {
	type: 'button',
	level: 'primary',
	tooltip: undefined,
	onClick: undefined,
	to: undefined,
	as: undefined,
}

interface SubmitButtonProps extends ButtonProps {
	wide: boolean
}

export const SubmitButton = ({ as, ...rest }: SubmitButtonProps) => (
	<ButtonWrapper
		// @ts-ignore
		as={as}
		{...rest}
		type="submit"
		level="primary"
	/>
)
