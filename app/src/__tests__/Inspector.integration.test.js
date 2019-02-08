import * as React from 'react'
import { render, fireEvent, wait } from 'Jest/utils'
import { createMockProvider } from 'Jest/utils/mockServer'
import { StaticRouter } from 'react-router-dom'
// import { List } from 'Components/Inspector/Inspectors/List/List'
import { InspectorProvider } from 'Components/Inspector'
// import { unwindEdges } from 'Queries/utils'
import { act } from 'react-dom/test-utils'

const mockClassrooms = jest.fn().mockResolvedValueOnce(
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

const mockViewer = {
	uid: '0x123',
	name: 'Joseph',
	roles: ['teacher'],
}

const updateUser = jest.fn().mockResolvedValue({
	...mockViewer,
})

const MockApolloProvider = createMockProvider(
	{
		Query: () => ({
			user: () => mockViewer,
			classrooms: mockClassrooms,
			currentViewer: () => ({
				viewer: mockViewer,
			}),
		}),
		Mutation: () => ({
			updateUser,
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

// beforeAll(async (done) => {
// 	classrooms = await mockServer.getClassrooms()
// 	done()
// })

describe('List [integration test]', () => {
	it('Allows users to add new items', async () => {
		/* Arrange */
		const { container, getByText, queryByText } = render(
			<StaticRouter location="/?inspect=user-0x123-Joseph" context={{}}>
				<MockApolloProvider>
					<InspectorProvider />
				</MockApolloProvider>
			</StaticRouter>,
		)
		await wait()
		const addButton = getByText('+ Add')
		expect(getByText('+ Add')).toBeTruthy()
		expect(getByText('History')).toBeTruthy()
		expect(getByText('Ceramics')).toBeTruthy()
		expect(getByText('Math')).toBeTruthy()
		expect(queryByText('Socialism 101')).toBeFalsy()

		act(() => {
			fireEvent.click(addButton)
		})
		const searchInput = container.querySelector('input[id="searchInput"]')
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
		expect(getByText('+ Add')).toBeTruthy()
		expect(getByText('History')).toBeTruthy()
		expect(getByText('Ceramics')).toBeTruthy()
		expect(getByText('Math')).toBeTruthy()
		expect(getByText('Socialism 101')).toBeTruthy()
	})
})
