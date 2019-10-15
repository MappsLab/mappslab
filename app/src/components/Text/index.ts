import styled, { css, DefaultTheme } from 'styled-components'

interface TextProps {
	theme: DefaultTheme
	align?: string
	weight?: number
	color?: string
	fontStyle?: string
}

const commonTextStyles = ({ theme, align, weight, color, fontStyle }: TextProps) => css`
	font-family: ${theme.font.family.sans};
	font-weight: ${weight ? theme.font.weight[weight] : theme.font.weight.semi};
	text-align: ${align || 'left'};
	font-style: ${fontStyle || 'normal'};
	color: ${color ? theme.color[color] : 'inherit'};
`

export const Header1 = styled.h1`
	${(props: TextProps) => css`
		${commonTextStyles(props)};
		font-size: ${props.theme.font.size.h1};
	`};
`

export const Header2 = styled.h2`
	${(props: TextProps) => css`
		${commonTextStyles(props)};
		font-size: ${props.theme.font.size.h2};
	`};
`

export const Header3 = styled.h3`
	${(props: TextProps) => css`
		${commonTextStyles(props)};
		font-size: ${props.theme.font.size.h3};
	`};
`

export const P = styled.p`
	${(props: TextProps) => css`
		${commonTextStyles(props)};
		font-size: ${props.theme.font.size.p};
		font-weight: ${props.theme.font.weight.regular};
	`};
`

export const Header4 = styled.h4`
	${(props: TextProps) => css`
		${commonTextStyles(props)};
		font-size: ${props.theme.font.size.h4};
	`};
`

export const Header5 = styled.h5`
	${(props: TextProps) => css`
		${commonTextStyles(props)};
		font-size: ${props.theme.font.size.h5};
	`};
`

export const Header6 = styled.h6`
	${(props: TextProps) => css`
		${commonTextStyles(props)};
		font-size: ${props.theme.font.size.h6};
	`};
`

export const Input = styled.input`
	${(props: TextProps) => css`
		${commonTextStyles(props)};
		display: block;
		border: 0;
		padding: 0;
		&::placeholder {
			color: ${props.theme.color.middleGray};
		}
	`};
`
// font-size: ${theme.font.size.p};

export const TextArea = styled.textarea`
	${(props: TextProps) => css`
		${commonTextStyles(props)};
		display: block;
		font-size: ${props.theme.font.size.p};
		font-weight: ${props.theme.font.weight.regular};
		resize: none;
	`};
`
