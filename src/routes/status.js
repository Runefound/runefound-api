// Local imports
import { GET } from '../helpers/httpMethods.js'
import * as httpStatus from '../helpers/httpStatus.js'





export function handler(context) {
	context.status = httpStatus.NO_CONTENT.code
}

export const allowedMethods = [GET]
