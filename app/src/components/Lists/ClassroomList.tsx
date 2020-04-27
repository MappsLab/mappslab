import * as React from 'react'
import { Paginated, unwindEdges } from '@good-idea/unwind-edges'
import { useQuery } from '@apollo/react-hooks'
import { Classroom } from '../../types-ts'
import {
	classroomsQuery,
	ClassroomsQueryResponse,
} from '../../queries/Classroom/ClassroomsQuery'
import { List } from './List'
import { ListOfTypeProps, ListOfTypeBaseProps } from './utils'

/**
 * ClassroomList
 */

export const ClassroomList = ({
	title,
	items,
	viewerCanAdd,
	update,
	onItemClick,
	create,
}: ListOfTypeBaseProps<Classroom>) => {
	const { loading, data, refetch } = useQuery<ClassroomsQueryResponse>(
		classroomsQuery,
	)

	const search = (searchValue: string) => {
		if (searchValue.length < 3) return
		refetch({
			where: {
				title: {
					contains: searchValue,
				},
			},
		})
	}
	const [classrooms] = unwindEdges<Classroom>(data?.classrooms)

	return (
		<List
			title={title}
			search={search}
			searchResults={classrooms}
			onSearchResultClick={update}
			viewerCanAdd={viewerCanAdd}
			type="classroom"
			items={items}
			create={create}
			onItemClick={onItemClick}
		/>
	)
}

