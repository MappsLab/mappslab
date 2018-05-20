// @flow
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { withClassroomQuery } from 'App/queries'
import { Column, ListItem } from 'App/components/Layout'
import { Loading } from 'App/components/Loading'
import { Header2 } from 'App/components/Text'
import type { ClassroomType } from 'App/types'

/**
 * MyComponent
 */

type Props = {
	loading: boolean,
	classroom?: ClassroomType,
}

const Classroom = (props: Props) => {
	const { loading, classroom } = props
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

export default withClassroomQuery(Classroom)
