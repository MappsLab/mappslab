import * as React from 'react'
import { Classroom } from 'Types'
import { ClassroomsQuery } from 'Queries/Classroom'
import { List } from './List'
import { ListOfTypeProps, ListOfTypeBaseProps } from './utils'

/**
 * ClassroomList
 */

const ClassroomListMain = ({
	title,
	searchQuery,
	searchResults,
	items,
	viewerCanAdd,
	update,
	onItemClick,
	create,
}: ListOfTypeProps<Classroom>) => {
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

export const ClassroomList = (baseProps: ListOfTypeBaseProps<Classroom>) => (
	<ClassroomsQuery delayQuery>
		{({ data, refetch }) => (
			<ClassroomListMain searchQuery={refetch} searchResults={data ? data.classrooms || [] : []} {...baseProps} />
		)}
	</ClassroomsQuery>
)
