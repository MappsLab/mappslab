// @flow
import * as React from 'react'
import type { ListItem as ListItemType } from './utils'
import { ListItemWrapper, ItemTitle, ItemInfo } from './styled'

/**
 * ListItem
 */

const ListItem = ({ onClick, node, info }: ListItemType) => (
	<ListItemWrapper onClick={onClick}>
		<ItemTitle>{node.title || node.name}</ItemTitle>
		{info && info.map((i) => <ItemInfo key={i}>{i}</ItemInfo>)}
	</ListItemWrapper>
)

export default ListItem
