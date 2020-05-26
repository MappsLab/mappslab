import React from 'react'
import { Transition } from 'react-automata'
import { Map } from '../../types-ts'
import { Centered } from '../../components/Layout'
import { Pane } from '../../components/Pane'
import { Header2, P } from '../../components/Text'
import { Button } from '../../components/Buttons'

/**
 * WelcomeDialog
 */

type Props = {
	map: Map
	transition: Transition
}

export const WelcomeDialog = ({ map, transition }: Props) => {
	const enterLesson = (lessonUid?: string) => () => {
		transition('enterLesson', { lessonUid })
	}
	const { title, description, classroom } = map
	if (!classroom) throw new Error('No classroom')
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
