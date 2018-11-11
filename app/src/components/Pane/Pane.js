// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Header1, Header5 } from 'Components/Text'

const Wrapper = styled.div`
	${({ theme }) => `
		background-color: white;
		box-shadow: ${theme.mixins.boxShadow.heavy};
		border-radius: 2px;
		border: 1px solid ${theme.color.darkGray};
		position: relative;
	`};
`

const Title = styled.div`
	${({ theme, size }) => `
		border-bottom: 1px solid ${theme.color.darkGray};
		height: ${size === 'full' ? '60px' : '60px'};
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	`};
`

const TitleText = styled.div``

const Content = styled.div`
	${({ theme, size }) => `
		display: flex;
		flex-direction: column;
		justify-content: ${size === 'full' ? 'flex-start' : 'center'};
		padding: ${size === 'small' ? theme.layout.spacing.single : theme.layout.spacing.triple};
		height: ${size === 'full' ? 'calc(85vh - 60px)' : 'auto'};
		min-height: ${size === 'small' ? 'auto' : '300px'};
		width: ${size === 'full' ? '650px' : size === 'small' ? '320px' : '425px'};
		position: relative;
	`};
`

const TitleIcon = styled(Header1)`
	${({ theme }) => `
		margin-right: 0.2em;
		font-size: calc(${theme.font.size.h1} + 4px);
		vertical-align: middle;
	`};
`

/**
 * Pane
 */

type Props = {
	title?: string,
	subtitle?: string,
	icon?: string,
	children: React.Node,
	size?: 'small' | 'normal' | 'full',
}

const Pane = ({ title, subtitle, children, icon, size }: Props) => {
	return (
		<Wrapper size={size}>
			{title && (
				<Title size={size}>
					{icon && <TitleIcon>{icon}</TitleIcon>}
					<TitleText>
						<Header1 align="center">{title}</Header1>
						{subtitle && <Header5 color="middleGray">{subtitle}</Header5>}
					</TitleText>
				</Title>
			)}
			<Content direction="column" size={size}>
				{children}
			</Content>
		</Wrapper>
	)
}

Pane.defaultProps = {
	title: undefined,
	subtitle: undefined,
	icon: undefined,
	size: 'normal',
}

export default Pane
