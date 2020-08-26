import * as React from 'react'
import styled, { css } from 'styled-components'
import {
	useNotifications,
	Notification,
	NotificationType,
} from '../../components/Notifications'

const Wrapper = styled.div`
	${({ theme }) => css`
		position: absolute;
		z-index: ${theme.layout.z.mapTool};
		bottom: ${theme.layout.spacing.double};
		left: ${theme.layout.spacing.double};
		display: flex;
		flex-direction: column;
		pointer-events: none;

		& button {
			pointer-events: initial;
		}
	`}
`

/**
 * MapNotifications
 */

type Props = {
	notifications: NotificationType[]
}

export const MapNotifications = () => {
	const { notifications } = useNotifications()
	return (
		<Wrapper>
			{notifications.map((n) => (
				<Notification key={n.timestamp} {...n} />
			))}
		</Wrapper>
	)
}
