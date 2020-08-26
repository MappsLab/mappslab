import * as React from 'react'
import styled, { css } from 'styled-components'
import { Header6 } from './Text'

const Message = styled(Header6)`
	${({ theme }) => css`
		position: absolute;
		opacity: 0;
		max-width: 130px;
		white-space: nowrap;
		font-weight: ${theme.font.weight.regular};
		padding: ${theme.layout.spacing.third};
		bottom: calc(100% + 5px);
		left: 50%;
		transform: translate3d(-50%, 2px, 0);
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
			box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.25);
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

interface WrapperProps {
	active?: boolean
	relative?: boolean
}

const Wrapper = styled.div`
	${({ active, relative }: WrapperProps) => css`
		position: ${relative ? 'relative' : 'static'};

		&:hover ${Message} {
			opacity: ${active ? '1' : '0'};
		}
	`}
`

/**
 * ToolTip
 */

interface TooltipProps {
	children: React.ReactNode
	message?: string
	active?: boolean
	relative?: boolean
}

export const ToolTip = ({
	children,
	message,
	active,
	relative,
}: TooltipProps) =>
	message ? (
		<Wrapper active={active} relative={relative}>
			<Message>{message}</Message>
			{children}
		</Wrapper>
	) : (
		<>{children}</>
	)

ToolTip.defaultProps = {
	active: true,
	relative: false,
}
