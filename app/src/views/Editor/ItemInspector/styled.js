// @flow
import styled, { css } from 'styled-components'
import { Button } from 'Components/Buttons'

export const Header = styled.div`
	position: relative;
`

export const CloseButton = styled(Button)`
	${({ theme }) => css`
		width: 18px;
		height: 18px;
		border-radius: 10px;
		/* background-color: pink; */
		position: absolute;
		right: 0;
		top: 0;
		color: ${theme.color.middleGray};

		&:hover {
			color: ${theme.color.primary.normal};
		}

		&:before,
		&:after {
			content: '';
			position: absolute;
			top: calc(50% - 1px);
			left: 10%;
			width: 80%;
			height: 2px;
			background-color: currentColor;
			transform-origin: center center;
		}

		&:before {
			transform: rotate(45deg);
		}

		&:after {
			transform: rotate(-45deg);
		}
	`}
`
