// Local imports
import {
	FOUND,
	INTERNAL_SERVER_ERROR,
	NO_CONTENT,
} from '../../../helpers/httpStatus.js'
import { GET } from '../../../helpers/httpMethods.js'
import * as database from '../../../helpers/database.js'





export async function handler(context) {
	const { username } = context.query

	try {
		await database.getUserByUsername(username)
		context.status = FOUND.code
	} catch (error) {
		if (error.name === 'NotFoundError') {
			return context.status = NO_CONTENT.code
		}

		console.log('Unhandled error encountered while checking username validity:', error)
		context.status = INTERNAL_SERVER_ERROR.code
	}

	return null
}

export const allowedMethods = [GET]
