// @flow
import * as React from 'react'

type OptionConfig = {
	returnValue?: any,
	[key: string]: any, // Allow for other props to be passed
}

export type QuestionConfig = {
	message: string,
	options?: Array<OptionConfig>,
	returnOnCancel?: any,
	showCancelButton?: boolean,
}

export type PromisedQuestionConfig = {
	message: string,
	render?: () => React.Node,
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
	answer: (any) => void,
	cancelQuestion: () => any,
	currentQuestion?: PromisedQuestionConfig,
	answered: boolean,
}

const defaultContext = {
	ask: async () => {},
	cancelQuestion: () => {},
	answered: false,
}

const { Provider, Consumer } = React.createContext<QuestionContext>(defaultContext)

export const QuestionConsumer = Consumer

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
			const resolveQuestion = (value: any) => async () => answer(value)

			const answer = async (value: any) => {
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
