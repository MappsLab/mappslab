// @flow
import * as React from 'react'
import * as R from 'ramda'
import styled, { css } from 'styled-components'
import { adopt } from 'react-adopt'
import NativeListener from 'react-native-listener'
import type { PinType } from 'Types/Pin'
import type { ViewerType } from 'Types/User'
import type { Mutation } from 'Types/GraphQL'
import { CurrentViewerQuery } from 'Queries/Viewer'
import { UpdatePinMutation, DeletePinMutation } from 'Queries/Pin'
import { EditableText } from 'Components/Inspector'
import { UserChip } from 'Components/User'
import Pane from 'Components/Pane'
import { Button } from 'Components/Buttons'
import { NotificationsConsumer } from 'Components/Notifications'
import type { NewNotification } from 'Components/Notifications'
import { QuestionConsumer } from 'Components/Question'
import type { QuestionContext } from 'Components/Question'
import { query as mapQuery } from 'Queries/Map/MapQuery'
import PinMedia from './PinMedia'

/**
 * PinInspector
 */

const Header = styled.div`
	position: relative;
`

const CloseButton = styled(Button)`
	${({ theme }) => css`
		width: 18px;
		height: 18px;
		border-radius: 10px;
		/* background-color: pink; */
		position: absolute;
		right: 0;
		top: 0;
		color: ${theme.color.middleGray};

		&:hover {
			color: ${theme.color.primary.normal};
		}

		&:before,
		&:after {
			content: '';
			position: absolute;
			top: calc(50% - 1px);
			left: 10%;
			width: 80%;
			height: 2px;
			background-color: currentColor;
			transform-origin: center center;
		}

		&:before {
			transform: rotate(45deg);
		}

		&:after {
			transform: rotate(-45deg);
		}
	`}
`

type BaseProps = {
	pin: PinType,
}

type PinInspectorProps = BaseProps & {
	question: QuestionContext,
	viewer?: ViewerType,
	updatePin: Mutation,
	deletePin: Mutation,
	mapUid: string,
	closeInspector: () => void,
	sendNotification: (NewNotification) => void,
}

class PinInspector extends React.Component<PinInspectorProps> {
	close = () => {
		const { closeInspector } = this.props
		closeInspector()
	}

	submitUpdate = async (args) => {
		const { pin, viewer, updatePin, sendNotification } = this.props
		// @todo add a 'viewerOwnsPin' field to the GraphQL API
		console.log(args)
		const viewerIsOwner = Boolean(viewer && pin.owner.uid === viewer.uid)

		if (!viewerIsOwner) return
		const variables = {
			uid: pin.uid,
			...args,
		}

		const update = await updatePin({ variables })
		const updatedPin = update.data.updatePin
		sendNotification({ message: `Updated pin ${updatedPin.title}` })
	}

	removePin = async () => {
		const { pin, deletePin, mapUid, question, closeInspector } = this.props
		const answer = await question.ask({
			message: 'Are you sure you want to remove this pin?',
			options: [
				{ title: 'Yes', level: 'primary', returnValue: true },
				{ title: 'Cancel', level: 'secondary', returnValue: false },
			],
		})
		if (answer === false) return
		deletePin({
			variables: { uid: pin.uid },
			refetchQueries: [{ query: mapQuery, variables: { uid: mapUid } }],
		})
		closeInspector()
	}

	render() {
		const { pin, viewer } = this.props
		const viewerIsOwner = Boolean(viewer && pin.owner.uid === viewer.uid)
		return (
			<React.Fragment>
				<Pane size="small">
					<Header>
						<UserChip size="small" user={pin.owner} />
						<NativeListener onClick={this.close}>
							<CloseButton level="tertiary" />
						</NativeListener>
					</Header>
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
					<PinMedia pin={pin} submitUpdate={this.submitUpdate} viewerCanEdit={viewerIsOwner} alt={pin.description || ''} />
					{viewerIsOwner ? (
						<NativeListener onClick={this.removePin}>
							<Button level="tertiary">Delete</Button>
						</NativeListener>
					) : null}
				</Pane>
			</React.Fragment>
		)
	}
}

const Composed = adopt(
	{
		// $FlowFixMe
		question: <QuestionConsumer />,
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
