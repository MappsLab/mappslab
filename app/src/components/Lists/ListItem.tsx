import * as React from 'react'
import { Diff } from 'utility-types'
import { ListItem as ListItemType } from './utils'
import { ListItemWrapper, ItemTitle, ItemInfo } from './styled'

/**
 * ListItem
 */

type Props = Diff<ListItemType, { key: string }>

export const ListItem = ({ onClick, node, info }: Props) => (
	<ListItemWrapper onClick={onClick}>
		<ItemTitle>{node.title || node.name}</ItemTitle>
		{info && info.map((i) => <ItemInfo key={i}>{i}</ItemInfo>)}
	</ListItemWrapper>
)
