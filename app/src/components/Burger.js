import * as React from 'react'
import styled, { css } from 'styled-components'

const Line = styled.div`
	${({ theme }) => css`
		width: 19px;
		height: 2px;
		background-color: ${theme.color.middleGray};
	`}
`

const BurgerWrapper = styled.button`
	position: relative;
	width: 19px;
	height: 22px;
	padding: 4px 0;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

const Burger = () => (
	<BurgerWrapper>
		<Line />
		<Line />
		<Line />
	</BurgerWrapper>
)

export default Burger
