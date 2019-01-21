// @flow
import faker from 'faker'

const errorPhrase = () =>
	[
		'Error:',
		'A problem occurred while',
		faker.hacker.ingverb(),
		'the',
		faker.hacker.adjective(),
		faker.hacker.abbreviation(),
		faker.hacker.noun(),
	].join(' ')

const throwError = () => {
	throw new Error(errorPhrase())
}

export const MockError = throwError

const sleep = (ms: number = 1000) =>
	new Promise((resolve) => {
		setTimeout(resolve, ms)
	})

export const mockSlowResponse = async (_: any, { input }: { input: { delay: number } }) => {
	await sleep(input.delay || 1000)
	return true
}

export const mockNestedError = () => {
	return {
		status: 'ok',
		sub: () => [MockError(), MockError()],
	}
}
