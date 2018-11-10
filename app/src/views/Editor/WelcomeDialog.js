// @flow
import React from 'react'
import type { MapType } from 'Types/Map'
import type { Transition } from 'react-automata'
import { Centered } from 'Components/Layout'
import Pane from 'Components/Pane'
import { Header2, P } from 'Components/Text'
import { Button } from 'Components/UI'

/**
 * MyComponent
 */

type Props = {
	map: MapType,
	transition: Transition,
}

const MyComponent = ({ map, transition }: Props) => {
	const enterLesson = (lessonUid?: string) => () => {
		transition('enterLesson', { lessonUid })
	}
	const { title, description, classroom } = map
	return (
		<Centered>
			<Pane size="small" icon="🗺" title={title} subtitle={classroom.title}>
				{description && <P>{description}</P>}
				<Header2 align="center">Let’s get started!</Header2>
				<Button onClick={enterLesson()}>Free Play</Button>
			</Pane>
		</Centered>
	)
}

export default MyComponent
