// Local imports
import { getAuth } from '../helpers/firebase.server.js'
import * as httpStatus from '../helpers/httpStatus.js'





export async function verifyFirebaseAuthToken(context, next) {
	const firebaseAuthToken = context.cookies.get('firebaseAuthToken')

	try {
		const firebaseUser = await getAuth().verifyIdToken(firebaseAuthToken, true)
		context.firebaseAuthToken = firebaseAuthToken
		context.firebaseUser = firebaseUser
	} catch (error) {
		context.status = httpStatus.UNAUTHORIZED.code
		return null
	}

	await next()

	return null
}
