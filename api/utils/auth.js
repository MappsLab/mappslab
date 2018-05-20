// @flow
import crypto from 'crypto-promise'
import jwt from 'jsonwebtoken'
import { pickAll } from 'ramda'
import type { UserType } from '../types/User/UserTypes'
import { JWT_KEY } from '../config'

export type JWT = {
	token: string,
	expires: number,
}

export const createToken = (): Promise<String | Error> =>
	new Promise((resolve, reject) => {
		crypto
			.randomBytes(48)
			.then((buffer) => {
				const token = buffer.toString('hex')
				resolve(token)
			})
			.catch((cryptErr) => {
				reject(cryptErr)
			})
	})

export const createJWT = (user: UserType): JWT => {
	const expires = 1 * 24 * 60 * 60 // 1 day
	const jwtFields = pickAll(['email', 'username', 'uid'])(user)
	const token = jwt.sign(jwtFields, JWT_KEY, { expiresIn: 10800 })
	return {
		token: `Bearer ${token}`,
		expires,
	}
}

export const verifyJWT = (token: string): Promise<UserType | Error> =>
	new Promise((resolve, reject) => {
		jwt.verify(token, JWT_KEY, (err, decoded) => {
			if (err) reject(err)
			resolve(decoded)
		})
	})
