// @flow
import React from 'react'
import styled from 'styled-components'

// TODO: This 'visible' check shouldn't be necessary.
// This forces us to render all popup wrappers.
// But there's a weird problem with unmounting.
// To test: try rendering popup wrappers based on `visible`

export const PopupWrapper = styled.div`
	background-color: white;
	border-radius: 5px;
	box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.2);
	padding: 5px;
	${(props) =>
		props.visible
			? `
		display: block;		
	`
			: `
		display: none;	
	`};
`

/**
 * PinTitle
 */

type Props = {
	title: string,
	visible: boolean,
}

export const HoverInfo = ({ title, visible }: Props) => {
	return (
		<PopupWrapper visible={visible}>
			<p>{title}</p>
		</PopupWrapper>
	)
}
