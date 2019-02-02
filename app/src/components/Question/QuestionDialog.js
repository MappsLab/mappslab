// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import Pane from 'Components/Pane'
import { Button } from 'Components/Buttons'
import { P } from 'Components/Text'
import { QuestionConsumer } from './QuestionProvider'
import type { QuestionContext } from './QuestionProvider'

const Background = styled.div`
	${({ theme }) => css`
		z-index: ${theme.layout.z.alert};
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.15);
	`}
`

const BackgroundCancelButton = styled.button`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	opacity: 0;
`

const Buttons = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`

const Message = styled.div`
	${({ theme }) => css`
		margin: ${theme.layout.spacing.single} 0;
	`}
`

/**
 * Ask
 */

type QuestionDialogProps = QuestionContext

const defaultOptions = [
	{
		title: 'OK',
		level: 'primary',
		returnValue: true,
		answerQuestion: async () => true,
	},
]

const QuestionDialog = ({ currentQuestion, cancelQuestion }: QuestionDialogProps) => {
	if (!currentQuestion) return null
	const { title: paneTitle, message, options } = currentQuestion
	const questionOptions = options || defaultOptions
	return (
		<Background data-testid="alert">
			<BackgroundCancelButton onClick={cancelQuestion} />
			<Pane size="small" title={paneTitle}>
				<Message>
					<P align="center">{message}</P>
				</Message>
				<Buttons>
					{questionOptions.map(({ title, answerQuestion, ...buttonConfig }) => (
						<Button key={title} onClick={answerQuestion} {...buttonConfig}>
							{title}
						</Button>
					))}
				</Buttons>
			</Pane>
		</Background>
	)
}

export default () => <QuestionConsumer>{(questionProps) => <QuestionDialog {...questionProps} />}</QuestionConsumer>
