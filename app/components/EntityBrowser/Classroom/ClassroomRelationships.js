// @flow
import React from 'react'
import gql from 'graphql-tag'
import Query from 'Queries/Query'

/**
 * ClassroomStudents
 */

const query = /* GraphQL */ gql`
	query ClassroomQuery($uid: String) {
		classroom(input: { uid: $uid }) {
			uid
			students {
				pageInfo {
					lastCursor
					hasNextPage
					hasPrevPage
				}
				edges {
					node {
						uid
						name
						# avatar
						# pinCount
					}
				}
			}
		}
	}
`

type Props = {
	classroomUid: string,
}

export const ClassroomStudents = ({ classroomUid }: Props) => (
	<Query query={query} variables={{ uid: classroomUid }}>
		{({ data }) => (
			<>
				<h1>Students</h1>
				{data.classroom.students.map((s) => (
					<p key={s.uid}>{s.name}</p>
				))}
			</>
		)}
	</Query>
)
