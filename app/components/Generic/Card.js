// @flow
import React from 'react'
import styled from 'styled-components'

const CardWrapper = styled.div`
	${({ theme, align }) => `
		${theme.radius};
		border: 2px solid ${theme.colors.lightGray};
		padding: ${theme.spacing.half};
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
	header: string,
	subheader?: string,
}

const Card = ({ header, subheader }: Props) => {
	return (
		<CardWrapper>
			<h1>{header}</h1>
			<h2>{subheader}</h2>
		</CardWrapper>
	)
}

Card.defaultProps = {
	subheader: '',
}

export default Card
