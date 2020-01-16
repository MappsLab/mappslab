import React from 'react'
import { User } from '../../types-ts'
import { Chip } from 'Components/Generic'
import { ChipProps } from 'Components/Generic/Chip'

/**
 * UserChip
 */

type Props = ChipProps & {
	user: User
}

export const UserChip = ({ size, active, user }: Props) => (
	<Chip size={size || 'large'} active={active} title={user.name} />
)
