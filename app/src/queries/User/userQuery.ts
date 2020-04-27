import gql from 'graphql-tag'
import { User } from '../../types-ts'
import { userFragment } from './fragments'

export const userQuery = gql`
	query UserQuery($uid: String, $email: String) {
		user(input: { uid: $uid, email: $email }) {
			...UserFragment
		}
	}
	${userFragment}
`

type UserQueryResponse = {
	user: User
}
