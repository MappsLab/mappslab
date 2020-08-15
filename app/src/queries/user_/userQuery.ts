import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
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

export type UserQueryResponse = {
	user: User
}

export interface UserQueryArgs {
	uid?: string | null
	email?: string | null
}

export const useUserQuery = ({ uid, email }: UserQueryArgs) =>
	useQuery<UserQueryResponse>(userQuery, {
		variables: { uid, email },
		skip: !Boolean(uid) && !Boolean(email),
	})
