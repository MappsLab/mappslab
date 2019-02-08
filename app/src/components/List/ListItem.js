// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import { Header5 } from 'Components/Text'
import type { ListItem as ListItemType } from './utils'

/**
 * ListItem
 */

const Wrapper = styled.button`
	${({ theme }) => css`
		display: flex;
		justify-content: space-between;
		padding: ${theme.layout.spacing.half} ${theme.layout.spacing.half};
		border-top: 1px solid ${theme.color.middleGray};

		&:hover {
			background-color: ${theme.color.xLightGray};
		}

		&:last-child {
			border-bottom: 1px solid ${theme.color.middleGray};
		}
	`}
`

const ItemTitle = styled(Header5)`
	${({ theme }) => `
		font-weight: ${theme.font.weight.semi};
	`}
`

const ItemInfo = styled(Header5)`
	${({ theme }) => `
		color: ${theme.color.middleGray};
	`}
`

const ListItem = ({ onClick, node, info }: ListItemType) => (
	<Wrapper onClick={onClick}>
		<ItemTitle>{node.title || node.name}</ItemTitle>
		{info && info.map((i) => <ItemInfo key={i}>{i}</ItemInfo>)}
	</Wrapper>
)

export default ListItem
