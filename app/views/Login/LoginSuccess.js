// @flow
import React from 'react'
import { Action } from 'react-automata'
import { Link } from 'react-router-dom'
import type { UserType } from 'Types/User'
import { Header2, Header4 } from 'Components/Text'
import { SHOW_NEWPW_SUCCESS } from './statechart'

/**
 * LoginSuccess
 */
type Props = {
	user: UserType,
}

const LoginSuccess = ({ user }: Props) => {
	return (
		<React.Fragment>
			<Header2>Hi, {user.name}!</Header2>
			<Action is={SHOW_NEWPW_SUCCESS}>
				<Header4>Your new password is set.</Header4>
			</Action>
			<Link to="/dashboard">Continue to your dashboard -> </Link>
		</React.Fragment>
	)
}

export default LoginSuccess
