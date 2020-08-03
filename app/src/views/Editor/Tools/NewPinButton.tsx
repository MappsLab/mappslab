// @flow
import React from 'react'
import styled, { css, DefaultTheme } from 'styled-components'
import { State } from 'react-automata'
import { RoundButton } from '../../../components/Buttons'
import { useCurrentMap } from '../../../providers/CurrentMap'
import _ from 'lodash'

const PIN_CURSOR = 'url("/images/newPin.svg") 18 49, crosshair'

interface WrapperProps {
	active: boolean
	theme: DefaultTheme
}
const Wrapper = styled.div`
	${({ active }: WrapperProps) => css`
		& button {
			cursor: ${active ? PIN_CURSOR : ''};
		}
	`}
`
/**
 * NewPinButton
 */

type Props = {
	onClick: () => void
}

const NewPinButton = ({ onClick }: Props) => {
	const {mode} = useCurrentMap()

	const dropMode = _.get(mode.value, 'Lesson.DropPin.DropMode')
	return (
		<Wrapper id='here' active={dropMode}>
			<RoundButton
				tooltip={dropMode ? 'Cancel' : 'Add a New Pin'}
				onClick={onClick}
				label="Add a new Pin"
				icon={dropMode ? '' : '📍'}
				size="large"
			/>
		</Wrapper>
	)
}

export default NewPinButton
