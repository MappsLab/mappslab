import * as React from 'react'
import styled, { css } from 'styled-components'
import { FaVideo, FaRegImage, FaTrashAlt, FaFileUpload } from 'react-icons/fa'
import NativeListener from 'react-native-listener'
import { useQuestion } from '../Question'
import { FileUpload } from '../FileUpload'
import { Prompt } from '../Forms'
import { Image as ImageType, Video as VideoType } from '../../types-ts'
import { Button } from '../Buttons'
import { Image, Video } from '../Media'
import { Header2 } from '../Text'

const { useState } = React

/**
 * Styles
 */

interface MediaWrapperProps {
	onClick?: () => void
}

const MediaWrapper = styled.div`
	${({ theme, onClick }) => css`
		border: 1px solid ${theme.color.lightGray};
		border-radius: 2px;
		min-height: 30px;
		position: relative;
		cursor: ${onClick ? 'pointer' : 'inherit'};
		img,
		video {
			display: block;
		}
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
	flex-direction: column;
`

/**
 * Media
 */

type MediaSubmission = (data: { [key: string]: any }) => void | Promise<void>

interface Props {
	image?: ImageType | null
	imageName: string
	enableImage?: boolean
	validateImage?: (file: File) => Promise<string | void>
	video?: VideoType | null
	videoName: string
	enableVideo?: boolean
	enableImageUrl?: boolean
	imageUrl?: string | null
	imageUrlName: string
	submitUpdate: (formData: any) => void | Promise<void>
	viewerCanEdit?: boolean
	alt?: string
	label?: string
	onClick?: () => void
}

export const EditableMedia = ({
	image,
	enableImage,
	imageName,
	validateImage,
	video,
	videoName,
	enableVideo,
	imageUrl,
	imageUrlName,
	enableImageUrl,
	viewerCanEdit,
	submitUpdate,
	alt,
	label,
	onClick,
}: Props) => {
	if (!viewerCanEdit && !image && !video && !imageUrl) return null
	const { ask } = useQuestion()
	const [loading, setLoading] = useState(false)

	const handleImageSubmit = async (args: MediaSubmission) => {
		setLoading(true)
		await submitUpdate(args)
		setLoading(false)
	}
	const askForVideo = async () => {
		const result = await ask({
			message: 'Enter the URL of a Youtube or Vimeo Video',
			render: (answer: () => Promise<void>) => (
				<Prompt answer={answer} name="video" label="Video URL" type="url" />
			),
		})
		if (!result.video) return
		await submitUpdate({ [videoName]: result.video })
	}

	const askForIamgeUrl = async () => {
		const result = await ask({
			message: 'Enter the URL of an image',
			render: (answer: () => Promise<void>) => (
				<Prompt answer={answer} name="image" label="Image URL" type="url" />
			),
		})
		if (!result.image) return
		await submitUpdate({ [imageUrlName]: result.image })
	}

	const remove = (key: string) => async () => {
		await submitUpdate({ [key]: null })
	}

	const removeLabel = image ? 'Remove Image' : 'Remove Video'
	const removeFn = image ? remove(imageName || 'image') : remove('video')

	return (
		<React.Fragment>
			{label && <Header2>{label}</Header2>}
			<MediaWrapper onClick={onClick}>
				{viewerCanEdit && (image || video || imageUrl) ? (
					<ButtonWrapper>
						<NativeListener onClick={removeFn}>
							<Button tooltip={removeLabel} level="tertiary">
								<FaTrashAlt />
							</Button>
						</NativeListener>
					</ButtonWrapper>
				) : null}
				{image && enableImage && <Image image={image} alt={alt} size={600} />}
				{video && enableVideo && <Video video={video} />}
				{imageUrl && enableImageUrl && <img src={imageUrl} alt={alt} />}
				{viewerCanEdit && !video && !image && !imageUrl && (
					<MediaButtons>
						{enableImage && (
							<FileUpload
								onSubmit={handleImageSubmit}
								accept="image/*"
								name={imageName}
								icon={FaFileUpload}
								validate={validateImage}
								label={loading ? 'Loading..' : 'Upload Image'}
							/>
						)}
						{enableImageUrl && (
							<NativeListener onClick={askForIamgeUrl}>
								<Button level="tertiary">
									<FaRegImage /> Add Image
								</Button>
							</NativeListener>
						)}
						{enableVideo && (
							<NativeListener onClick={askForVideo}>
								<Button level="tertiary">
									<FaVideo /> Add Video
								</Button>
							</NativeListener>
						)}
					</MediaButtons>
				)}
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
	enableImageUrl: true,
	imageUrlName: 'imageUrl',
	alt: undefined,
}
