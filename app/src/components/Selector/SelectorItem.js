// @flow
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
	${({ theme, active }) => `
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
		return `
			width: calc(${width});
			height: calc(${width});
			margin-right: 5px;
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
	${({ theme }) => `
		font-size: ${theme.font.size.h4};
		font-weight: 500;
	`};
`

/**
 * SelectorItem
 */

export type SelectorItemProps = {
	active?: boolean,
}

type Props = {
	active?: boolean,
	image?: string | null,
	title: string,
}

const SelectorItem = ({ image, title, active }: Props) => {
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

export default SelectorItem
