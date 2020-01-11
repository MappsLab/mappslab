import * as React from 'react'
import styled, { css } from 'styled-components'
import { Node } from '../../types-ts'
import { DotButton } from '../DotButton'

const { useState, useEffect } = React

const Wrapper = styled.div`
	position: relative;
`

const ButtonsWrapper = styled.div`
	${({ theme }) => css`
		z-index: ${theme.layout.z.menuOverlay};
		background-color: white;
		position: absolute;
		right: 0;
		top: 0;
		border-radius: ${theme.mixins.borderRadius};
		box-shadow: ${theme.mixins.boxShadow.heavy};
	`}
`

const Button = styled.button`
	${({ theme }) => css`
		color: ${theme.color.gray};
		&:hover {
			background-color: ${theme.color.lightGray};
		}
	`}
`

type Handler<NodeType> = (item: NodeType) => void | Promise<void>

export interface ButtonConfig<NodeType> {
	label: string
	handler: Handler<NodeType>
}

interface ButtonDropdownProps<NodeType> {
	buttons: ButtonConfig<NodeType>[]
	item: NodeType
	/* */
}

export const ButtonDropdown = <NodeType extends Node>({
	buttons,
	item,
}: ButtonDropdownProps<NodeType>) => {
	const [isOpen, setOpen] = useState(false)
	const openMenu = () => setOpen(true)
	const closeMenu = () => setOpen(false)

	const handleClick = (handler: Handler<NodeType>) => async () => {
		await handler(item)
		closeMenu()
	}

	return (
		<Wrapper>
			<DotButton onClick={openMenu} />
			{isOpen ? (
				<ButtonsWrapper>
					{buttons.map(({ label, handler }) => (
						<Button onClick={handleClick(handler)} key={label}>
							{label}
						</Button>
					))}
				</ButtonsWrapper>
			) : null}
		</Wrapper>
	)
}
