/* eslint-disable no-undef */
export const upload = jest.fn().mockResolvedValue({
	ETag: 'xyz789',
	Location: 'http://mock-bucket.localhost/mock-bucket/abc.png',
	Key: 'mock-bucket/abc.png',
	Bucket: 'mock-bucket',
})
