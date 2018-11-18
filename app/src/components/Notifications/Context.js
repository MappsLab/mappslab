// @flow
import * as React from 'react'

export type NewNotification = {
	message: string,
}

export type NotificationType = {
	message: string,
	timestamp: number,
}

type ContextType = {
	sendNotification: (NewNotification) => void,
	notifications: Array<NotificationType>,
}

const { Consumer, Provider } = React.createContext<ContextType>({
	sendNotification: () => {},
	notifications: [],
})

export const NotificationsConsumer = Consumer

/**
 * NotificationContext
 */

type Props = {
	children: React.Node,
}

type State = {
	notifications: Array<NotificationType>,
}

export class NotificationsProvider extends React.Component<Props, State> {
	state = {
		notifications: [],
	}

	sendNotification = (newNotification: NewNotification) => {
		const notification = {
			...newNotification,
			timestamp: Date.now(),
		}
		this.setState(({ notifications }) => ({
			notifications: [...notifications, notification],
		}))
	}

	render() {
		const { children } = this.props
		const { notifications } = this.state
		const value = {
			sendNotification: this.sendNotification,
			notifications,
		}
		return <Provider value={value}>{children}</Provider>
	}
}
