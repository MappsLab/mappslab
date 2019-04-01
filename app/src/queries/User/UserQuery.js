// @flow
import gql from 'graphql-tag'
import type { UserType } from 'Types/User'
import type { QueryWrapper } from '../Query'
import { withDefaultQuery } from '../Query'
import { userFragment } from './fragments'

export const query = gql/* GraphQL */ `
	query UserQuery($uid: String, $email: String) {
		user(input: { uid: $uid, email: $email }) {
			...UserFragment
		}
	}
	${userFragment}
`

type UserResponse = {
	user: UserType,
}

const UserQuery: QueryWrapper<UserResponse> = withDefaultQuery(query)

export default UserQuery
