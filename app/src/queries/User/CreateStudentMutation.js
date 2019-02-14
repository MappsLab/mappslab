// @flow
import gql from 'graphql-tag'
import { withDefaultMutation } from '../Mutation'

const mutation = gql`
	mutation createStudent($input: CreateStudentInput!) {
		createStudent(input: $input) {
			uid
			name
			roles
		}
	}
`

const CreateStudentMutation = withDefaultMutation(mutation)

export default CreateStudentMutation
