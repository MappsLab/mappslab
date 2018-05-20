// @flow
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { withClassroomsQuery } from 'App/queries'
import { Column, ListItem } from 'App/components/Layout'
import { Loading } from 'App/components/Loading'
import { Header2 } from 'App/components/Text'

/**
 * MyComponent
 */

type Props = {
	loading: boolean,
	classrooms: Array<Object>,
}

const Classrooms = ({ loading, classrooms }: Props) => {
	return (
		<Column>
			{loading ? (
				<Loading />
			) : (
				<Fragment>
					<Header2>Select Your Classroom</Header2>
					<div>
						{classrooms.map((c) => (
							<Link to={`/${c.slug}`} key={c.slug}>
								<ListItem title={c.title} line1={c.teachers.map((t) => t.name).join(', ')} />
							</Link>
						))}
					</div>
				</Fragment>
			)}
		</Column>
	)
}

export default withClassroomsQuery(Classrooms)
