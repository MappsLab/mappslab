// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import type { VideoType } from 'Types/Media'
import { getVideoInfo } from 'Utils/media'

const VideoFrame = styled.div`
	${({ ratio }) => css`
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

type Props = {
	video: VideoType,
	ratio?: number,
	title?: string,
}

const Video = ({ video, title, ratio }: Props) => (
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

export default Video
