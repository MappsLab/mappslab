// @flow
import * as React from 'react'
import * as R from 'ramda'
import { adopt } from 'react-adopt'
import NativeListener from 'react-native-listener'
import type { PinType, ViewerType } from 'Types'
import type { Mutation } from 'Types/GraphQL'
import { CurrentViewerQuery } from 'Queries/Viewer'
import { UpdatePinMutation } from 'Queries/Pin'
import { EditableText } from 'Components/Inspector'
import { UserChip } from 'Components/User'
import Pane from 'Components/Pane'
import { Button } from 'Components/Buttons'
import { NotificationsConsumer } from 'Components/Notifications'
import type { NewNotification } from 'Components/Notifications'

/**
 * PinInspector
 */

type BaseProps = {
	pin: PinType,
}

type PinInspectorProps = BaseProps & {
	viewer?: ViewerType,
	updatePin: Mutation,
	closeInspector: () => void,
	sendNotification: (NewNotification) => void,
}

const PinInspector = (props: PinInspectorProps) => {
	const { pin, viewer, updatePin, closeInspector, sendNotification } = props
	const viewerIsOwner = Boolean(viewer && pin.owner.uid === viewer.uid)
	const submitUpdate = async (args) => {
		if (!viewerIsOwner) return
		const variables = {
			uid: pin.uid,
			...args,
		}
		await updatePin({ variables })
		sendNotification({ message: `Updated pin ${pin.title}` })
	}
	return (
		<Pane size="small">
			<NativeListener onClick={closeInspector}>
				<Button level="tertiary">close</Button>
			</NativeListener>
			<EditableText
				name="title"
				label="Title"
				updateFn={submitUpdate}
				fontSize="h1"
				placeholder="Untitled Pin"
				initialValue={pin.title}
				viewerCanEdit={viewerIsOwner}
				autoFocus
			/>
			<EditableText
				label="Description"
				name="description"
				updateFn={submitUpdate}
				multiline
				placeholder="Describe your pin"
				fontSize="p"
				initialValue={pin.description}
				viewerCanEdit={viewerIsOwner}
			/>
			pinned by <UserChip size="small" user={pin.owner} />
		</Pane>
	)
}

const Composed = adopt(
	{
		currentViewerQuery: <CurrentViewerQuery />,
		updatePin: <UpdatePinMutation />,
		// $FlowFixMe
		notificationContext: <NotificationsConsumer />,
	},
	({ currentViewerQuery, notificationContext, ...rest }) => ({
		viewer: R.path(['data', 'currentViewer', 'viewer'], currentViewerQuery),
		sendNotification: notificationContext.sendNotification,
		...rest,
	}),
)

export default (props: BaseProps) => <Composed>{(composedProps) => <PinInspector {...composedProps} {...props} />}</Composed>
