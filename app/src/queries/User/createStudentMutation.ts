import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { User, MutationCreateStudentArgs } from '../../types-ts'

const createStudentMutation = gql`
	mutation createStudent($input: CreateStudentInput!) {
		createStudent(input: $input) {
			uid
			name
			roles
		}
	}
`

interface Response {
	createStudent: User
}

type Variables = MutationCreateStudentArgs['input']

export const useCreateStudentMutation = () =>
	useMutation<Response, Variables>(createStudentMutation)
