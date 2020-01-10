import React from 'react'
import styled, { DefaultTheme } from 'styled-components'
import { Link } from 'react-router-dom'

interface WrapperProps {
	theme: DefaultTheme
	size: string
	withBorders?: boolean
	active?: boolean
	to?: string
}

const Wrapper = styled.div`
	${({ theme, size, active, withBorders }: WrapperProps) => `
		height: ${theme.sizes.chip[size].height};
		display: inline-flex;
		justify-content: flex-start;
		align-items: center;	
		margin: ${
			size === 'large' ? theme.layout.spacing.half : theme.layout.spacing.half
		} 0;
		padding: ${
			withBorders
				? `0 ${
						size === 'large'
							? theme.layout.spacing.single
							: theme.layout.spacing.half
				  }`
				: ``
		};
		background-color: ${active ? theme.color.primary.muted : 'white'};
		border: ${withBorders ? `1px solid ${theme.color.primary.normal}` : ''};
		border-radius: 2px;
	`};
`

const TitleWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-center;
	align-items: flex-start;
`

interface TitleProps {
	theme: DefaultTheme
	size: string
}

const Title = styled.span`
	${({ theme, size }: TitleProps) => `
		font-size: ${size === 'small' ? theme.font.size.h5 : theme.font.size.h4};
		font-weight: ${
			size === 'small' ? theme.font.weight.semi : theme.font.weight.semi
		};
	`};
`

const Subtitle = styled.span`
	${({ theme, size }: TitleProps) => `
		font-size: ${theme.font.size.h5};
		display: ${size === 'large' ? 'block' : 'none'};
		color: ${theme.color.middleGray};
	`};
`

/**
 * Chip
 */

export interface ChipProps {
	size?: 'small' | 'large' | 'full'
	active?: boolean
}

interface Props {
	size?: 'small' | 'large' | 'full'
	active?: boolean
	title: string
	subtitle?: string | null
	onClick?: null | (() => any | (() => Promise<any>))
	to?: null | string
}

const noop = () => {}

export const Chip = ({
	title,
	subtitle,
	size: sizeProp,
	active,
	to,
	onClick: onClickProp,
}: Props) => {
	const as = to
		? // if 'to', use a Link
		  Link
		: // else, if 'onClick', use a button
		onClickProp
		? 'button'
		: undefined
	const size = sizeProp || 'small'

	const onClick = onClickProp || noop

	return (
		<Wrapper
			size={size}
			active={active || undefined}
			withBorders={Boolean(to || onClickProp)}
			as={as}
			to={to || undefined}
			onClick={onClick}
		>
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
	// image: null,
	subtitle: null,
}
