import * as React from 'react'
import styled, { css } from 'styled-components'
import ReactDOM from 'react-dom'
import { useState } from 'react'

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
		min-width: 70%;
		position: relative;
	`};
`

type ModalContainerProps = {
	visible: boolean
}

export const ModalContainer = styled.div<ModalContainerProps>`
	${({ theme, visible }) => css`
		${theme.mixins.fixedFullSize};
		${theme.mixins.flexCenter};
		z-index: ${theme.layout.z.modal};
		overflow-y: scroll;
		pointer-events: none;
		display: ${!visible ? 'none' : undefined};
	`};
`

const CloseButton = styled.button`
	padding: 10px 20px;
	background: #dadada;
	margin-top: 15px;
	float: right;
	font-size: 1.2em;
`
const PreviewContainer = styled.div`
	position: relative;
`

const PreviewOverlay = styled.button`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`

const Preview = styled.div`
	pointer-events: none;
`

type Props = {
	initiallyVisible?: boolean
}

export const Modal = ({
	children,
	initiallyVisible,
}: React.PropsWithChildren<Props>) => {
	const [visible, setVisible] = useState(Boolean(initiallyVisible))

	const modalRoot = document.getElementById('root')

	if (!modalRoot) throw new Error('Could not find element with id "#root"')

	return (
		<PreviewContainer>
			<PreviewOverlay aria-label="Open" onClick={() => setVisible(true)} />
			<Preview>{children}</Preview>
			{ReactDOM.createPortal(
				<ModalContainer visible={visible}>
					<ModalInner>
						{children}
						<CloseButton aria-label="Close" onClick={() => setVisible(false)}>
							Close
						</CloseButton>
					</ModalInner>
				</ModalContainer>,
				modalRoot,
			)}
		</PreviewContainer>
	)
}
