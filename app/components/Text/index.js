// @flow
import styled, { css } from 'styled-components'
import { h1, h2, h3, p, h4, h5, light, regular, semi, strong } from 'Styles/text'
import * as colors from 'Styles/colors'

const commonTextStyles = css`
	text-align: ${(props) => (props.align ? props.align : 'left')};
	font-weight: ${(props) => {
		switch (props.weight) {
			case 'semi':
				return semi
			case 'strong':
				return strong
			case 'regular':
			case 'normal':
				return regular
			default:
			case 'light':
				return light
		}
	}};
	color: ${(props) => colors[props.color] || 'black'};
`

export const Header1 = styled.h1`
	${commonTextStyles};
	font-size: ${h1};
`

export const Header2 = styled.h2`
	${commonTextStyles};
	font-size: ${h2};
`

export const Header3 = styled.h3`
	${commonTextStyles};
	font-size: ${h3};
`

export const P = styled.p`
	${commonTextStyles};
	font-size: ${p};
`

export const Header4 = styled.h4`
	${commonTextStyles};
	font-size: ${h4};
`

export const Header5 = styled.h5`
	${commonTextStyles};
	font-size: ${h5};
`

export const Input = styled.input`
	${commonTextStyles};
	display: block;
	border: 0;
	padding: 0;
`

export const TextArea = styled.textarea`
	${commonTextStyles};
	display: block;
	font-size: ${p};
	resize: none;
`
