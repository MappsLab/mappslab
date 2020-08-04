// @flow
import * as React from 'react'
import { State } from 'react-automata'
import { PopupWrapper } from '../../../components/InfoPopup'
import { Pin } from '../../../types-ts'
import { useCurrentMap } from '../../../providers/CurrentMap'

/**
 * PinHoverPopup
 */

type Props = {
	pin: Pin
}

export const PinHoverPopup = ({ pin }: Props) => {
	const { mode } = useCurrentMap()
	return (
		<PopupWrapper noTouchEvents>
			{mode.matches('Lesson.DropPin') && <p>Connect to:</p>}
			<p>{pin.title && pin.title.length ? pin.title : 'Untitled Pin'}</p>
		</PopupWrapper>
	)
}
