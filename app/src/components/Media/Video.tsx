import * as React from 'react'
import styled, { css } from 'styled-components'
import { getVideoInfo } from '../../utils/media'

interface VideoFrameProps {
	ratio?: number
}

const VideoFrame = styled.div`
	${({ ratio }: VideoFrameProps) => css`
		padding-bottom: ${ratio ? `${ratio * 100}%` : '56%'};
		position: relative;

		> iframe {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
	`}
`

interface VideoProps {
	video: string
	ratio?: number
	title?: string
}

export const Video = ({ video, title, ratio }: VideoProps) => (
	<VideoFrame ratio={ratio}>
		<iframe
			title={title || ''}
			src={getVideoInfo(video).src}
			width="100%"
			height="100%"
		/>
	</VideoFrame>
)

Video.defaultProps = {
	ratio: undefined,
	title: undefined,
}
