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
}

const ClassroomCard = ({ display, user }: Props) => <Card display={display} header={user.name} />

ClassroomCard.defaultProps = {
	display: 'list',
}

export default ClassroomCard
