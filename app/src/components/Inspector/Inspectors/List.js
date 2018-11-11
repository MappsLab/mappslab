// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Header2, Header5 } from 'Components/Text'
import ItemIcon from '../ItemIcon'

const ListTitle = styled(Header2)`
	${({ theme }) => `
		color: ${theme.color.primary.light}
	`}
`

const ListWrapper = styled.div`
	${({ theme }) => `
		margin-top: ${theme.layout.spacing.quadruple};
	`}
`

const ListItem = styled.div`
	${({ theme }) => `
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

export type ListItemType = {
	key: string,
	title: string,
	info: Array<string>,
	onClick: () => void,
}

type Props = {
	items: Array<ListItemType>,
	title: string,
	type: string,
}

/**
 * List
 */

const List = ({ items, title, type }: Props) => (
	<ListWrapper>
		<ListTitle>
			<ItemIcon type={type} />
			{title}
		</ListTitle>
		{items.map(({ key, title: itemTitle, info, onClick }) => (
			<ListItem key={key} onClick={onClick}>
				<ItemTitle>{itemTitle}</ItemTitle>
				{info.map((i) => (
					<ItemInfo key={i}>{i}</ItemInfo>
				))}
			</ListItem>
		))}
	</ListWrapper>
)

export default List
