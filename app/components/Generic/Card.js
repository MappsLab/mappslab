// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
	${({ theme, align }) => `
		${theme.radius};
		border: 2px solid ${theme.colors.lightGray};
		padding: ${theme.layout.spacing.half};
		display: block;
		text-align: ${align || 'left'};
	`};

	& :hover {
		border-color: ${({ theme }) => theme.colors.green};
	}
`

/**
 * Card
 */

type Props = {
	onClick?: (any) => void | null,
	linkTo?: string | null,
	header: string,
	subheader?: string,
}

const Card = ({ onClick, linkTo, header, subheader }: Props) => {
	const wrapperType = onClick ? 'button' : linkTo ? Link : 'div'
	return (
		<Wrapper as={wrapperType} to={linkTo} onClick={onClick}>
			<h1>{header}</h1>
			<h2>{subheader}</h2>
		</Wrapper>
	)
}

Card.defaultProps = {
	subheader: '',
	onClick: null,
	linkTo: null,
}

export default Card
