// @flow
import styled, { DefaultTheme } from 'styled-components'
import { Header4, Header5 } from '../Text'
/* Forms */

export const FormWrapper = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	${({ disabled }: { disabled: boolean }) => {
		if (disabled) {
			return `
			opacity: 0.5;
			pointer-events: none;
			`
		}
	}}
`

export const FormError = styled(Header4)`
	color: ${({ theme }) => theme.color.error};
`

/* Fields */

export const FieldWrapper = styled.div`
	${({ theme, hidden }) => `
		position: relative;
		display: ${hidden ? 'none' : 'flex'};
		margin: ${theme.layout.spacing.single} 0;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
	`};
`

interface LabelProps {
	theme: DefaultTheme
	active?: boolean
	required?: boolean
}

export const Label = styled.label`
	${({ theme, active }: LabelProps) => `
		position: absolute;
		top: calc(-${theme.font.size.h5} / 2);
		left: 10px;
		padding: 1px;
		background-color: white;
		font-weight: ${theme.font.weight.semi};
		font-size: ${theme.font.size.h5};
		text-transform: uppercase;
		color: ${active ? theme.color.primary.accent : ''};
	`};
`

export const HelpText = styled(Header5)`
	margin-top: ${({ theme }) => theme.layout.spacing.eighth};
	color: ${({ theme }) => theme.color.primary.normal};
	text-align: left;
`

export const ValidationError = styled(HelpText)`
	color: ${({ theme }) => theme.color.error};
`

interface InputProps {
	theme: DefaultTheme
	active?: boolean
	required?: boolean
}

export const Input = styled.input`
	${({ theme }: InputProps) => `
		font-size: ${theme.font.size.p};
		width: 100%;
		padding: ${theme.layout.spacing.single};
		border: 1px solid currentColor;

		&:focus {
			border-color: ${theme.color.primary.accent};

		}
	`};
`
