// @flow
import * as React from 'react'
import * as R from 'ramda'
import styled, { css } from 'styled-components'
import { adopt } from 'react-adopt'
import NativeListener from 'react-native-listener'
import { FaPencilAlt } from 'react-icons/fa'
import type { PinType } from 'Types/Pin'
import type { ViewerType } from 'Types/User'
import type { Mutation } from 'Types/GraphQL'
import { CurrentViewerQuery } from 'Queries/Viewer'
import { UpdatePinMutation, DeletePinMutation } from 'Queries/Pin'
import { EditableText } from 'Components/Inspector'
import Pane from 'Components/Pane'
import { Button } from 'Components/Buttons'
import { QuestionConsumer } from 'Components/Question'
import type { QuestionContext } from 'Components/Question'
import { Header5 } from 'Components/Text'
import { query as mapQuery } from 'Queries/Map/MapQuery'
import PinMedia from './PinMedia'

/**
 * PinInspector
 */

const ByLine = styled.div`
	margin-bottom: 10px;
	display: flex;
	justify-content: flex-start;

	& > ${Header5} {
		margin-right: 0.4em;
	}
`

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
}
type State = {
	editMode: boolean,
}

class PinInspector extends React.Component<PinInspectorProps, State> {
	static defaultProps = {
		viewer: undefined,
	}

	state = {
		editMode: false,
	}

	close = () => {
		const { closeInspector } = this.props
		closeInspector()
	}

	enterEditMode = () => {
		this.setState({ editMode: true })
	}

	exitEditMode = () => {
		this.setState({ editMode: false })
	}

	submitUpdate = async (args) => {
		const { pin, viewer, updatePin } = this.props
		// @todo add a 'viewerOwnsPin' field to the GraphQL API
		const viewerIsOwner = Boolean(viewer && pin.owner.uid === viewer.uid)

		if (!viewerIsOwner) return
		const variables = {
			uid: pin.uid,
			...args,
		}

		await updatePin({ variables })
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
		const { editMode } = this.state
		const viewerIsOwner = Boolean(viewer && pin.owner.uid === viewer.uid)
		const canEdit = Boolean(viewerIsOwner && editMode)
		return (
			<React.Fragment>
				<Pane size="small">
					<Header>
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
						initialValue={pin.title || 'Untitled Pin'}
						viewerCanEdit={canEdit}
						autoFocus
					/>
					<ByLine>
						<Header5 color="lightGray">Pinned by:</Header5>
						<Header5 color="middleGray">{pin.owner.name}</Header5>
					</ByLine>
					<EditableText
						label="Description"
						name="description"
						updateFn={this.submitUpdate}
						multiline
						placeholder="Describe your pin"
						fontSize="p"
						initialValue={pin.description}
						viewerCanEdit={canEdit}
					/>

					<PinMedia pin={pin} submitUpdate={this.submitUpdate} viewerCanEdit={canEdit} alt={pin.description || ''} />
					{canEdit ? (
						<React.Fragment>
							<NativeListener onClick={this.removePin}>
								<Button level="tertiary">Delete</Button>
							</NativeListener>
							<hr />
							<NativeListener onClick={this.exitEditMode}>
								<Button level="tertiary">
									<FaPencilAlt /> Done Editing
								</Button>
							</NativeListener>
						</React.Fragment>
					) : (
						<NativeListener onClick={this.enterEditMode}>
							<Button level="tertiary">
								<FaPencilAlt /> Edit
							</Button>
						</NativeListener>
					)}
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
	},
	({ currentViewerQuery, notificationContext, ...rest }) => ({
		viewer: R.path(['data', 'currentViewer', 'viewer'], currentViewerQuery),
		sendNotification: notificationContext.sendNotification,
		...rest,
	}),
)

export default (props: BaseProps) => <Composed>{(composedProps) => <PinInspector {...composedProps} {...props} />}</Composed>
