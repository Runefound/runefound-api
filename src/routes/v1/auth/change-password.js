// Module imports
import { koaBody } from 'koa-body'





// Local imports
import {
	INTERNAL_SERVER_ERROR,
	OK,
} from '../../../helpers/httpStatus.js'
import { getAuth } from '../../../helpers/firebase.server.js'
import { POST } from '../../../helpers/httpMethods.js'
import { verifyFirebaseAuthToken } from '../../../middleware/verifyDeviceAuth.js'





export async function handler(context) {
	const { password } = context.request.body

	try {
		await getAuth().updateUser(context.firebaseUser.uid, { password })
		context.status = OK.code
	} catch (error) {
		console.log(error)
		context.status = INTERNAL_SERVER_ERROR.code
	}

	return null
}

export const allowedMethods = [POST]
export const middleware = [verifyFirebaseAuthToken, koaBody()]
