// @flow
import * as React from 'react'
import * as R from 'ramda'
import { adopt } from 'react-adopt'
import type { PinType, ViewerType } from 'Types'
import type { Mutation } from 'Types/GraphQL'
import { CurrentViewerQuery } from 'Queries/Viewer'
import { UpdatePinMutation } from 'Queries/Pin'
import { Column } from 'Components/Layout'
import { EditableText } from 'Components/Inspectors'
import { UserChip } from 'Components/User'
import Pane from 'Components/Pane'

/**
 * PinInspector
 */

type BaseProps = {
	pin: PinType,
}

type PinInspectorProps = BaseProps & {
	viewer?: ViewerType,
	updatePin: Mutation,
}

const PinInspector = (props: PinInspectorProps) => {
	const { pin, viewer, updatePin } = props
	const viewerIsOwner = Boolean(viewer && pin.owner.uid === viewer.uid)
	const submitUpdate = async (args) => {
		if (!viewerIsOwner) return
		const variables = {
			uid: pin.uid,
			...args,
		}
		await updatePin({ variables })
	}
	return (
		<Pane>
			<Column size="narrow">
				<EditableText
					name="title"
					updateFn={submitUpdate}
					textSize="h2"
					placeholder="Untitled Pin"
					initialValue={pin.title}
					viewerCanEdit={viewerIsOwner}
					autoFocus
				/>
				<EditableText
					name="description"
					updateFn={submitUpdate}
					multiline
					placeholder="Describe your pin"
					textSize="p"
					initialValue={pin.description}
					viewerCanEdit={viewerIsOwner}
				/>
				pinned by <UserChip size="small" user={pin.owner} />
			</Column>
		</Pane>
	)
}

const Composed = adopt(
	{
		currentViewerQuery: <CurrentViewerQuery />,
		updatePin: <UpdatePinMutation />,
	},
	({ currentViewerQuery, ...rest }) => ({
		viewer: R.path(['data', 'currentViewer', 'viewer'], currentViewerQuery),
		...rest,
	}),
)

export default (props: BaseProps) => <Composed>{(composedProps) => <PinInspector {...composedProps} {...props} />}</Composed>
