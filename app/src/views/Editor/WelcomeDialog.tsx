import React from 'react'
import { Transition } from 'react-automata'
import { Map } from '../../types-ts'
import { Centered } from '../../components/Layout'
import { Pane } from '../../components/Pane'
import { Header2, P } from '../../components/Text'
import { Button } from '../../components/Buttons'
import { useCurrentMap } from '../../providers/CurrentMap'
import { useMapStateMachine } from '../../providers/CurrentMap/mapStateMachine'

/**
 * WelcomeDialog
 */

type Props = {
	map: Map
}

export const WelcomeDialog = ({ map }: Props) => {
	const {mode, transitionMode} = useCurrentMap()

	if (!mode.matches('Welcome')) return null

	const enterLesson = (lessonUid?: string) => () => {
		transitionMode({
			type: 'enterLesson'
		})
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
