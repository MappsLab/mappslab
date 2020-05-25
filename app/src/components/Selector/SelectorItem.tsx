import React from 'react'
import styled, { css, DefaultTheme } from 'styled-components'

interface WrapperProps {
	active?: boolean
	theme: DefaultTheme
}

const Wrapper = styled.div`
	${({ theme, active }: WrapperProps) => css`
		width: 100%;
		height: ${theme.sizes.chip.large.height};
		display: flex;
		justify-content: flex-start;
		align-items: center;
		background-color: ${active ? theme.color.primary.muted : 'white'};
		padding: 0 ${theme.layout.spacing.single};
	`};
`

const ImageWrapper = styled.figure`
	${({ theme }) => {
		const width = `${theme.sizes.chip.large.height} - 18px`
		return css`
			width: calc(${width});
			height: calc(${width});
			margin-right: 5px;
			border-radius: calc(${width} / 2);
			overflow: hidden;

			> img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		`
	}};
`

const TitleWrapper = styled.div`
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-center;
	display: flex;
`

const Title = styled.div`
	${({ theme }) => css`
		font-size: ${theme.font.size.h4};
		font-weight: 500;
	`};
`

/**
 * SelectorItem
 */

export interface SelectorItemProps {
	active?: boolean
	image?: string | null
	title: string
}

export const SelectorItem = ({ title, active }: SelectorItemProps) => {
	return (
		<Wrapper active={active || undefined}>
			<ImageWrapper>
				<img src="https://media0.giphy.com/media/1wnZQRxFfbKHnSIEIS/giphy.webp" />
			</ImageWrapper>
			<TitleWrapper>
				<Title>{title}</Title>
			</TitleWrapper>
		</Wrapper>
	)
}

SelectorItem.defaultProps = {
	active: false,
	image: null,
}
