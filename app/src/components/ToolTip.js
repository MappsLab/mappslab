// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Header6 } from 'Components/Text'

const Message = styled(Header6)`
	${({ theme }) => `
		position: absolute;
		opacity: 0;
		max-width: 130px;
		white-space: nowrap;
		font-weight: ${theme.font.weight.regular};
		padding: ${theme.layout.spacing.third};
		bottom: calc(100% + 5px);
		left: 50%;
		transform: translateX(-50%) translateY(2px);
		pointer-events: none;
		transition: 0.2s;

		&:before {
			content: '';
			position: absolute;
			top: calc(100% - 5px);
			left: calc(50% - 5px);
			width: 10px;
			height: 10px;
			z-index: -2;
			background-color: white;
			transform: rotate(45deg);
			box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.5);
		}

		&:after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			z-index: -3;
			width: 100%;
			height: 100%;
			background-color: white;
			border-radius: ${theme.mixins.borderRadius};
			box-shadow: ${theme.mixins.boxShadow.normal};

		}
	`}
`

const Wrapper = styled.div`
	position: relative;

	&:hover ${Message} {
		opacity: 1;
		transform: translateX(-50%);
	}
`

/**
 * ToolTip
 */

type Props = {
	children: React.Node,
	message: string,
}

const ToolTip = ({ children, message }: Props) => {
	return (
		<Wrapper>
			<Message>{message}</Message>
			{children}
		</Wrapper>
	)
}

export default ToolTip
