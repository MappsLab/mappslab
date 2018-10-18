// @flow
import React from 'react'
import type { UserType } from 'Types/User'
import { Chip } from 'Components/Generic'
import type { ChipProps } from 'Components/Generic/Chip'

/**
 * UserChip
 */

type Props = ChipProps & {
	user: UserType,
}

const UserChip = ({ size, active, user }: Props) => <Chip size={size || 'large'} active={active} title={user.name} />

export default UserChip
