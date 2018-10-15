// @flow
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
	${({ theme, size, active }) => `
		width: 100%;
		height: ${size === 'large' ? '36px' : '16px'};
		display: flex;
		justify-content: flex-start;
		align-items: center;	
		border: ${active ? `2px solid ${theme.colors.red}` : `2px solid ${theme.colors.gray}`};
		background-color: white;
		border-radius: ${size === 'large' ? '18px' : '8px'};
		padding: ${size === 'large' ? '3px' : '2px'};
	`};
`

const ImageWrapper = styled.figure`
	${({ size }) => `
		width: ${size === 'large' ? '24px' : '12px'};
		height: ${size === 'large' ? '24px' : '12px'};
		margin-right: ${size === 'large' ? '3px' : '2px'};
		border-radius: ${size === 'large' ? '12px' : '6px'};
		overflow: hidden;
	`};
`

const TitleWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-center;
	align-items: flex-start;
`

const Title = styled.div`
	${({ theme, size }) => `
		font-size: ${size === 'large' ? theme.text.h2 : theme.text.h3};
	`};
`

const Subtitle = styled.div`
	${({ theme, size }) => `
		font-size: ${theme.text.h3};
		display: ${size === 'large' ? 'none' : 'block'};
	`};
`

/**
 * Chip
 */

type Props = {
	active?: boolean,
	image?: string | null,
	title: string,
	subtitle?: string | null,
	size: 'small' | 'large',
}

const Chip = ({ image, title, subtitle, size, active }: Props) => (
	<Wrapper size={size} active={active}>
		<ImageWrapper size={size}>
			<img src={image} />
		</ImageWrapper>
		<TitleWrapper>
			<Title size={size}>{title}</Title>
			<Subtitle size={size}>{subtitle}</Subtitle>
		</TitleWrapper>
	</Wrapper>
)

Chip.defaultProps = {
	active: false,
	image: null,
	subtitle: null,
}

export default Chip
