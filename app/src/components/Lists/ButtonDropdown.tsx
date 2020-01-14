import * as React from 'react'
import styled, { css } from 'styled-components'
import { Node } from '../../types-ts'
import { DotButton } from '../DotButton'

const { useState, useEffect, useRef } = React

const Wrapper = styled.div`
	position: relative;
`

const ButtonsWrapper = styled.div`
	${({ theme }) => css`
		z-index: ${theme.layout.z.menuOverlay};
		background-color: white;
		position: absolute;
		right: 8px;
		top: 2px;
		border-radius: ${theme.mixins.borderRadius};
		box-shadow: ${theme.mixins.boxShadow.heavy};
	`}
`

const Button = styled.button`
	${({ theme }) => css`
		color: ${theme.color.gray};
		padding: ${theme.layout.spacing.half};
		font-size: ${theme.font.size.h5};

		&:hover {
			background-color: ${theme.color.xLightGray};
		}

		& + & {
			border-top: 1px solid ${theme.color.lightGray};
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
	const wrapperElement = useRef<HTMLDivElement>(null)
	const [isOpen, setOpen] = useState(false)
	const openMenu = () => setOpen(true)
	const closeMenu = () => setOpen(false)

	const handleClick = (handler: Handler<NodeType>) => async () => {
		await handler(item)
		closeMenu()
	}

	const handleClickOutside = (e: MouseEvent) => {
		// @ts-ignore
		const path = e.composedPath()
		if (!path.some((el) => el === wrapperElement.current)) {
			closeMenu()
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside)
		return () => document.removeEventListener('click', handleClickOutside)
	})

	return (
		<Wrapper ref={wrapperElement}>
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
