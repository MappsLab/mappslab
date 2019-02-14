// @flow
import gql from 'graphql-tag'
import { withDefaultMutation } from '../Mutation'

const mutation = gql`
	mutation CreateTeacher($input: CreateTeacherInput!) {
		createTeacher(input: $input) {
			uid
			name
			roles
		}
	}
`

const CreateTeacherInput = withDefaultMutation(mutation)

export default CreateTeacherInput
