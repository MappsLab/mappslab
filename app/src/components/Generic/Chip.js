// @flow
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
	${({ theme, size, active }) => `
		height: ${theme.sizes.chip[size].height};
		display: inline-flex;
		justify-content: flex-start;
		align-items: center;	
		margin: ${size === 'large' ? theme.layout.spacing.half : theme.layout.spacing.half} 0;
		padding: 0 ${size === 'large' ? theme.layout.spacing.single : theme.layout.spacing.half};
		background-color: ${active ? theme.color.primary.muted : 'white'};
		border: 1px solid ${theme.color.primary.normal};
		border-radius: 2px;
	`};
`

const ImageWrapper = styled.figure`
	${({ theme, size }) => {
		const { height } = theme.sizes.chip[size]
		const width = size === 'large' ? `${height} - 18px` : `${height} - 12px`
		return `
			width: calc(${width});
			height: calc(${width});
			margin-right: ${size === 'large' ? '5px' : '3px'};
			border-radius: calc(${width} / 2);
			overflow: hidden;
		`
	}};

	> img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`

const TitleWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-center;
	align-items: flex-start;
`

const Title = styled.span`
	${({ theme, size }) => `
		font-size: ${size === 'small' ? theme.font.size.h5 : theme.font.size.h4};
		font-weight: ${size === 'small' ? theme.font.weight.semi : theme.font.weight.semi};
	`};
`

const Subtitle = styled.span`
	${({ theme, size }) => `
		font-size: ${theme.font.size.h5};
		display: ${size === 'large' ? 'block' : 'none'};
		color: ${theme.color.middleGray};
	`};
`

/**
 * Chip
 */

export type ChipProps = {
	size?: 'small' | 'large' | 'full',
	active?: boolean,
}

type Props = {
	size?: 'small' | 'large' | 'full',
	active?: boolean,
	image?: string | null,
	title: string,
	subtitle?: string | null,
	onClick?: null | (() => any | (() => Promise<any>)),
	to?: null | string,
}

const Chip = ({ image, title, subtitle, size, active, to, onClick }: Props) => {
	const as = to
		? // if 'to', use a Link
		  Link
		: // else, if 'onClick', use a button
		  onClick
			? 'button'
			: undefined
	return (
		<Wrapper
			size={size}
			active={active || undefined}
			as={as}
			type={as === 'button' ? 'button' : undefined}
			to={to}
			onClick={onClick}
		>
			<ImageWrapper size={size}>
				<img src="https://media0.giphy.com/media/1wnZQRxFfbKHnSIEIS/giphy.webp" />
			</ImageWrapper>
			<TitleWrapper>
				<Title size={size}>{title}</Title>
				<Subtitle size={size}>{subtitle}</Subtitle>
			</TitleWrapper>
		</Wrapper>
	)
}
Chip.defaultProps = {
	size: 'large',
	active: false,
	to: null,
	onClick: null,
	image: null,
	subtitle: null,
}

export default Chip
