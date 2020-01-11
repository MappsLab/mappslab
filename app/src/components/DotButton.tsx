import * as React from 'react'
import styled, { css } from 'styled-components'

const Dot = styled.span`
	${({ theme }) => css`
		position: absolute;
		width: 4px;
		height: 4px;
		border-radius: 2px;
		left: calc(50% - 2px);
		background-color: ${theme.color.lightGray};
		transition: 0.2s;

		&:nth-of-type(1) {
			top: 0;
		}

		&:nth-of-type(2) {
			top: calc(50% - 2px);
		}

		&:nth-of-type(3) {
			bottom: 0;
		}
	`}
`

const Wrapper = styled.button`
	${({ theme }) => css`
		cursor: pointer;
		position: relative;
		cursor: pointer;
		width: 16px;
		height: 16px;
		background: transparent;

		&:hover ${Dot} {
			background-color: ${theme.color.middleGray};
		}
	`}
`

interface DotButtonProps {
	onClick: (a: any) => void | Promise<void>
}

export const DotButton = ({ onClick }: DotButtonProps) => (
	<Wrapper onClick={onClick}>
		<Dot />
		<Dot />
		<Dot />
	</Wrapper>
)
