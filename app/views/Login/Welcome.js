// @flow
import React from 'react'
import { Button } from 'Components/UI'
import type { transition as transitionType } from 'react-automata'

import { FIND_CLASSROOM } from './statechart'

/**
 * Welcome
 */

type Props = {
	transition: transitionType,
}

const Welcome = ({ transition }: Props) => {
	const handleClick = () => {
		transition(FIND_CLASSROOM)
	}
	return (
		<React.Fragment>
			<Button onClick={handleClick}>Find Your Classroom</Button>
		</React.Fragment>
	)
}

export default Welcome
