// @flow
import * as React from 'react'

const { useContext } = React

type OptionConfig = {
	returnValue?: any,
	[key: string]: any, // Allow for other props to be passed
}

type AnswerFn = (any) => void

export type QuestionConfig = {
	message: string,
	options?: Array<OptionConfig>,
	returnOnCancel?: any,
}

export type PromisedQuestionConfig = {
	message: string,
	render?: (AnswerFn) => React.Node,
	/* Prettier doesn't jive */
	/* eslint-disable-next-line flowtype/generic-spacing */
	options?: Array<
		OptionConfig & {
			answerQuestion: () => any,
		},
	>,
	[key: string]: any,
}

export type QuestionContext = {
	ask: (QuestionConfig) => Promise<any>,
	answer: AnswerFn,
	cancelQuestion: () => any,
	currentQuestion?: PromisedQuestionConfig,
	answered: boolean,
}

const defaultContext = {
	ask: async () => {},
	cancelQuestion: () => {},
	answer: () => {},
	answered: false,
}

const Context = React.createContext<QuestionContext>(defaultContext)
const { Provider, Consumer } = Context

export const QuestionConsumer = Consumer
export const useQuestion = () => useContext(Context)

/**
 * QuestionProvider
 */

type Props = {
	children: React.Node,
}

type State = {
	currentQuestion?: PromisedQuestionConfig,
	cancelQuestion: () => any,
	answered: boolean,
	answer: (any) => void,
}

const defaultOptions = [{ returnValue: true }]

const noop = () => {}

export class QuestionProvider extends React.Component<Props, State> {
	state = {
		currentQuestion: undefined,
		cancelQuestion: noop,
		answered: false,
		answer: noop,
	}

	ask = (newQuestion: QuestionConfig) =>
		new Promise<any>((resolve) => {
			const answer = (value: any) => {
				resolve(value)
				this.setState({ answered: true, currentQuestion: undefined, cancelQuestion: noop })
			}

			const answerHandler = (value: any) => () => answer(value)

			/* create a cancelQuestion function that resolves the same as an answer would */
			const cancelQuestion = answerHandler(newQuestion.returnOnCancel)

			const { options: suppliedOptions, ...restOfQuestionConfig } = newQuestion
			const options = suppliedOptions || defaultOptions
			/* Add a promise to each question that resolves the `returnValue` */
			const promisedOptions = options.map((option) => ({
				...option,
				answerQuestion: answerHandler(option.returnValue),
			}))
			this.setState({
				currentQuestion: {
					...restOfQuestionConfig,
					options: promisedOptions,
				},
				cancelQuestion,
				answer,
			})
		})

	submitResult = async () => {}

	render() {
		const { children } = this.props
		const { ask } = this
		const value = {
			ask,
			...this.state,
		}
		return <Provider value={value}>{children}</Provider>
	}
}

// export default AlertProvider
