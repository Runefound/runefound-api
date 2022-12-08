// Local imports
import { GET } from '../helpers/httpMethods.js'
import { OK } from '../helpers/httpStatus.js'





export function handler(context) {
	context.status = OK.code
	context.body = { healthy: true }
}

export const allowedMethods = [GET]
