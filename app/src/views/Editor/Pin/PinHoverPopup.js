// @flow
import * as React from 'react'
import { State } from 'react-automata'
import { PopupWrapper } from 'Components/InfoPopup'
import type { PinType } from 'Types/Pin'

/**
 * PinHoverPopup
 */

type Props = {
	pin: PinType,
}

const PinHoverPopup = ({ pin }: Props) => {
	return (
		<PopupWrapper noTouchEvents>
			<State is="Lesson.DropPin.*">
				<p>Connect to:</p>
			</State>
			<p>{pin.title && pin.title.length ? pin.title : 'Untitled Pin'}</p>
		</PopupWrapper>
	)
}

export default PinHoverPopup
