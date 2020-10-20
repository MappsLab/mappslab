import * as React from 'react'
import NativeListener from 'react-native-listener'
import styled, { css } from 'styled-components'
import { CloseButton } from './styled'
import { Image, Video } from '../../../components/Media'
import { Button } from '../../../components/Buttons'
import { Pin } from '../../../types-ts'

const { useEffect } = React
const OFFSET = '30px'

const Background = styled.button`
	${({ theme }) => css`
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
		background-color: rgba(0, 0, 0, 0.2);
	`}
`

const Outer = styled.div`
	${({ theme }) => css`
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: ${theme.layout.z.modal};
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	`}
`

const ButtonWrapper = styled.div`
	position: absolute;
	top: 10px;
	right: 10px;
`

const MediaModalWrapper = styled.div`
	${({ theme }) => css`
		background-color: white;
		z-index: 20;
		border-radius: 2px;
		position: relative;
		max-width: calc(100% - (${OFFSET} * 2));
		max-height: calc(100% - (${OFFSET} * 2));
		padding: ${theme.layout.spacing.triple};
		padding-bottom: ${theme.layout.spacing.half};
		display: flex;
		flex-direction: column;
		justify-content: center;
	`}
`

const MediaWrapper = styled.div`
	${({ theme }) => css`
		margin-bottom: ${theme.layout.spacing.half};
		max-height: calc(100% - (${OFFSET} * 2));
		> * {
			max-height: 100%;
			margin: 0 auto;
			display: block;
		}
	`}
`
interface MediaModalProps {
	pin: Pin
	close: () => void
}

export const MediaModal = ({ pin, close }: MediaModalProps) => {
	const { image, imageUrl } = pin

	const handleKeyUp = (e: KeyboardEvent) => {
		if (e.key === 'Escape') close()
	}

	useEffect(() => {
		window.addEventListener('keyup', handleKeyUp)
		return () => window.removeEventListener('keyup', handleKeyUp)
	}, [])

	if (!image && !imageUrl) return null

	return (
		<Outer>
			<MediaModalWrapper>
				<ButtonWrapper>
					<NativeListener onClick={close}>
						<CloseButton level="tertiary" />
					</NativeListener>
				</ButtonWrapper>
				<MediaWrapper>
					{image ? (
						<Image image={image} size={1600} />
					) : imageUrl ? (
						<img src={imageUrl} />
					) : null}
				</MediaWrapper>
				<Button level="tertiary" onClick={close}>
					Close
				</Button>
			</MediaModalWrapper>
			<Background />
		</Outer>
	)
}
