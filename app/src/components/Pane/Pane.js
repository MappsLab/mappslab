// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Header1, Header5 } from 'Components/Text'
import { FlexContainer, Column } from 'Components/Layout'

const Wrapper = styled.div`
	${({ theme }) => `
		background-color: white;
		box-shadow: ${theme.mixins.boxShadow.heavy};
		border-radius: 2px;
		border: 1px solid ${theme.color.darkGray};
	`};
`

const Title = styled.div`
	${({ theme }) => `
		padding: ${theme.layout.spacing.single};
		border-bottom: 1px solid ${theme.color.darkGray};
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	`};
`

const TitleText = styled.div``

const Content = styled(FlexContainer)`
	${({ theme }) => `
		padding: ${theme.layout.spacing.double} ${theme.layout.spacing.single};
		min-height: 300px;
	`};
`

const TitleIcon = styled(Header1)`
	${({ theme }) => `
		margin-right: 0.2em;
		font-size: calc(${theme.text.size.h1} + 4px);
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
}

const Pane = ({ title, subtitle, children, icon }: Props) => {
	return (
		<Column>
			<Wrapper>
				{title && (
					<Title>
						{icon && <TitleIcon>{icon}</TitleIcon>}
						<TitleText>
							<Header1 align="center">{title}</Header1>
							{subtitle && <Header5 color="middleGray">{subtitle}</Header5>}
						</TitleText>
					</Title>
				)}
				<Content direction="column">{children}</Content>
			</Wrapper>
		</Column>
	)
}

Pane.defaultProps = {
	title: undefined,
	subtitle: undefined,
	icon: undefined,
}

export default Pane
