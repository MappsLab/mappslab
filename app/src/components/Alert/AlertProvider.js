// @flow
import * as React from 'react'
import Alert from './Alert'

export type AlertConfig = {
	message: string,
	title?: string,
	buttons?: Array<{
		label: string,
		level?: 'primary' | 'secondary',
		returnValue?: any,
	}>,
}

export type ContextValues = {
	createAlert: (AlertConfig) => Promise<any>,
	clearAlert: () => void,
}

const defaultContext = {
	createAlert: async () => {},
	clearAlert: () => {},
}

const { Provider, Consumer } = React.createContext<ContextValues>(defaultContext)

export const AlertConsumer = Consumer

/**
 * AskProvider
 */

type Props = {
	children: React.Node,
}

export type PromisedAlertConfig = {
	message: string,
	title?: string,
	buttons?: Array<{
		label: string,
		level?: 'primary' | 'secondary',
		onClick<T>(T): Promise<T>,
	}>,
}

type State = {
	currentAlert: PromisedAlertConfig | null,
}

const defaultButtons = [{ label: 'OK', returnValue: true }]

export class AlertProvider extends React.Component<Props, State> {
	state = {
		currentAlert: null,
	}

	createAlert = (newAlert: AlertConfig) =>
		new Promise<any>((resolve) => {
			const buttons = newAlert.buttons || defaultButtons
			const promisedButtons = buttons.map(({ returnValue, label }) => ({
				label,
				onClick: () => {
					resolve(returnValue)
					this.clearAlert()
				},
				// new Promise((resolve) => {
				// 	console.log(returnValue)
				// 	resolve(returnValue)
				// }),
			}))
			this.setState({
				currentAlert: {
					...newAlert,
					buttons: promisedButtons,
				},
			})
			// console.log(this.state.currentAlert)
			// return Promise.race()
		})

	submitResult = async () => {}

	clearAlert = () => {
		this.setState({ currentAlert: null })
	}

	render() {
		const { children } = this.props
		const { currentAlert } = this.state
		const { createAlert, clearAlert } = this
		const value = {
			currentAlert,
			createAlert,
			clearAlert,
		}
		return (
			<Provider value={value}>
				{<Alert visible={Boolean(currentAlert)} alert={currentAlert} />}
				{children}
			</Provider>
		)
	}
}

// export default AlertProvider
