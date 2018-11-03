// @flow
import React from 'react'
import RoundButton from 'Components/UI/RoundButton'

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
	<RoundButton icon={direction === 'in' ? '➕' : '➖'} label={direction === 'in' ? 'Zoom in' : 'Zoom Out'} {...rest} />
)

ZoomButton.defaultProps = {
	isActive: false,
	disabled: false,
}

export default ZoomButton
