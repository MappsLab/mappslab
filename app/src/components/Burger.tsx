import * as React from 'react'
import styled, { css } from 'styled-components'

const Line = styled.div`
	${({ theme }) => css`
		width: 19px;
		height: 2px;
		background-color: ${theme.color.middleGray};
	`}
`

const BurgerWrapper = styled.div`
	position: relative;
	width: 19px;
	height: 22px;
	padding: 4px 0;
	flex-direction: column;
	justify-content: space-between;
	display: flex;
`

export const Burger = () => (
	<BurgerWrapper>
		<Line />
		<Line />
		<Line />
	</BurgerWrapper>
)

