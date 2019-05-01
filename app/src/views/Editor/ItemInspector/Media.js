// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import { FaVideo, FaRegImage, FaTrashAlt } from 'react-icons/fa'
import NativeListener from 'react-native-listener'
import { useQuestion } from 'Components/Question'
import FileUpload from 'Components/FileUpload'
import { Prompt } from 'Components/Forms'
import type { ImageType, VideoType } from 'Types/Media'
import { Button } from 'Components/Buttons'
import { Image, Video } from 'Components/Media'

/**
 * Styles
 */

const MediaWrapper = styled.div`
	position: relative;
`

const ButtonWrapper = styled.div`
	${({ theme }) => css`
		position: absolute;
		top: ${theme.layout.spacing.single};
		right: ${theme.layout.spacing.single};
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.2s;
		z-index: 10;
		${MediaWrapper}:hover & {
			opacity: 1;
			pointer-events: initial;
		}
	`}
`

const MediaButtons = styled.div`
	display: flex;
	justify-content: center;
`

/**
 * Media
 */

type Props = {
	image?: ImageType,
	video?: VideoType,
	submitUpdate: ({ [key: string]: any }) => void | Promise<void>,
	viewerCanEdit?: boolean,
	alt?: string,
}

const Media = ({ image, video, viewerCanEdit, submitUpdate, alt }: Props) => {
	if (!viewerCanEdit && !image && !video) return null
	const { ask } = useQuestion()

	const askForVideo = async () => {
		const result = await ask({
			message: 'Enter the URL of a Youtube or Vimeo Video',
			render: (answer) => <Prompt answer={answer} name="video" label="Video URL" type="url" />,
		})
		if (!result.video) return
		submitUpdate({ video: result.video })
	}

	const remove = (key: string) => () => {
		submitUpdate({ [key]: null })
	}

	const removeLabel = image ? 'Remove Image' : 'Remove Video'
	const removeFn = image ? remove('image') : remove('video')
	return (
		<MediaWrapper>
			{viewerCanEdit && (image || video) ? (
				<ButtonWrapper>
					<NativeListener onClick={removeFn}>
						<Button tooltip={removeLabel} level="tertiary">
							<FaTrashAlt />
						</Button>
					</NativeListener>
				</ButtonWrapper>
			) : null}
			{image ? (
				<Image
					//
					image={image}
					alt={alt}
					size={600}
					submitUpdate={submitUpdate}
				/>
			) : video ? (
				<Video
					//
					video={video}
					submitUpdate={submitUpdate}
				/>
			) : null}
			{viewerCanEdit && !video && !image ? (
				<MediaButtons>
					<FileUpload onSubmit={submitUpdate} name="image" Icon={FaRegImage} label="Add Image" />
					<NativeListener onClick={askForVideo}>
						<Button level="tertiary">
							<FaVideo /> Add Video
						</Button>
					</NativeListener>
				</MediaButtons>
			) : null}
		</MediaWrapper>
	)
}

Media.defaultProps = {
	image: undefined,
	video: undefined,
	viewerCanEdit: false,
	alt: undefined,
}

export default Media
