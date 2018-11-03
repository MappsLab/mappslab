// @flow
import { css } from 'styled-components'

/* Forms */

export const formWrapperStyles = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	${({ disabled }) =>
		disabled &&
		`
		opacity: 0.5;
		pointer-events: none;
	`};
`

export const formMessageStyles = css`
	font-size: ${({ theme }) => theme.text.h4};
`

export const formErrorStyles = css`
	${formMessageStyles};
	color: ${({ theme }) => theme.colors.red};
`

/* Fields */

export const fieldWrapperStyles = css`
	display: ${({ hidden }) => (hidden ? 'none' : 'flex')};
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
`
// margin: ${({ theme }) => `${theme.layout.spacing.single} 0 ${theme.layout.spacing.double}`};

export const labelStyles = css`
	font-weight: ${({ theme }) => theme.text.semi};
	font-size: ${({ theme }) => theme.text.h4};
	text-transform: uppercase;
	margin-bottom: ${({ theme }) => theme.layout.spacing.half};
`

export const helpTextStyles = css`
	margin-top: ${({ theme }) => theme.layout.spacing.eighth};
	font-size: ${({ theme }) => theme.text.h4};
	color: ${({ theme }) => theme.colors.middleGray};
	text-align: left;
`

export const validationErrorStyles = css`
	${helpTextStyles};
	color: ${({ theme }) => theme.colors.red};
`

export const inputStyles = css`
	font-size: ${({ theme }) => theme.text.p};
	width: 100%;
	padding: ${({ theme }) => theme.layout.spacing.quarter};
	border-bottom: 2px solid;
	border-color: ${({ active, theme }) => (active ? '' : theme.colorslightGray)};
	transition: 0.3s;
`
