// @flow
import styled, { css } from 'styled-components'
import { h1, h2, h3, p, h4, h5, light, regular, semi, strong } from 'Styles/type'
import * as colors from 'Styles/colors'
import { spacing } from 'Styles/layout'

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
	margin-bottom: ${(props) => props.marginBottom || '1em'};
	font-size: ${h1};
`

export const Header2 = styled.h2`
	${commonTextStyles};
	font-size: ${h2};
	margin-bottom: ${(props) => props.marginBottom || '1em'};
`

export const Header3 = styled.h3`
	${commonTextStyles};
	font-size: ${h3};
	margin-bottom: ${(props) => props.marginBottom || spacing.half};
`

export const P = styled.p`
	${commonTextStyles};
	font-size: ${p};
	margin-bottom: ${(props) => props.marginBottom || spacing.half};
`

export const Header4 = styled.h4`
	${commonTextStyles};
	font-size: ${h4};
	margin-bottom: ${(props) => props.marginBottom || spacing.half};
`

export const Header5 = styled.h5`
	${commonTextStyles};
	font-size: ${h5};
	margin-bottom: ${(props) => props.marginBottom || spacing.half};
`
