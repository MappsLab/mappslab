import * as React from 'react'
import { render, mockServer } from 'Jest/utils'
import { fireEvent, wait } from 'react-testing-library'
import { act } from 'react-dom/test-utils'
/* import the bare component so we can inject dependencies instead of dealing with context */
import { List } from 'Components/Lists'

const { useState } = React

const types = ['classrooms', 'teachers', 'students']

const noop = () => {}

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
		it(`should list items [${type}]`, async () => {
			const result = await getTypes()
			const items = result[type]
			const onItemClick = jest.fn()

			const { queryByText } = render(<List onItemClick={onItemClick} title="My List" items={items} />)
			items.forEach((item) => {
				const text = item.title || item.name
				expect(queryByText(text)).toBeTruthy()
			})
		})
	})

	types.forEach((type) => {
		it(`should call onItemClick with their info when clicked [${type}]`, async () => {
			const result = await getTypes()
			const items = result[type]
			const onItemClick = jest.fn()
			const { getByText } = render(<List onItemClick={onItemClick} type={type} title="My List" items={items} />)

			/* click on each item */
			items.forEach((item) => {
				const { uid, title, name, __typename } = item
				const itemTitle = title || name
				const itemButton = getByText(itemTitle)
				fireEvent.click(itemButton)
				if (__typename === 'User') {
					expect(onItemClick).toHaveBeenCalledWith({ uid, name: itemTitle, __typename })
				} else {
					expect(onItemClick).toHaveBeenCalledWith({ uid, title: itemTitle, __typename })
				}
			})
		})
	})

	it('should by default not display the + Add button', async () => {
		const onItemClick = jest.fn()
		const { classrooms } = await getTypes()
		const { queryByText } = render(<List onItemClick={onItemClick} type="Classrooms" title="My Classrooms" items={classrooms} />)
		expect(queryByText('+ Add')).toBeFalsy()
	})

	it('should allow users to make new associations when given `viewerCanAdd === true`', async () => {
		const { classrooms } = await getTypes()
		const { getByText } = render(
			<List
				onItemClick={noop}
				type="Classrooms"
				search={noop}
				onSearchResultClick={noop}
				title="My Classrooms"
				viewerCanAdd
				items={classrooms}
			/>,
		)
		expect(getByText('+ Add')).toBeTruthy()
	})

	it('should display custom `addLabel` text', async () => {
		const { classrooms } = await getTypes()
		const { getByText } = render(
			<List
				onItemClick={noop}
				type="Classrooms"
				title="My Classrooms"
				viewerCanAdd
				search={noop}
				onSearchResultClick={noop}
				addLabel="Add Classroom"
				items={classrooms}
			/>,
		)
		expect(getByText('+ Add Classroom')).toBeTruthy()
	})

	it('should search for items, display them, and call the `addNew()` function', async () => {
		const { classrooms } = await getTypes()
		const [class1, class2, ...otherClassrooms] = classrooms
		const mockSearch = jest.fn(async () => [class1, class2])
		const onSearchResultClick = jest.fn()
		/* eslint-disable-next-line react/prop-types */
		const SampleList = ({ search }) => {
			const [searchResults, setSearchResults] = useState([])

			const doSearch = async (searchValue) => {
				const results = await search(searchValue)
				setSearchResults(results)
			}

			return (
				<List
					onItemClick={noop}
					type="Classrooms"
					title="My Classrooms"
					viewerCanAdd
					search={doSearch}
					onSearchResultClick={onSearchResultClick}
					searchResults={searchResults}
					items={otherClassrooms}
				/>
			)
		}
		const { container, getByText, queryByText } = render(<SampleList search={mockSearch} />)

		let addButton = getByText('+ Add')
		/* expect a search input to appear after clicking the add button */
		fireEvent.click(addButton)
		const searchInput = container.querySelector('input[id="searchInput"]')
		expect(searchInput).toBeTruthy()

		await wait()
		act(() => {
			fireEvent.change(searchInput, { target: { value: 'Ab' } })
		})

		/* expect the search fn to be called after the input changes */
		expect(mockSearch.mock.calls[0][0]).toEqual('Ab')
		const val1 = await mockSearch.mock.results[0].value
		expect(val1).toEqual([class1, class2])

		await wait()

		/* expect search results to show up as new list items */
		const class1Result = getByText(class1.title)
		const class2Result = getByText(class2.title)
		expect(class1Result).toBeTruthy()
		expect(class2Result).toBeTruthy()

		act(() => {
			fireEvent.click(class1Result)
		})

		/* Expect the click handler to have been called */
		const { uid, __typename, title } = class1
		expect(onSearchResultClick.mock.calls[0][0]).toEqual({ uid, __typename, title })

		/* Expect the form to have been reset */
		addButton = getByText('+ Add')
		expect(addButton).toBeTruthy()
		expect(queryByText(class2.title)).toBeFalsy()
	})

	it('should throw an error if `viewerCanAdd` is supplied without a `search` function', async () => {
		const { classrooms } = await getTypes()

		expect(() => {
			render(
				<List
					onItemClick={noop}
					type="Classrooms"
					title="My Classrooms"
					viewerCanAdd
					onSearchResultClick={noop}
					items={classrooms}
				/>,
			)
		}).toThrowErrorMatchingSnapshot()

		expect(() => {
			render(<List onItemClick={noop} type="Classrooms" title="My Classrooms" viewerCanAdd search={noop} items={classrooms} />)
		}).toThrowErrorMatchingSnapshot()

		/* This should not throw */
		render(
			<List
				onItemClick={noop}
				type="Classrooms"
				title="My Classrooms"
				viewerCanAdd
				search={noop}
				onSearchResultClick={noop}
				items={classrooms}
			/>,
		)
	})
})
