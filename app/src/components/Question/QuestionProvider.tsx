import * as React from 'react'

const { useContext } = React

interface OptionConfig {
	returnValue?: any
	level?: string
	title: string
	[key: string]: any // Allow for other props to be passed
}

type AnswerFn<Value extends any> = (value?: Value) => Promise<void>

export interface QuestionConfig<AnswerValue extends any> {
	message: string
	options?: Array<OptionConfig>
	returnOnCancel?: any
	render?: (answer: AnswerFn<AnswerValue>) => React.ReactNode
}

export interface PromisedQuestionConfig<AnswerValue extends any> {
	message: string
	render?: (fn: AnswerFn<AnswerValue>) => React.ReactNode
	options?: Array<
		OptionConfig & {
			answerQuestion: () => any
		}
	>
	[key: string]: any
}

export interface QuestionContext<AnswerValue extends any> {
	ask: (config: QuestionConfig<AnswerValue>) => Promise<any>
	answer: AnswerFn<AnswerValue>
	cancelQuestion: () => any
	currentQuestion?: PromisedQuestionConfig<AnswerValue>
	answered: boolean
}

const defaultContext = {
	ask: async () => undefined,
	cancelQuestion: () => undefined,
	answer: async () => undefined,
	answered: false,
}

const Context = React.createContext<QuestionContext<any>>(defaultContext)
const { Provider, Consumer } = Context

export const QuestionConsumer = Consumer
export const useQuestion = () => useContext(Context)

/**
 * QuestionProvider
 */

interface Props {
	children: React.ReactNode
}

interface State<AnswerValue> {
	currentQuestion?: PromisedQuestionConfig<AnswerValue>
	cancelQuestion: () => any
	answered: boolean
	answer: (value: any) => Promise<void>
}

const noop = async () => undefined

const defaultOptions = [
	{
		title: 'OK',
		level: 'primary',
		returnValue: true,
		answerQuestion: async () => true,
	},
]

export class QuestionProvider<AnswerValue = any> extends React.Component<
	Props,
	State<AnswerValue>
> {
	state = {
		currentQuestion: undefined,
		cancelQuestion: noop,
		answered: false,
		answer: noop,
	}

	ask = (newQuestion: QuestionConfig<AnswerValue>) =>
		new Promise<any>((resolve) => {
			const answer = async (value: any) => {
				resolve(value)
				this.setState({
					answered: true,
					currentQuestion: undefined,
					cancelQuestion: noop,
				})
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

	submitResult = async () => undefined

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
