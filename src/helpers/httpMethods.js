// Constants
export const DELETE = 'DELETE'
export const GET = 'GET'
export const OPTIONS = 'OPTIONS'
export const PATCH = 'PATCH'
export const POST = 'POST'
export const PUT = 'PUT'





/**
 * @param {string} method The HTTP method to match against.
 * @param {string} input The string to be matched.
 * @returns {boolean} Whether or not the input matches the provided HTTP method.
 */
export function isHTTPMethod(method, input) {
	if (typeof input !== 'string') {
		return false
	}

	return input.toUpperCase() === method
}

/**
 * @param {string} input The string to be matched.
 * @returns {boolean} Whether or not the input matches the GET HTTP method.
 */
export const isDELETE = input => isHTTPMethod(DELETE, input)

/**
 * @param {string} input The string to be matched.
 * @returns {boolean} Whether or not the input matches the GET HTTP method.
 */
export const isGET = input => isHTTPMethod(GET, input)

/**
 * @param {string} input The string to be matched.
 * @returns {boolean} Whether or not the input matches the GET HTTP method.
 */
export const isOPTIONS = input => isHTTPMethod(OPTIONS, input)

/**
 * @param {string} input The string to be matched.
 * @returns {boolean} Whether or not the input matches the GET HTTP method.
 */
export const isPATCH = input => isHTTPMethod(PATCH, input)

/**
 * @param {string} input The string to be matched.
 * @returns {boolean} Whether or not the input matches the GET HTTP method.
 */
export const isPOST = input => isHTTPMethod(POST, input)

/**
 * @param {string} input The string to be matched.
 * @returns {boolean} Whether or not the input matches the GET HTTP method.
 */
export const isPUT = input => isHTTPMethod(PUT, input)
