import * as React from 'react'
import { render, fireEvent, wait } from '../../jest/utils'
import { createMockProvider } from '../../jest/utils/mockServer'
import { StaticRouter } from 'react-router-dom'
// import { List } from 'Components/Inspector/Inspectors/List/List'
import { InspectorProvider } from '../components/Inspector'
// import { unwindEdges } from 'Queries/utils'
import { act } from 'react-dom/test-utils'

const mockClassrooms = jest.fn().mockResolvedValue(
	/* mock the 'filtered' classrooms */
	{
		edges: [
			{ node: { __typename: 'Classroom', uid: '0x1234', title: 'Social Studies' } },
			{ node: { __typename: 'Classroom', uid: '0x5678', title: 'Socialism 101' } },
		],
	},
)

const mockUserClassrooms = jest
	.fn()
	.mockResolvedValueOnce({
		edges: [
			{ node: { __typename: 'Classroom', uid: '0x1111', title: 'History' } },
			{ node: { __typename: 'Classroom', uid: '0x2222', title: 'Ceramics' } },
			{ node: { __typename: 'Classroom', uid: '0x3333', title: 'Math' } },
		],
	})
	.mockResolvedValueOnce({
		/* mock the third call to return the updated classrooms */
		edges: [
			{ node: { __typename: 'Classroom', uid: '0x1111', title: 'History' } },
			{ node: { __typename: 'Classroom', uid: '0x2222', title: 'Ceramics' } },
			{ node: { __typename: 'Classroom', uid: '0x3333', title: 'Math' } },
			{ node: { __typename: 'Classroom', uid: '0x5678', title: 'Socialism 101' } },
		],
	})
	.mockResolvedValueOnce({
		/* mock the fourth call to return the new classroom */
		edges: [
			{ node: { __typename: 'Classroom', uid: '0x1111', title: 'History' } },
			{ node: { __typename: 'Classroom', uid: '0x2222', title: 'Ceramics' } },
			{ node: { __typename: 'Classroom', uid: '0x3333', title: 'Math' } },
			{ node: { __typename: 'Classroom', uid: '0x5678', title: 'Socialism 101' } },
			{ node: { __typename: 'Classroom', uid: '0x9999', title: 'English' } },
		],
	})

const mockViewer = {
	uid: '0x123',
	name: 'Joseph',
	roles: ['teacher'],
}

const updateUser = jest.fn().mockResolvedValue({
	...mockViewer,
})

const createClassroom = jest.fn().mockImplementation((inputValue) =>
	Promise.resolve({
		__typename: 'Classroom',
		uid: '0x9999',
		title: inputValue,
	}),
)

const MockApolloProvider = createMockProvider(
	{
		Query: () => ({
			user: () => mockViewer,
			classrooms: () => mockClassrooms(),
			currentViewer: () => ({
				viewer: mockViewer,
			}),
		}),
		Mutation: () => ({
			updateUser,
			createClassroom,
		}),
		User: () => ({
			classrooms: mockUserClassrooms,
		}),
	},
	{
		context: {
			currentViewer: mockViewer,
		},
	},
)

describe('List [integration test]', () => {
	/* TODO: mock CurrentViewerProvider */
	it.skip('Allows users to add new associations and new items', async () => {
		/* Arrange */
		const { container, getByText, queryByText, debug, getByTestId } = render(
			<StaticRouter location="/?inspect=User-0x123-Joseph" context={{}}>
				<MockApolloProvider>
					<InspectorProvider />
				</MockApolloProvider>
			</StaticRouter>,
		)
		await wait()
		let addButton = getByText('+ Add')
		expect(getByText('+ Add')).toBeTruthy()
		expect(getByText('History')).toBeTruthy()
		expect(getByText('Ceramics')).toBeTruthy()
		expect(getByText('Math')).toBeTruthy()
		expect(queryByText('Socialism 101')).toBeFalsy()

		/* Act -- adding associations */
		act(() => {
			fireEvent.click(addButton)
		})
		let searchInput = container.querySelector('input[id="searchInput"]')
		act(() => {
			fireEvent.change(searchInput, { target: { value: 'Soc' } })
		})
		await wait()
		const socialismClassBtn = getByText('Socialism 101')

		act(() => {
			fireEvent.click(socialismClassBtn)
		})
		await wait()

		/* Assert */
		expect(getByTestId('list-addButton')).toBeTruthy()
		expect(getByText('History')).toBeTruthy()
		expect(getByText('Ceramics')).toBeTruthy()
		expect(getByText('Math')).toBeTruthy()
		expect(getByText('Socialism 101')).toBeTruthy()

		/* Act -- creating new entities */
		addButton = getByText('+ Add')

		act(() => {
			fireEvent.click(addButton)
		})
		searchInput = container.querySelector('input[id="searchInput"]')
		act(() => {
			fireEvent.change(searchInput, { target: { value: 'English' } })
		})
		await wait()
		const englishClassBtn = getByTestId('list-createButton')

		act(() => {
			fireEvent.click(englishClassBtn)
		})
		await wait()

		/* Assert */
		expect(getByTestId('list-addButton')).toBeTruthy()
		expect(getByText('History')).toBeTruthy()
		expect(getByText('Ceramics')).toBeTruthy()
		expect(getByText('Math')).toBeTruthy()
		expect(getByText('Socialism 101')).toBeTruthy()
		expect(getByText('English')).toBeTruthy()
	})
})
