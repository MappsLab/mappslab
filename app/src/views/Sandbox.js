// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import { QuestionConsumer } from 'Components/Question'

const Wrapper = styled.div`
	${({ theme }) => css`
		position: fixed;
		top: 100px;
		left: 100px;
		padding: 10px;
		background-color: white;
		z-index: ${theme.layout.z.modal};
	`}
`

/**
 * Sandbox
 */

/**
 * MyComponent
 */

const MyComponent = () => (
	<Wrapper>
		<QuestionConsumer>
			{({ ask }) => (
				<button
					type="button"
					onClick={async () => {
						const answer = await ask({
							message: 'are you sure?',
							options: [{ title: 'YES', returnValue: true }, { title: 'NO', returnValue: false }],
						})
						console.log(answer)
					}}
				>
					click
				</button>
			)}
		</QuestionConsumer>
	</Wrapper>
)

export default MyComponent
