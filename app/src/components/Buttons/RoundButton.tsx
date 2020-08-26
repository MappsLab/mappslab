import * as React from 'react'
import styled, { css } from 'styled-components'
import { ToolTip } from '../ToolTip'

interface WrapperProps {
	active?: boolean
	size?: string
}

const Wrapper = styled.button`
	${({ active, size }: WrapperProps) => css`
		margin: 10px auto auto auto;
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
					font-size: 35px;
			  `
			: css`
					width: 35px;
					height: 35px;
					border-radius: 18px;
					font-size: 22px;
			  `}
	`}
`

const Label = styled.div`
	text-align: center;
	font-size: 1.5em;
	font-weight: bold;
	background: white;
	padding: 5px;
	border-radius: 5px;
`

const ImageContainer = styled.span`
	display: flex;
	align-items: center;
	line-height: 1em;
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
	showLabel?: boolean
}

export const RoundButton = ({
	onClick,
	isActive,
	label,
	disabled,
	icon,
	size,
	tooltip,
	showLabel,
}: BaseProps) => (
	<ToolTip message={!showLabel ? tooltip : undefined}>
		{showLabel && <Label>{label}</Label>}
		<Wrapper
			size={size}
			onClick={onClick}
			active={isActive}
			disabled={disabled}
		>
			<ImageContainer role="img" aria-label={label}>
				{icon}
			</ImageContainer>
		</Wrapper>
	</ToolTip>
)

RoundButton.defaultProps = {
	isActive: false,
	disabled: false,
	size: 'normal',
	toolTip: undefined,
}
