// @flow
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { withViewerLoginMutation } from 'App/queries'
import { Column } from 'App/components/Layout'
import type { UserType } from 'App/types'

/**
 * UserLogin
 */

type Props = {
	user: UserType,
	selectUser: (string) => void,
	mutate: ({ variables: Credentials }) => Promise<any>,
}

/**
 * UserLogin
 */

class UserLogin extends React.Component<Props> {
	constructor(props) {
		super(props)
	}

	removeUser = () => {
		this.props.selectUser(null)
	}

	render() {
		return (
			<Column>
				<button onClick={this.removeUser}>←</button>
				<form onSubmit={this.handleSubmit} />
			</Column>
		)
	}
}

const UserLogin = (props: Props) => {}

export default withViewerLoginMutation(UserLogin)
