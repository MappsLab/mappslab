// @flow
import React from 'react'
import { Card } from 'Components/Generic'
import type { UserType } from 'Types'

/**
 * ClassroomCard
 */

type Props = {
	display?: 'list' | 'full',
	user: UserType,
	active: boolean,
}

const ClassroomCard = ({ active, display, user }: Props) => <Card active={active} display={display} header={user.name} />

ClassroomCard.defaultProps = {
	display: 'list',
}

export default ClassroomCard
