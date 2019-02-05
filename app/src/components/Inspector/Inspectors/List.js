// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Header2, Header5 } from 'Components/Text'
import type { ClassroomType, UserType, MapType } from 'Types'
import ItemIcon from '../ItemIcon'
import { InspectorConsumer } from '../InspectorProvider'
import type { InspectorItem, InspectItem } from '../InspectorProvider'

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

const ListItem = styled.button`
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

/**
 * List
 */

export type ListItemType = {
	key: string,
	itemTitle: string,
	info?: Array<string>,
	onClick: (InspectorItem) => void,
}

type BaseProps = {
	items: Array<ListItemType>,
	title: string,
	type: string,
}

type Props = BaseProps & {
	inspectItem: InspectItem,
}

const listItemFactory = (inspectItem: InspectItem) => (item: ClassroomType | UserType | MapType): ListItem => {
	// $FlowFixMe TODO: make this detect types
	const { uid, title, name, __typename } = item
	return {
		key: uid,
		itemTitle: title || name,
		onClick: () => inspectItem({ uid, type: __typename.toLowerCase(), title: title || name }),
		info: [],
	}
}

export const List = ({ items, title, type, inspectItem }: Props) => {
	const itemToListItem = listItemFactory(inspectItem)
	return (
		<ListWrapper>
			<ListTitle>
				<ItemIcon type={type} />
				{title}
			</ListTitle>
			{items.map(itemToListItem).map(({ key, itemTitle, info, onClick }) => (
				<ListItem key={key} onClick={onClick}>
					<ItemTitle>{itemTitle}</ItemTitle>
					{info.map((i) => (
						<ItemInfo key={i}>{i}</ItemInfo>
					))}
				</ListItem>
			))}
		</ListWrapper>
	)
}

export default (baseProps: BaseProps) => (
	<InspectorConsumer>{({ inspectItem }) => <List {...baseProps} inspectItem={inspectItem} />}</InspectorConsumer>
)
