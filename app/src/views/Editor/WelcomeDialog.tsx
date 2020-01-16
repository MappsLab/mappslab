// @flow
import React from 'react'
import { Transition } from 'react-automata'
import { Map } from '../../types-ts'
import { Centered } from 'Components/Layout'
import Pane from 'Components/Pane'
import { Header2, P } from 'Components/Text'
import { Button } from 'Components/Buttons'

/**
 * WelcomeDialog
 */

type Props = {
	map: Map
	transition: Transition
}

const WelcomeDialog = ({ map, transition }: Props) => {
	const enterLesson = (lessonUid?: string) => () => {
		transition('enterLesson', { lessonUid })
	}
	const { title, description, classroom } = map
	return (
		<Centered>
			<Pane icon="🗺" size="normal" title={title} subtitle={classroom.title}>
				{description && <P>{description}</P>}
				<Header2 align="center">Let’s get started!</Header2>
				<Button onClick={enterLesson()}>Free Play</Button>
			</Pane>
		</Centered>
	)
}

export default WelcomeDialog
