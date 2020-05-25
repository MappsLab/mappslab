import * as React from 'react'
import styled, { css } from 'styled-components'
import NativeListener from 'react-native-listener'
import { Pane } from '../Pane'
import { Button } from '../Buttons'
import { P } from '../Text'
import { QuestionContext, QuestionConsumer } from './QuestionProvider'
import { definitely } from '../../utils'

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

type QuestionDialogProps = QuestionContext<any>

const QuestionDialogBase = ({
	currentQuestion,
	cancelQuestion,
	answer,
}: QuestionDialogProps) => {
	if (!currentQuestion) return null
	const { title: paneTitle, message, options, render } = currentQuestion

	return (
		<Background data-testid="alert">
			<BackgroundCancelButton onClick={cancelQuestion} />
			<Pane size="small" title={paneTitle}>
				{message.length && (
					<Message>
						<P align="center">{message}</P>
					</Message>
				)}
				{render ? (
					render(answer)
				) : (
					<Buttons>
						{definitely(options).map(
							({ title, answerQuestion, ...buttonConfig }) => (
								<Button key={title} onClick={answerQuestion} {...buttonConfig}>
									{title}
								</Button>
							),
						)}
					</Buttons>
				)}
			</Pane>
		</Background>
	)
}

export const QuestionDialog = () => (
	<QuestionConsumer>
		{(questionProps) => <QuestionDialogBase {...questionProps} />}
	</QuestionConsumer>
)
