import React from 'react'
import { ApolloError } from 'apollo-client'

/**
 * FetchError
 *
 * Used in `withQuery` to render user-facing error messages.
 */

interface Props {
	error: ApolloError
}

export const FetchError = ({ error }: Props) => {
	const message = error.networkError
		? // If it's a network error, apologize
		  "Sorry, we're having trouble connecting."
		: // Otherwise, get the error message
		  error.message
	return <p>{message}</p>
}

export default FetchError
