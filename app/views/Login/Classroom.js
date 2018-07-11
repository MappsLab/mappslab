// @flow
import React, { Fragment } from 'react'
import { withClassroomQuery } from 'App/queries'
import { Column, ListItem } from 'App/components/Layout'
import { Header2 } from 'App/components/Text'
import type { ClassroomType } from 'App/types'
import UserLogin from './UserLogin'

/**
 * Classroom
 */

type Props = {
	classroom?: void | ClassroomType,
}

type State = {
	selectedUser: null | string,
}

class Classroom extends React.Component<Props, State> {
	static defaultProps = {
		classroom: null,
	}

	constructor(props) {
		super(props)
		this.state = {
			selectedUser: null,
		}
	}

	selectUser = (uid: string) => {
		this.setState({
			selectedUser: uid,
		})
	}

	render() {
		const { classroom } = this.props
		if (this.state.selectedUser && classroom && classroom.students) {
			return <UserLogin user={classroom.students.find((u) => u.uid === this.state.selectedUser)} selectUser={this.selectUser} />
		}
		return (
			<Column>
				<Fragment>
					<Header2>Select your User</Header2>
					<div>
						{classroom &&
							classroom.students &&
							classroom.students.map((s) => (
								<button
									key={s.uid}
									onClick={() => {
										this.selectUser(s.uid)
									}}
								>
									<ListItem title={s.name} />
								</button>
							))}
					</div>
				</Fragment>
			</Column>
		)
	}
}

export default withClassroomQuery(Classroom)
