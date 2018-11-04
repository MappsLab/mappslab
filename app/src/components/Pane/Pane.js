// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Header1 } from 'Components/Text'
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
		border-bottom: 1px solid ${theme.color.darkGray}
	`};
`

const Content = styled(FlexContainer)`
	${({ theme }) => `
		padding: ${theme.layout.spacing.double} ${theme.layout.spacing.single};
		min-height: 300px;
	`};
`

/**
 * Pane
 */

type Props = {
	title?: string,
	children: React.Node,
}

const Pane = ({ title, children }: Props) => {
	return (
		<Column>
			<Wrapper>
				{title && (
					<Title>
						<Header1 align="center">{title}</Header1>
					</Title>
				)}
				<Content direction="column">{children}</Content>
			</Wrapper>
		</Column>
	)
}

Pane.defaultProps = {
	title: undefined,
}

export default Pane
