// @flow
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { withViewerLoginMutation } from 'App/queries'
import type { UserType } from 'App/types'

/**
 * UserLogin
 */

type Props = {
	user: UserType,
	selectUser: Function,
}

const Classrooms = (props: Props) => {
	const { loading, classrooms } = props
	return (
		<Column>
			{loading ? (
				<Loading />
			) : (
				<Fragment>
					<Header2>Select Your Classroom</Header2>
					<div>
						{classrooms &&
							classrooms.map((c) => (
								<Link to={`/login/classrooms/${c.slug}`} key={c.slug}>
									<ListItem title={c.title} line1={c.teachers.map((t) => t.name).join(', ')} />
								</Link>
							))}
					</div>
				</Fragment>
			)}
		</Column>
	)
}

Classrooms.defaultProps = {
	classrooms: [],
}

export default withViewerLoginMutation(Classrooms)
