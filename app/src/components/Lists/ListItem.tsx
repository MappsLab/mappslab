import * as React from 'react'
import { Node } from '../../types-ts'
import { ButtonConfig, ButtonDropdown } from './ButtonDropdown'
import { ListItemWrapper, ItemTitle, ItemInfo } from './styled'

/**
 * ListItem
 */

interface ListItemProps<NodeType> {
	node: NodeType
	info: Array<string>
	onClick: () => void | Promise<void>
	buttons?: ButtonConfig<NodeType>[]
}

export const ListItem = <NodeType extends Node>({
	onClick,
	node,
	info,
	buttons,
}: ListItemProps<NodeType>) => {
	return (
		<ListItemWrapper onClick={onClick}>
			<ItemTitle>{node.title || node.name || 'Untitled'}</ItemTitle>
			{info && info.map((i) => <ItemInfo key={i}>{i}</ItemInfo>)}
			{buttons ? <ButtonDropdown item={node} buttons={buttons} /> : null}
		</ListItemWrapper>
	)
}
