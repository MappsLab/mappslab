import * as React from 'react'

const { useState } = React

export interface NewNotification {
	message: string
}

export interface NotificationType {
	message: string
	timestamp: number
}

interface NotificationsContextValue {
	sendNotification: (notification: NewNotification) => void
	notifications: NotificationType[]
}

const NotificationsContext = React.createContext<
	NotificationsContextValue | undefined
>(undefined)

export const NotificationsConsumer = NotificationsContext.Consumer

export const useNotifications = () => {
	const ctx = React.useContext(NotificationsContext)
	if (!ctx)
		throw new Error(
			'useNotificationsContext must be used within a NotificationsProvider',
		)
	return ctx
}

interface NotificationsProps {
	children: React.ReactNode
}

export const NotificationsProvider = ({ children }: NotificationsProps) => {
	const [notifications, setNotifications] = useState<NotificationType[]>([])

	const sendNotification = (note: NewNotification) => {
		const newNotification = {
			...note,
			timestamp: Date.now(),
		}
		setNotifications([...notifications, newNotification])
	}
	const value = {
		notifications,
		sendNotification,
	}

	return (
		<NotificationsContext.Provider value={value}>
			{children}
		</NotificationsContext.Provider>
	)
}
