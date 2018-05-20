// @flow
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { withClassroomQuery } from 'App/queries'
import { Column, ListItem } from 'App/components/Layout'
import { Loading } from 'App/components/Loading'
import { Header2 } from 'App/components/Text'
import type { ClassroomType } from 'App/types'

/**
 * Classroom
 */


type Props = {
	loading: boolean,
	classroom?: void | ClassroomType,
}

type State = {
	selectedUser: null | string
}

class Classroom extends React.Component<Props, State> {
	constructor(props) {
		super(props)
		this.state = {
			selectedUser: null
		}
	}

	selectUser = (uid: string) => {
		this.setState({
			selectedUser: uid
		})
	}

	render() {
		const { loading, classroom } = this.props
		if (this.state.selectedUser) return <UserLogin user={classroom.students.find(u => u.uid === this.state.selectedUser)} selectUser={this.selectUser} />}
		return (
			<Column>
				{loading ? (
					<Loading />
				) : (
					<Fragment>
						<Header2>Select your User</Header2>
						<div>
							{classroom &&
								classroom.students &&
								classroom.students.map((s) => (
									<Link to={`/classrooms/${s.uid}`} key={s.uid}>
										<ListItem title={s.name} />
									</Link>
								))}
						</div>
					</Fragment>
				)}
			</Column>
		)
		}
}


Classroom.defaultProps = {
	classroom: null,
}

export default withClassroomQuery(Classroom)
