// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import NativeListener from 'react-native-listener'
import type { PinType } from 'Types/Pin'
import FileUpload from 'Components/FileUpload'
import { Button } from 'Components/Buttons'
import { Prompt } from 'Components/Forms'
import { QuestionConsumer } from 'Components/Question'
import type { QuestionContext } from 'Components/Question'
import ToolTip from 'Components/ToolTip'
import { getVideoSrc, getBestSize } from 'Utils/media'
import config from '../../../config'

const MediaWrapper = styled.div`
	position: relative;
`

const VideoFrame = styled.div`
	padding-bottom: 56%;
	position: relative;

	> iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
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
 * PinMedia
 */

type BaseProps = {
	pin: PinType,
	submitUpdate: ({ [key: string]: any }) => void | Promise<void>,
	viewerCanEdit?: boolean,
	alt?: string,
}

type Props = BaseProps & {
	question: QuestionContext,
}

const PinMedia = ({ pin, viewerCanEdit, submitUpdate, alt, question }: Props) => {
	// this is kind of bad. here we're getting the 'middle' image. Instead, make a `getImageBySize` which gets the best match
	if (!viewerCanEdit && !pin.image) return null

	const removeImage = () => {
		submitUpdate({ image: null })
	}

	const askForVideo = async () => {
		const result = await question.ask({
			message: 'Enter the URL of a Youtube or Vimeo Video',
			render: (answer) => <Prompt answer={answer} name="video" label="Video URL" type="url" />,
		})
		const { video } = result
		if (!video) return
		submitUpdate({ video })
	}

	const removeVideo = () => {
		submitUpdate({ video: null })
	}

	const removeFn = pin.image ? removeImage : removeVideo
	// return null
	const removeLabel = pin.image ? 'Remove Image' : 'Remove Video'
	return pin.image || pin.video ? (
		<MediaWrapper>
			{viewerCanEdit && (
				<ButtonWrapper>
					<NativeListener onClick={removeFn}>
						<ToolTip message={removeLabel}>
							<Button level="tertiary">X</Button>
						</ToolTip>
					</NativeListener>
				</ButtonWrapper>
			)}
			{pin.image ? (
				<img alt={alt} src={`${config.imageBucketRoot}${getBestSize(pin.image, 600).uri}`} />
			) : pin.video ? (
				<VideoFrame>
					<iframe title={pin.title} src={getVideoSrc(pin.video).src} width="100%" height="100%" />
				</VideoFrame>
			) : null}
		</MediaWrapper>
	) : (
		<MediaButtons>
			<FileUpload onSubmit={submitUpdate} name="image" label="Add Image" />
			<NativeListener onClick={askForVideo}>
				<Button level="tertiary">Add Video</Button>
			</NativeListener>
		</MediaButtons>
	)
}

PinMedia.defaultProps = {
	viewerCanEdit: false,
	alt: '',
}

export default (baseProps: BaseProps) => (
	<QuestionConsumer>{(question) => <PinMedia {...baseProps} question={question} />}</QuestionConsumer>
)
