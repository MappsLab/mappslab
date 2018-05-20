// @flow
import React from 'react'
import { Redirect } from 'react-router-dom'
import { FORM_ERROR } from 'final-form'
import { withViewerLoginMutation } from 'App/queries'
import { Form, Field } from 'App/components/Forms'
import { Header2, Header4 } from 'App/components/Text'
import { Button } from 'App/components/UI'
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

type State = {
	loginState: 'start' | 'fetching' | 'success' | 'error',
}

/**
 * UserLogin
 */

class UserLogin extends React.Component<Props, State> {
	constructor(props) {
		super(props)
		this.state = {
			loginState: 'start',
		}
	}

	removeUser = () => {
		this.props.selectUser(null)
	}

	handleSubmit = async (credentials: Credentials): Promise<Object | void> => {
		this.setState({
			loginState: 'fetching',
		})
		const user = await this.props.mutate({ variables: { ...credentials } }).catch((error) => {
			this.setState({ loginState: 'error' })
			return { [FORM_ERROR]: error.message }
		})
		this.setState({ loginState: 'success' })
	}

	render() {
		const { loginState } = this.state
		const disabled = loginState === 'fetching'
		const { name, uid } = this.props.user
		console.log(this.props.user)
		if (loginState === 'success') return <Redirect to="/dashboard" />
		return (
			<Column>
				<Form disabled={disabled} onSubmit={this.handleSubmit} initialValues={{ uid }} submitButtonText="login">
					<Header2>Hi, {name}</Header2>
					<Header4 color="middleGray" align="left">
						Please enter your password to log in.
					</Header4>
					<Field label="uid" name="uid" type="hidden" value="UID" />
					<Field label="password" name="password" type="password" />
				</Form>
				<Button secondary onClick={this.removeUser}>
					← Back to Classroom
				</Button>
			</Column>
		)
	}
}

export default withViewerLoginMutation(UserLogin)
