// @flow
import * as React from 'react'
import type { ClassroomType } from 'Types/Classroom'
import { ClassroomsQuery } from 'Queries/Classroom'
import List from './List'
import type { ListOfTypeProps, ListOfTypeBaseProps } from './utils'

/**
 * ClassroomList
 */

const ClassroomList = ({
	title,
	searchQuery,
	searchResults,
	items,
	viewerCanAdd,
	update,
	onItemClick,
}: ListOfTypeProps<ClassroomType>) => {
	const search = (searchValue: string) => {
		searchQuery({
			where: {
				title: {
					contains: searchValue,
				},
			},
		})
	}

	return (
		<List
			title={title}
			search={search}
			searchResults={searchResults}
			onSearchResultClick={update}
			viewerCanAdd={viewerCanAdd}
			type="classroom"
			items={items}
			onItemClick={onItemClick}
		/>
	)
}

const ClassroomListWrapper = (baseProps: ListOfTypeBaseProps<ClassroomType>) => (
	<ClassroomsQuery delayQuery>
		{({ data, refetch }) => <ClassroomList searchQuery={refetch} searchResults={data ? data.classrooms : []} {...baseProps} />}
	</ClassroomsQuery>
)

export default ClassroomListWrapper
