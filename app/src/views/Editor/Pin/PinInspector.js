// @flow
import * as React from 'react'
import * as R from 'ramda'
import { adopt } from 'react-adopt'
import NativeListener from 'react-native-listener'
import type { PinType, ViewerType } from 'Types'
import type { Mutation } from 'Types/GraphQL'
import { CurrentViewerQuery } from 'Queries/Viewer'
import { UpdatePinMutation, DeletePinMutation } from 'Queries/Pin'
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
	deletePin: Mutation,
	closeInspector: () => void,
	sendNotification: (NewNotification) => void,
}

class PinInspector extends React.Component<PinInspectorProps> {
	componentWillUnmount() {
		const { pin } = this.props
		// TODO: Build smarter Form context
		// this setTimeout is hacky and only there to allow
		// child EditableTexts to submit changes.
		// Make them stateless and handle submitting & form state in context
		if (pin.draft) setTimeout(() => this.removePin(), 100)
	}

	submitUpdate = async (args) => {
		const { pin, viewer, updatePin, sendNotification } = this.props
		// TODO: add a 'viewerOwnsPin' field to the GraphQL API
		const viewerIsOwner = Boolean(viewer && pin.owner.uid === viewer.uid)

		if (!viewerIsOwner) return
		const variables = {
			uid: pin.uid,
			...args,
		}
		await updatePin({ variables })
		sendNotification({ message: `Updated pin ${pin.title}` })
	}

	removePin = () => {
		const { pin, deletePin } = this.props
		// TODO: add a 'viewerOwnsPin' field to the GraphQL API

		deletePin({ variables: { uid: pin.uid } })
	}

	render() {
		const { pin, viewer, closeInspector } = this.props
		// TODO: add a 'viewerOwnsPin' field to the GraphQL API
		const viewerIsOwner = Boolean(viewer && pin.owner.uid === viewer.uid)

		return (
			<Pane size="small">
				<NativeListener onClick={closeInspector}>
					<Button level="tertiary">close</Button>
				</NativeListener>
				<EditableText
					name="title"
					label="Title"
					updateFn={this.submitUpdate}
					fontSize="h1"
					placeholder="Untitled Pin"
					initialValue={pin.title}
					viewerCanEdit={viewerIsOwner}
					autoFocus
				/>
				<UserChip size="small" user={pin.owner} />
				<EditableText
					label="Description"
					name="description"
					updateFn={this.submitUpdate}
					multiline
					placeholder="Describe your pin"
					fontSize="p"
					initialValue={pin.description}
					viewerCanEdit={viewerIsOwner}
				/>
				<NativeListener onClick={this.removePin}>
					<Button level="tertiary">{pin.draft ? 'Cancel' : 'Delete'}</Button>
				</NativeListener>
			</Pane>
		)
	}
}

const Composed = adopt(
	{
		currentViewerQuery: <CurrentViewerQuery />,
		updatePin: <UpdatePinMutation />,
		deletePin: <DeletePinMutation />,
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
