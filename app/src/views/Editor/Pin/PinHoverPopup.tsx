// @flow
import * as React from 'react'
import { State } from 'react-automata'
import { PopupWrapper } from '../../../components/InfoPopup'
import { Pin } from '../../../types-ts'

/**
 * PinHoverPopup
 */

type Props = {
	pin: Pin
}

export const PinHoverPopup = ({ pin }: Props) => {
	return (
		<PopupWrapper noTouchEvents>
			<State is="Lesson.DropPin.*">
				<p>Connect to:</p>
			</State>
			<p>{pin.title && pin.title.length ? pin.title : 'Untitled Pin'}</p>
		</PopupWrapper>
	)
}
