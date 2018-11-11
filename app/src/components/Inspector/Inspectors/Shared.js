// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Header1, Header4 } from 'Components/Text'
import ItemIcon from '../ItemIcon'

/**
 * InspectorTitle
 */

const Wrapper = styled.div`
	${({ theme }) => `
		margin-bottom: ${theme.layout.spacing.triple};
	`}
`

const Title = styled(Header1)`
	margin-bottom: 0.1em;
	text-align: center;
`

const Subtitle = styled(Header4)`
	${({ theme }) => `
		text-align: center;
		color: ${theme.color.middleGray};
	`}
`

type Props = {
	title: string,
	type: string,
	//  icon?: string,
	subtitle?: string,
}

export const InspectorTitle = ({ type, title, subtitle }: Props) => (
	<Wrapper>
		<Title>
			<ItemIcon type={type} />
			{title}
		</Title>
		{subtitle && <Subtitle>{subtitle}</Subtitle>}
	</Wrapper>
)

InspectorTitle.defaultProps = {
	subtitle: undefined,
}
