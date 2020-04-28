import * as React from 'react'
import styled , { css } from 'styled-components'
import { NotificationsConsumer, Notification } from 'Components/Notifications'
import type { NotificationType } from 'Components/Notifications'

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
	notifications: Array<NotificationType>,
}

const MapNotificationsInner = ({ notifications }: Props) => {
	return (
		<Wrapper>
			{notifications.map((n) => (
				<Notification key={n.timestamp} {...n} />
			))}
		</Wrapper>
	)
}

export const MapNotifications = () => (
	<NotificationsConsumer>
		{({ notifications }) => <MapNotificationsInner notifications={notifications} />}
	</NotificationsConsumer>
)
