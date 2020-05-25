import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { Classroom } from '../../types-ts'
import { useClassroomsQuery } from '../../queries/Classroom/ClassroomsQuery'
import { List } from './List'
import { ListOfTypeProps } from './utils'

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
}: ListOfTypeProps<Classroom>) => {
	const { data, refetch } = useClassroomsQuery({ skip: true })

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
	const [searchResults] = unwindEdges<Classroom>(data?.classrooms)

	return (
		<List
			title={title}
			search={search}
			searchResults={searchResults}
			onSearchResultClick={update}
			viewerCanAdd={viewerCanAdd}
			type="classroom"
			items={items || []}
			create={create}
			onItemClick={onItemClick}
		/>
	)
}
