// @flow
import React from 'react'
import styled from 'styled-components'
import { Header2, Header3 } from '../Text'

export const HR = styled.hr`
	border-bottom: 1px solid ${({ theme }) => theme.color.gray};
`

const ListItemWrapper = styled.div`
	padding: ${({ theme }) => theme.layout.spacing.single};
	margin: 0 ${({ theme }) => theme.layout.spacing.double};
	border-bottom: 1px solid ${({ theme }) => theme.color.gray};
`

type Props = {
	title: string,
	line1?: string,
	line2?: string,
}

export const ListItem = ({ title, line1, line2 }: Props) => (
	<ListItemWrapper>
		<Header2 marginBottom="0px">{title}</Header2>
		{line1 && line1.length && <Header3 color="lightGray">{line1}</Header3>}
		{line2 && line2.length && <Header3 color="lightGray">{line2}</Header3>}
	</ListItemWrapper>
)

ListItem.defaultProps = {
	line1: '',
	line2: '',
}
