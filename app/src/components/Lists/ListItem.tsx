import * as React from 'react'
import { NodeType } from '../../types-ts'
import { ButtonConfig, ButtonDropdown } from './ButtonDropdown'
import { ListItemWrapper, ItemTitle, ItemInfo } from './styled'
import { getNodeTitle } from '../../utils'

/**
 * ListItem
 */

interface ListItemProps<N> {
	node: N
	info: string[]
	onClick: () => void | Promise<void>
	buttons?: ButtonConfig<N>[]
}

export const ListItem = <N extends NodeType>({
	onClick,
	node,
	info,
	buttons,
}: ListItemProps<NodeType>) => {
	const title = getNodeTitle(node)
	return (
		<ListItemWrapper onClick={onClick}>
			<ItemTitle>{title}</ItemTitle>
			{info && info.map((i) => <ItemInfo key={i}>{i}</ItemInfo>)}
			{buttons ? <ButtonDropdown item={node} buttons={buttons} /> : null}
		</ListItemWrapper>
	)
}
