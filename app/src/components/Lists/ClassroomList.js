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
	create,
}: ListOfTypeProps<ClassroomType>) => {
	const search = (searchValue: string) => {
		if (searchValue.length < 3) return
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
			// $FlowFixMe
			items={items}
			create={create}
			onItemClick={onItemClick}
		/>
	)
}

const ClassroomListWrapper = (baseProps: ListOfTypeBaseProps<ClassroomType>) => (
	<ClassroomsQuery delayQuery>
		{({ data, refetch }) => (
			<ClassroomList searchQuery={refetch} searchResults={data ? data.classrooms || [] : []} {...baseProps} />
		)}
	</ClassroomsQuery>
)

export default ClassroomListWrapper
