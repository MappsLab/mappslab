import React from 'react'
import { User } from '../../types-ts'
import { Chip } from '../Generic'
import { ChipProps } from '../Generic/Chip'

/**
 * UserChip
 */

type Props = Omit<ChipProps, 'title'> & {
	user: User
}

export const UserChip = ({ size, active, user }: Props) => (
	<Chip size={size || 'large'} active={active} title={user.name} />
)
