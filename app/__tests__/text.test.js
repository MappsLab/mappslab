import { getFilenameFromURL } from '../text'

describe('Utilities -> Text -> getFilenameFromURL', () => {
	it('Extracts the proper filename from a URL', () => {
		const url = 'http://res.cloudinary.com/good-idea/image/upload/sample-2.test.jpg'
		expect(getFilenameFromURL(url)).toEqual('sample-2.test.jpg')
	})
})
