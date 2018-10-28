// @flow
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
	${({ theme, size, active }) => `
		width: 100%;
		height: ${theme.sizes.chip[size].height};
		display: flex;
		justify-content: flex-start;
		align-items: center;	
		border: ${active ? `2px solid ${theme.colors.green}` : `2px solid ${theme.colors.gray}`};
		background-color: white;
		border-radius: calc(${theme.sizes.chip[size].height} / 2);
		padding: 4px;
	`};
`

const ImageWrapper = styled.figure`
	${({ theme, size }) => {
		const width = `${theme.sizes.chip[size].height} - 10px`
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

export type ChipProps = {
	size?: 'small' | 'large',
	active?: boolean,
}

type Props = {
	size?: 'small' | 'large',
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
