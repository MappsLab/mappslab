// @flow
import React from 'react'
import styled from 'styled-components'
import { Background, ModalInner, ModalContainer } from 'Components/Modals'
import { Consumer } from './Provider'
import type { RenderProps } from './Provider'
import ClassroomBrowser from './Classroom/ClassroomBrowser'

const BrowserMap = new Map([['Classroom', ClassroomBrowser]])

const BrowserWrapper = styled(ModalInner)`
	width: calc(100% - 50px);
	max-width: 700px;
`

/**
 * EntityBrowser
 */

const EntityBrowser = () => (
	<Consumer>
		{({ current, close }: RenderProps) => {
			if (!current) return null
			const { __typename } = current
			const Browser = BrowserMap.get(__typename)
			if (!Browser) {
				console.warn(`No entity browser for ${__typename} was found`)
				return null
			}

			return (
				<>
					<Background onClick={close} />
					<ModalContainer>
						<BrowserWrapper>
							<Browser entity={current} />
						</BrowserWrapper>
					</ModalContainer>
				</>
			)
		}}
	</Consumer>
)

export default EntityBrowser
