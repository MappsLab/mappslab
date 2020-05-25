import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { User, MutationCreateTeacherArgs } from '../../types-ts'

const createTeacherMutation = gql`
	mutation CreateTeacher($input: CreateTeacherInput!) {
		createTeacher(input: $input) {
			uid
			name
			roles
		}
	}
`

interface Response {
	createTeacher: User
}

type Variables = MutationCreateTeacherArgs['input']

export const useCreateTeacherMutation = () =>
	useMutation<Response, Variables>(createTeacherMutation)
