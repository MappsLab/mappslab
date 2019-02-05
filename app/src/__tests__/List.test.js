import * as React from 'react'
import { render, mockServer } from 'Jest/utils'
import { fireEvent } from 'react-testing-library'
import { List } from 'Components/Inspector/Inspectors/List'

const types = ['classrooms', 'teachers', 'students']

const getTypes = async () => {
	const [classrooms, students, teachers] = await Promise.all([
		mockServer.getClassrooms(),
		mockServer.getStudents(),
		mockServer.getTeachers(),
		// mockServer.getMaps(),
	])
	return { classrooms, students, teachers }
}

describe('List Component', () => {
	/* run the suite for each type of entity */

	types.forEach((type) => {
		it(`should list ${type}`, async () => {
			const result = await getTypes()
			const items = result[type]
			const inspectItem = jest.fn()

			const { queryByText } = render(<List inspectItem={inspectItem} title="My List" items={items} />)
			items.forEach((item) => {
				const text = item.title || item.name
				expect(queryByText(text)).toBeTruthy()
			})
		})

		it(`${type} should call inspectItem with their info when clicked`, async () => {
			const result = await getTypes()
			const items = result[type]

			const inspectItem = jest.fn()

			const { getByText } = render(<List inspectItem={inspectItem} type={type} title="My List" items={items} />)

			/* click on each item */
			items.forEach((item) => {
				const text = item.title || item.name
				const itemButton = getByText(text)
				fireEvent.click(itemButton)
				const { uid } = item
				expect(inspectItem).toHaveBeenCalledWith({ uid, title: text, type: item.__typename.toLowerCase() })
			})
		})
	})
})
