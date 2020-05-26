import gql from 'graphql-tag'
import { useMutation, MutationHookOptions } from '@apollo/client'
import { User, MutationCreateTeacherArgs } from '../../types-ts'
import { classroomQuery } from '../classroom'

const createTeacherMutation = gql`
	mutation CreateTeacher(
		$name: String!
		$temporaryPassword: String!
		$email: String!
		$addToClassrooms: [String!]
	) {
		createTeacher(
			input: {
				name: $name
				temporaryPassword: $temporaryPassword
				email: $email
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
	createTeacher: User
}

type Variables = MutationCreateTeacherArgs['input']

interface Config {
	classroomUid: string
}

const getOptions = ({
	classroomUid,
}: Config): MutationHookOptions<Response, Variables> => ({
	refetchQueries: [{ query: classroomQuery, variables: { uid: classroomUid } }],
})

export const useCreateTeacherMutation = (config: Config) =>
	useMutation<Response, Variables>(createTeacherMutation, getOptions(config))
