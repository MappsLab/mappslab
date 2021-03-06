import styled, { css } from 'styled-components'

// @todo This 'visible' check shouldn't be necessary.
// This forces us to render all popup wrappers.
// But there's a weird problem with unmounting.
// To test: try rendering popup wrappers based on `visible`

interface PopupWrapperProps {
	noTouchEvents?: boolean
}

export const PopupWrapper = styled.div`
	${({ noTouchEvents }: PopupWrapperProps) => css`
		pointer-events: ${noTouchEvents ? 'none' : undefined};
		background-color: white;
		border-radius: 5px;
		box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.2);
		padding: 5px;
		font-size: 1.4em;
	`}
`
