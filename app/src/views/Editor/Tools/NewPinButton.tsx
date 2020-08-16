// @flow
import React, { useMemo } from 'react'
import styled, { css, DefaultTheme } from 'styled-components'
import _ from 'lodash'
import { State } from 'react-automata'
import { RoundButton } from '../../../components/Buttons'
import { useCurrentMap } from '../../../providers/CurrentMap'
import newPinSvg from '../../../assets/images/newPin.svg'

const PIN_CURSOR = `url(${newPinSvg}) 18 49, crosshair`

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
	const { mode } = useCurrentMap()

	const dropMode = _.get(mode.value, 'Lesson.DropPin.DropMode')
	const icon = useMemo(() => {
		switch (true) {
			case mode.matches('Lesson.DropPin.DropMode.Connect'):
				return '✔'
			case mode.matches('Lesson.DropPin.DropMode'):
				return '❌󠁿'
			default:
				return '📍'
		}
	}, [mode])

	const label = useMemo(() => {
		switch (true) {
			case mode.matches('Lesson.DropPin.DropMode.Connect'):
				return 'Done'
			case mode.matches('Lesson.DropPin.DropMode'):
				return 'Cancel'
			default:
				return 'Add A New Pin'
		}
	}, [mode])

	return (
		<Wrapper id="here" active={dropMode}>
			<RoundButton
				tooltip={label}
				onClick={onClick}
				label={label}
				showLabel={true}
				icon={icon}
				size="large"
			/>
		</Wrapper>
	)
}

export default NewPinButton
