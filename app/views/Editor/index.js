// @flow
import React from 'react'
import styled from 'styled-components'
import Mapp from 'mapp'
import { withMapQuery, withCurrentViewerQuery } from 'App/queries'
import type { ViewerType, MapType } from 'App/types'
import Pin from './Elements/Pin'

const EditorWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
`

/**
 * Editor
 */

type Props = {
	viewer: ViewerType,
	map: MapType,
}

const Editor = ({ map, viewer }: Props) => {
	// const { pins } = viewer
	const { pins } = map
	return (
		<EditorWrapper>
			<Mapp
				APIKey="AIzaSyCOqxjWmEzFlHKC9w-iUZ5zL2rIyBglAag"
				render={() => <React.Fragment>{pins.map((p) => <Pin key={p.uid} {...p} />)}</React.Fragment>}
			/>
		</EditorWrapper>
	)
}

/**
 * EditorSwitch
 */

type SwitchProps = {
	uid: string,
}

// const UserMap = withUserMapQuery(Editor)
const ClassroomMap = withCurrentViewerQuery(withMapQuery(Editor))

const EditorSwitch = ({ uid }: SwitchProps) => <ClassroomMap uid={uid} />

export default EditorSwitch
