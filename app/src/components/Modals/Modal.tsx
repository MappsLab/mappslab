import * as React from 'react'
import styled, { css } from 'styled-components'

export const ModalInner = styled.div`
	${({ theme }) => css`
		background-color: white;
		border: 1px solid lightGray;
		border-radius: 4px;
		padding: 20px;
		box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
		z-index: ${theme.layout.z.modal};
		pointer-events: initial;
		margin: 50px auto;
	`};
`

export const ModalContainer = styled.div`
	${({ theme }) => css`
		${theme.mixins.fixedFullSize};
		${theme.mixins.flexCenter};
		z-index: ${theme.layout.z.modal};
		overflow-y: scroll;
		pointer-events: none;
	`};
`

type Props = {
	children: React.ReactNode
}

export const Modal = ({ children }: Props) => (
	<ModalContainer>
		<ModalInner>{children}</ModalInner>
	</ModalContainer>
)
