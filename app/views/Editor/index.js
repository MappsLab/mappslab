// @flow
import React from 'react'
import Mapp from 'mapp'
import { withMapQuery, withUserMapQuery, withCurrentViewerQuery } from 'App/queries'

/**
 * Editor
 */

type Props = {
	// ...
}

type State = {
	// ...
}

class Editor extends React.Component<Props, State> {
	static defaultProps = {
		// ...
	}

	constructor(props) {
		super(props)
	}

	render() {
		console.log(this.props)
		return <Mapp APIKey="AIzaSyCOqxjWmEzFlHKC9w-iUZ5zL2rIyBglAag" />
	}
}

/**
 * EditorSwitch
 */

type Props = {
	slug: string,
}

const ViewerMap = withCurrentViewerQuery(withUserMapQuery(Editor))
// const UserMap = withUserMapQuery(Editor)
const ClassroomMap = withMapQuery(Editor)

const EditorSwitch = ({ slug }: Props) => (slug === 'my-map' ? <ViewerMap /> : <ClassroomMap slug={slug} />)

export default EditorSwitch
