// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Header2, Header4 } from 'Components/Text'

const ListTitle = styled(Header2)`
	${({ theme }) => `
		color: ${theme.color.primary.light}
	`}
`

const ListWrapper = styled.div``

const ListItem = styled.button`
	display: flex;
	justify-content: space-between;
`

const ItemTitle = styled(Header4)`
	${({ theme }) => `
		font-weight: ${theme.font.weight.semi};
	`}
`

const ItemInfo = styled(Header4)`
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
}

/**
 * List
 */

const List = ({ items, title }: Props) => (
	<ListWrapper>
		<ListTitle>{title}</ListTitle>
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
