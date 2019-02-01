// @flow
import * as React from 'react'

type OptionConfig = {
	returnValue?: any,
	answerWith?: (any) => any | Promise<any>,
	[key: string]: any, // Allow for other props to be passed
}

export type QuestionConfig = {
	message: string,
	options?: Array<OptionConfig>,
	returnOnCancel?: any,
}

export type PromisedQuestionConfig = {
	message: string,
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
}

const defaultOptions = [{ returnValue: true }]

const noop = () => {}

export class QuestionProvider extends React.Component<Props, State> {
	state = {
		currentQuestion: undefined,
		cancelQuestion: noop,
		answered: false,
	}

	ask = (newQuestion: QuestionConfig) =>
		new Promise<any>((resolve) => {
			const resolveQuestion = (value: any, answerWith) => async () => {
				if (answerWith && typeof answerWith === 'function') await this.setState({ answered: true })
				const answer = answerWith && typeof answerWith === 'function' ? await answerWith(value) : value
				resolve(answer)
				this.setState({ answered: true, currentQuestion: undefined, cancelQuestion: noop })
			}

			/* create a cancelQuestion function that resolves the same as an answer would */
			const cancelQuestion = resolveQuestion(newQuestion.returnOnCancel)

			const { options: suppliedOptions, ...restOfQuestionConfig } = newQuestion
			const options = suppliedOptions || defaultOptions
			/* Add a promise to each question that resolves the `returnValue` */
			const promisedOptions = options.map((option) => ({
				...option,
				answerQuestion: resolveQuestion(option.returnValue, option.answerWith || undefined),
			}))
			this.setState({
				currentQuestion: {
					...restOfQuestionConfig,
					options: promisedOptions,
				},
				cancelQuestion,
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
