// @flow
import * as React from 'react'
import { State } from 'react-automata'
import { PopupWrapper } from './InfoPopups'

/**
 * PinHoverPopup
 */

const PinHoverPopup = ({ pin }: Props) => {
	return (
		<PopupWrapper>
			<State is="Lesson.DropPin.*">
				<p>Connect to:</p>
			</State>
			<p>{pin.title && pin.title.length ? pin.title : 'Untitled Pin'}</p>
		</PopupWrapper>
	)
}

export default PinHoverPopup
