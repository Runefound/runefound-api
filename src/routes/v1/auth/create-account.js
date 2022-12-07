// Module imports
import { koaBody } from 'koa-body'





// Local imports
import {
	BAD_REQUEST,
	FORBIDDEN,
	INTERNAL_SERVER_ERROR,
	OK,
	UNPROCESSABLE_ENTITY,
} from '../../../helpers/httpStatus.js'
import { getAuth } from '../../../helpers/firebase.server.js'
import { POST } from '../../../helpers/httpMethods.js'
import * as database from '../../../helpers/database.js'





export async function handler(context) {
	const {
		email,
		password,
		username,
	} = context.request.body
	const errors = []

	if (!email) {
		errors.push('Email is required.')
	}

	if (!password) {
		errors.push('Password is required.')
	}

	if (!username) {
		errors.push('Username is required.')
	}

	if (errors.length) {
		context.body = { errors }
		context.status = BAD_REQUEST.code
		return
	}

	let newUser = null

	try {
		newUser = await getAuth().createUser({
			email,
			emailVerified: false,
			password,
			displayName: username,
			disabled: false,
		})
	} catch (error) {
		context.body ={
			errors: [error.errorInfo.code],
		}

		switch (error.errorInfo.code) {
			case 'auth/email-already-exists':
				context.status = FORBIDDEN.code
				break

			case 'auth/username-already-exists':
				context.status = FORBIDDEN.code
				break

			case 'auth/invalid-password':
				context.status = UNPROCESSABLE_ENTITY.code
				break

			default:
				context.status = INTERNAL_SERVER_ERROR.code
				console.log('Unhandled account creation error:', error.errorInfo.code)
		}
	}

	try {
		await database.createUser({
			displayName: username,
			username,
			id: newUser.uid,
		})

		context.status = OK.code
	} catch (error) {
		await getAuth().deleteUser(newUser.uid)
		console.log('Error creating user in Planetscale:', error)
	}

	return null
}

export const allowedMethods = [POST]
export const middleware = [koaBody()]
