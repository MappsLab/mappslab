// @flow
import React from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { RoundButton } from 'Components/Buttons'
/**
 * ZoomButton
 */

type Props = {
	onClick: () => void,
	isActive?: boolean,
	disabled?: boolean,
	direction: 'in' | 'out',
}

const ZoomButton = ({ direction, ...rest }: Props) => (
	<RoundButton
		icon={direction === 'in' ? <FaPlus /> : <FaMinus />}
		label={direction === 'in' ? 'Zoom in' : 'Zoom Out'}
		{...rest}
	/>
)

ZoomButton.defaultProps = {
	isActive: false,
	disabled: false,
}

export default ZoomButton
