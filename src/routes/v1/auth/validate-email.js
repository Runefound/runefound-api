// Local imports
import {
	FOUND,
	INTERNAL_SERVER_ERROR,
	NO_CONTENT,
} from '../../../helpers/httpStatus.js'
import { GET } from '../../../helpers/httpMethods.js'
import { getAuth } from '../../../helpers/firebase.server.js'





export async function handler(context) {
	const { email } = context.query

	try {
		await getAuth().getUserByEmail(email)
		context.status = FOUND.code
	} catch (error) {
		if (error.errorInfo.code === 'auth/user-not-found') {
			return context.status = NO_CONTENT.code
		}

		console.log('Unhandled error encountered while checking email validity:', error)
		context.status = INTERNAL_SERVER_ERROR.code
	}

	return null
}

export const allowedMethods = [GET]
