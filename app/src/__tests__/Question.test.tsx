// @flow
/* eslint-disable no-undef */
import * as React from 'react'
import { fireEvent, wait } from 'react-testing-library'
import { render } from '../../jest/utils'
import { QuestionProvider, QuestionContext, QuestionConsumer, QuestionDialog } from '../components/Question'

const QuestionWrapper = ({ children }: { children: (QuestionContext) => React.ReactNode }) => (
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
		expect(getByTestId('button').textContent).toBe('click?')
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
})
