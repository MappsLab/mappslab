// @flow
import styled, { css } from 'styled-components'

const commonTextStyles = css`
	${({ theme, align, weight, color }) => `
		font-weight: ${theme.font.weight[weight] || theme.font.weight.semi};
		text-align: ${align || 'left'};
		color: ${theme.color[color] || 'inherit'};
	`};
`

export const Header1 = styled.h1`
	${commonTextStyles};
	${({ theme }) => `
		font-size: ${theme.font.size.h1};
	`};
`

export const Header2 = styled.h2`
	${commonTextStyles};
	${({ theme }) => `
		font-size: ${theme.font.size.h2};
	`};
`

export const Header3 = styled.h3`
	${commonTextStyles};
	${({ theme }) => `
		font-size: ${theme.font.size.h3};
	`};
`

export const P = styled.p`
	${commonTextStyles};
	${({ theme }) => `
		font-size: ${theme.font.size.p};
		font-weight: ${theme.font.weight.regular};
	`};
`

export const Header4 = styled.h4`
	${({ theme }) => `
		${commonTextStyles};
		font-size: ${theme.font.size.h4};
	`};
`

export const Header5 = styled.h5`
	${commonTextStyles};
	${({ theme }) => `
		font-size: ${theme.font.size.h5};
	`};
`

export const Header6 = styled.h6`
	${commonTextStyles};
	${({ theme }) => `
		font-size: ${theme.font.size.h6};
	`};
`

export const Input = styled.input`
	${commonTextStyles};
	${() => `
		display: block;
		border: 0;
		padding: 0;
	`};
`
// font-size: ${theme.font.size.p};

export const TextArea = styled.textarea`
	${commonTextStyles};
	${({ theme }) => `
		display: block;
		font-size: ${theme.font.size.p};
		font-weight: ${theme.font.weight.regular};
		resize: none;
	`};
`
