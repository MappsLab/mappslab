import * as React from 'react'
import styled, { css } from 'styled-components'
import { ToolTip } from 'Components/ToolTip'

interface WrapperProps {
	active?: boolean
	size?: string
}

const Wrapper = styled.button`
	${({ active, size }: WrapperProps) => css`
		border: 2px solid ${active ? 'red' : 'green'};
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		${size === 'large'
			? css`
					width: 50px;
					height: 50px;
					border-radius: 25px;
					margin: 5px;
					font-size: 35px;
			  `
			: css`
					width: 35px;
					height: 35px;
					border-radius: 18px;
					margin: 4px;
					font-size: 22px;
			  `}
	`}
`

/**
 * RoundButton
 */

interface BaseProps {
	onClick: () => void
	isActive?: boolean
	disabled?: boolean
	label: string
	icon: React.ReactNode
	size?: 'normal' | 'large'
	tooltip?: string
}

export const RoundButton = ({
	onClick,
	isActive,
	label,
	disabled,
	icon,
	size,
	tooltip,
}: BaseProps) => (
	<ToolTip message={tooltip}>
		<Wrapper
			size={size}
			onClick={onClick}
			active={isActive}
			disabled={disabled}
		>
			<span role="img" aria-label={label}>
				{icon}
			</span>
		</Wrapper>
	</ToolTip>
)

RoundButton.defaultProps = {
	isActive: false,
	disabled: false,
	size: 'normal',
	toolTip: undefined,
}
