/* eslint-disable no-undef */
import { request } from './utils/db'

const q = /* GraphQL */ `
	mutation createPin($uid: String!) {
		deletePin(input: { uid: $uid }) {
			success
			messages
		}
	}
`

describe('[deletePin]', () => {
	it.skip('should successfully delete a pin', async () => {
		/* Arrange */
		// const { container, getByTestId } = render( ... )
		/* Act */
		/* Assert */
		// expect(...)
	})
})
