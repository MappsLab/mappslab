import { parseSingularFields } from 'Utils/parsing'

describe('[parseSingularFields]', () => {
	it('should get the head of designated fields', () => {
		const obj = {
			name: 'joseph',
			address: ['666 Sesame Street'],
			bestFriendId: [1],
		}
		const fieldsToParse = ['address', 'bestFriendId']
		const result = parseSingularFields(fieldsToParse)(obj)
		expect(result.name).toBe('joseph')
		expect(result.address).toBe('666 Sesame Street')
		expect(result.bestFriendId).toBe(1)
	})

	it('should get the head of nested fields by path', () => {
		const obj = {
			name: 'joseph',
			places: {
				address: ['666 Sesame Street'],
			},
			bestFriend: {
				name: 'frank',
				places: {
					address: ['666 Sesame Street'],
				},
			},
		}
		const fieldsToParse = ['places.address', 'bestFriend.places.address']
		const result = parseSingularFields(fieldsToParse)(obj)
		expect(result.name).toBe('joseph')
		expect(result.places.address).toBe('666 Sesame Street')
		expect(result.bestFriend.places.address).toBe('666 Sesame Street')
	})

	it('will not create `[key]: undefined` if the prop does not exist', () => {
		const obj = {
			name: 'joseph',
		}
		const fieldsToParse = ['places.address', 'bestFriend.places.address']
		const result = parseSingularFields(fieldsToParse)(obj)
		expect(result.name).toBe('joseph')
		expect(result.places).toBe(undefined)
		expect(result.bestFriend).toBe(undefined)
	})
})
