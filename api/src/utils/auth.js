// @flow
import crypto from 'crypto-promise'
import jwt from 'jsonwebtoken'
import type { JWT, UserType } from 'Types/UserTypes'
import { JWT_KEY } from '../config'

export const createToken = (): Promise<string> =>
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
	const { name, uid, roles } = user
	if (!name || !uid || !roles || !roles.length) throw new Error(`createJWT requires a name, uid, and roles`)
	const token = jwt.sign({ name, uid, roles }, JWT_KEY || 'abc', { expiresIn: 10800 })
	return {
		token: `Bearer ${token}`,
		expires,
	}
}

export const verifyJWT = (token: string): Promise<UserType> =>
	new Promise((resolve, reject) => {
		jwt.verify(token, JWT_KEY, (err, decoded) => {
			if (err) {
				reject(err)
				return
			}
			resolve(decoded)
		})
	})