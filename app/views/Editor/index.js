// @flow
import React from 'react'
import styled from 'styled-components'
import Mapp from 'mapp'
import { withMapQuery, withUserMapQuery } from 'App/queries'
import type { ViewerType } from 'App/types'
import PinsList from './PinsList'

const EditorWrapper = styled.div`
	position: relative;
`

/**
 * Editor
 */

type Props = {
	viewer: ViewerType,
	loading: boolean,
}

const Editor = ({ viewer, loading }: Props) => {
	if (loading) return null
	const { pins } = viewer
	return (
		<EditorWrapper>
			<PinsList pins={pins} />
			<Mapp APIKey="AIzaSyCOqxjWmEzFlHKC9w-iUZ5zL2rIyBglAag" pins={pins} />
		</EditorWrapper>
	)
}

/**
 * EditorSwitch
 */

type SwitchProps = {
	slug: string,
}

const ViewerMap = withUserMapQuery(Editor)
// const UserMap = withUserMapQuery(Editor)
const ClassroomMap = withMapQuery(Editor)

const EditorSwitch = ({ slug }: SwitchProps) => (slug === 'my-map' ? <ViewerMap /> : <ClassroomMap slug={slug} />)

export default EditorSwitch
