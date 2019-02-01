// @flow
/* eslint-disable no-undef */
import * as React from 'react'
import { fireEvent, wait } from 'react-testing-library'
import { render } from 'Jest/utils'
import { QuestionProvider, QuestionConsumer, QuestionDialog } from 'Components/Question'
import type { QuestionContext } from 'Components/Question/QuestionProvider'

const QuestionWrapper = ({ children }: { children: (QuestionContext) => React.Node }) => (
	<QuestionProvider>
		<QuestionConsumer>{children}</QuestionConsumer>
	</QuestionProvider>
)

const BasicQuestion = () => (
	<QuestionWrapper>
		{({ ask }: QuestionContext) => (
			<React.Fragment>
				<QuestionDialog />
				<button
					type="button"
					data-testid="button"
					onClick={() => {
						ask({ message: 'are you sure?', options: [{ title: 'YES' }, { title: 'NO', level: 'secondary' }] })
					}}
				>
					click?
				</button>
			</React.Fragment>
		)}
	</QuestionWrapper>
)

describe('Question Component', () => {
	it('Mounts Correctly', () => {
		const { container } = render(<BasicQuestion />)
		expect(container).toMatchSnapshot()
	})

	it('should render its children', async () => {
		const { getByTestId } = render(<BasicQuestion />)
		expect(getByTestId('button')).toHaveTextContent('click?')
	})

	it('should not render a <QuestionDialog> by default', async () => {
		const { queryByTestId } = render(<BasicQuestion />)
		expect(queryByTestId('alert')).toBeFalsy()
	})

	it('should render an <QuestionDialog> when a consumer calls `ask`', async () => {
		const { queryByTestId, queryByText, getByTestId } = render(<BasicQuestion />)
		const button = getByTestId('button')
		expect(queryByTestId('alert')).toBeFalsy()
		fireEvent.click(button)
		expect(queryByTestId('alert')).toBeTruthy()
		expect(queryByText('are you sure?')).toBeTruthy()
		expect(queryByText('YES')).toBeTruthy()
		expect(queryByText('NO')).toBeTruthy()
	})

	it('should return the value provided by the config when `answerQuestion` is called on an option', async () => {
		const reportAnswer = jest.fn()
		const { getByTestId } = render(
			<QuestionWrapper>
				{({ ask }: QuestionContext) => (
					<React.Fragment>
						<QuestionConsumer>
							{({ currentQuestion }) => {
								if (!currentQuestion || !currentQuestion.options) return null
								return (
									<React.Fragment>
										{currentQuestion.options.map(({ answerQuestion, title, testId }) => (
											/* Here we are also testing that custom props like testId can be passed through */
											<button key={testId} type="button" data-testid={testId} onClick={answerQuestion}>
												{title}
											</button>
										))}
									</React.Fragment>
								)
							}}
						</QuestionConsumer>
						<button
							type="button"
							data-testid="askButton"
							onClick={async () => {
								const answer = await ask({
									message: 'are you sure?',
									options: [
										{ title: 'YES', testId: 'yah', returnValue: true },
										{ title: 'NO', testId: 'nah', returnValue: false },
									],
								})
								reportAnswer(answer)
							}}
						>
							click?
						</button>
					</React.Fragment>
				)}
			</QuestionWrapper>,
		)
		const askButton = getByTestId('askButton')
		/* open the dialog */
		fireEvent.click(askButton)

		/* answer yah */
		const yahButton = getByTestId('yah')
		fireEvent.click(yahButton)
		await wait()

		/* open the dialog */
		fireEvent.click(askButton)

		/* answer nah */
		const nahButton = getByTestId('nah')
		fireEvent.click(nahButton)
		await wait()
		expect(reportAnswer.mock.calls).toHaveLength(2)
		expect(reportAnswer.mock.calls[0][0]).toEqual(true)
		expect(reportAnswer.mock.calls[1][0]).toEqual(false)
	})

	/* TO DO */
	it('should use a custom `answerWith` function to transform the return value', async () => {
		/* Arrange */
		const reportAnswer = jest.fn()
		const getGithubInfo = jest.fn((handle) => `https://github.com/${handle}`)
		const { getByTestId } = render(
			<QuestionWrapper>
				{({ ask, answered }: QuestionContext) => (
					<React.Fragment>
						<QuestionConsumer>
							{({ currentQuestion }) => {
								if (!currentQuestion || !currentQuestion.options) return null
								return (
									<React.Fragment>
										{currentQuestion.options.map(({ answerQuestion, title, testId }) => (
											/* Here we are also testing that custom props like testId can be passed through */
											<button key={testId} type="button" data-testid={testId} onClick={answerQuestion}>
												{title}
											</button>
										))}
									</React.Fragment>
								)
							}}
						</QuestionConsumer>
						<button
							type="button"
							data-testid="askButton"
							onClick={async () => {
								const answer = await ask({
									message: 'Pick a profile',
									options: [
										{ title: 'Good Idea', testId: 'answerBtn1', returnValue: 'good-idea', answerWith: getGithubInfo },
										{ title: 'Bad Idea', testId: 'answerBtn2', returnValue: 'bad-idea', answerWith: getGithubInfo },
										{ title: 'NO', testId: 'nah', returnValue: false },
									],
								})
								reportAnswer(answer)
							}}
						>
							click?
						</button>
						{answered && <p>Question has been Answered</p>}
					</React.Fragment>
				)}
			</QuestionWrapper>,
		)

		const askButton = getByTestId('askButton')
		/* Act */
		/* open the dialog */
		fireEvent.click(askButton)
		await wait()
		// expect(queryByText('Question has been Answered')).toBeFalsy()

		/* first answer */
		const answerBtn1 = getByTestId('answerBtn1')
		fireEvent.click(answerBtn1)
		await wait()

		// expect(queryByText('Question has been Answered')).toBeTruthy()
		/* open the dialog */
		fireEvent.click(askButton)
		await wait()
		// expect(queryByText('Question has been Answered')).toBeFalsy()

		/* second answer */
		const answerBtn2 = getByTestId('answerBtn2')
		fireEvent.click(answerBtn2)
		await wait()

		/* Assert */
		expect(getGithubInfo.mock.calls).toHaveLength(2)
		expect(getGithubInfo.mock.calls[0][0]).toBe('good-idea')
		expect(getGithubInfo.mock.results[0].value).toBe('https://github.com/good-idea')
		expect(getGithubInfo.mock.calls[1][0]).toBe('bad-idea')
		expect(getGithubInfo.mock.results[1].value).toBe('https://github.com/bad-idea')
	})
})
