// @flow
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { withClassroomsQuery } from 'App/queries'
import { Column, ListItem } from 'App/components/Layout'
import { Header2 } from 'App/components/Text'
import type { ClassroomType } from 'App/types'

/**
 * MyComponent
 */

type Props = {
	classrooms?: Array<ClassroomType>,
}

const Classrooms = (props: Props) => {
	const { classrooms } = props
	return (
		<Column>
			<Fragment>
				<Header2>Select Your Classroom</Header2>
				<div>
					{classrooms &&
						classrooms.map((c) => (
							<Link to={`/login/classrooms/${c.slug}`} key={c.uid}>
								<ListItem title={c.title} line1={c.teachers && c.teachers.map((t) => t.name).join(', ')} />
							</Link>
						))}
				</div>
			</Fragment>
		</Column>
	)
}

Classrooms.defaultProps = {
	classrooms: [],
}

export default withClassroomsQuery(Classrooms)
