import * as React from 'react'
import styled, { css } from 'styled-components'
import { FaVideo, FaRegImage, FaTrashAlt } from 'react-icons/fa'
import NativeListener from 'react-native-listener'
import { useQuestion } from '../Question'
import FileUpload from '../FileUpload'
import { Prompt } from '../Forms'
import { Image as ImageType, Video as VideoType } from '../../types-ts'
import { Button } from '../Buttons'
import { Image, Video } from '../Media'
import { Header2 } from 'Components/Text'

/**
 * Styles
 */

const MediaWrapper = styled.div`
	${({ theme }) => css`
		background-color: ${theme.color.lightGray};
		min-height: 30px;
		position: relative;
	`}
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

interface Props {
	image?: Image
	imageName?: string
	enableImage?: boolean
	video?: Video
	videoName?: string
	enableVideo?: boolean
	submitUpdate: (formData: { [key: string]: any }) => void | Promise<void>
	viewerCanEdit?: boolean
	alt?: string
	label?: string
}

export const EditableMedia = ({
	image,
	enableImage,
	imageName,
	video,
	videoName,
	enableVideo,
	viewerCanEdit,
	submitUpdate,
	alt,
	label,
}: Props) => {
	if (!viewerCanEdit && !image && !video) return null
	const { ask } = useQuestion()

	const askForVideo = async () => {
		const result = await ask({
			message: 'Enter the URL of a Youtube or Vimeo Video',
			render: (answer) => <Prompt answer={answer} name="video" label="Video URL" type="url" />,
		})
		if (!result.video) return
		submitUpdate({ [videoName]: result.video })
	}

	const remove = (key: string) => () => {
		submitUpdate({ [key]: null })
	}

	const removeLabel = image ? 'Remove Image' : 'Remove Video'
	const removeFn = image ? remove(imageName || 'image') : remove('video')
	return (
		<React.Fragment>
			{label && <Header2>{label}</Header2>}
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
				{image && enableImage ? (
					<Image
						//
						image={image}
						alt={alt}
						size={600}
						submitUpdate={submitUpdate}
					/>
				) : video && enableVideo ? (
					<Video
						//
						video={video}
						submitUpdate={submitUpdate}
					/>
				) : null}
				{viewerCanEdit && !video && !image ? (
					<MediaButtons>
						{enableImage && <FileUpload onSubmit={submitUpdate} name={imageName} Icon={FaRegImage} label="Add Image" />}
						{enableVideo && (
							<NativeListener onClick={askForVideo}>
								<Button level="tertiary">
									<FaVideo /> Add Video
								</Button>
							</NativeListener>
						)}
					</MediaButtons>
				) : null}
			</MediaWrapper>
		</React.Fragment>
	)
}

EditableMedia.defaultProps = {
	image: undefined,
	imageName: 'image',
	enableImage: true,
	video: undefined,
	videoName: 'video',
	enableVideo: true,
	viewerCanEdit: false,
	alt: undefined,
}
