import gql from 'graphql-tag'
import { useMutation, MutationHookOptions } from '@apollo/client'
import { classroomQuery } from '../classroom'
import { User, MutationCreateStudentArgs } from '../../types-ts'

const createStudentMutation = gql`
	mutation createStudent(
		$name: String!
		$temporaryPassword: String!
		$addToClassrooms: [String!]
	) {
		createStudent(
			input: {
				name: $name
				temporaryPassword: $temporaryPassword
				addToClassrooms: $addToClassrooms
			}
		) {
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

interface Config {
	classroomUid: string
}

const getOptions = ({
	classroomUid,
}: Config): MutationHookOptions<Response, Variables> => ({
	refetchQueries: [{ query: classroomQuery, variables: { uid: classroomUid } }],
})

export const useCreateStudentMutation = (config: Config) =>
	useMutation<Response, Variables>(createStudentMutation, getOptions(config))
