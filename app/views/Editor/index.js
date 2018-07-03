// @flow
import React from 'react'
import styled from 'styled-components'
import Mapp from 'mapp'
import { withMapQuery, withCurrentViewerQuery } from 'App/queries'
import type { ViewerType, MapType } from 'App/types'
import PinsList from './PinsList'

const EditorWrapper = styled.div`
	position: relative;
`

/**
 * Editor
 */

type Props = {
	viewer: ViewerType,
	map: MapType,
}

const Editor = (props: Props) => {
	// const { pins } = viewer
	console.log(props)
	return null
	return (
		<EditorWrapper>
			<PinsList pins={pins || []} />
			<Mapp APIKey="AIzaSyCOqxjWmEzFlHKC9w-iUZ5zL2rIyBglAag" pins={pins} />
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
