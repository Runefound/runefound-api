/* eslint-disable no-magic-numbers */

// Informational
export const CONTINUE = {
	code: 100,
	message: 'Continue',
}
export const SWITCHING_PROTOCOLS = {
	code: 101,
	message: 'Switching protocols',
}
export const PROCESSING = {
	code: 102,
	message: 'Processing',
}

// Success
export const OK = {
	code: 200,
	message: 'OK',
}
export const CREATED = {
	code: 201,
	message: 'Created',
}
export const ACCEPTED = {
	code: 202,
	message: 'Accepted',
}
export const NON_AUTHORITATIVE_INFORMATION = {
	code: 203,
	message: 'Non-authoritative information',
}
export const NO_CONTENT = {
	code: 204,
	message: 'No content',
}
export const RESET_CONTENT = {
	code: 205,
	message: 'Reset content',
}
export const PARTIAL_CONTENT = {
	code: 206,
	message: 'Partial ccontent',
}
export const MULTI_STATUS = {
	code: 207,
	message: 'Multi-status',
}
export const ALREADY_REPORTED = {
	code: 208,
	message: 'Already reported',
}
export const IM_USED = {
	code: 226,
	message: 'IM Used',
}

// Redirection
export const MULTIPLE_CHOICES = {
	code: 300,
	message: 'Multiple choices',
}
export const MOVED_PERMANENTLY = {
	code: 301,
	message: 'Moved permanently',
}
export const FOUND = {
	code: 302,
	message: 'Found',
}
export const SEE_OTHER = {
	code: 303,
	message: 'See other',
}
export const NOT_MODIFIED = {
	code: 304,
	message: 'Not modified',
}
export const USE_PROXY = {
	code: 305,
	message: 'Use proxy',
}
export const TEMPORARY_REDIRECT = {
	code: 307,
	message: 'Temporary redirect',
}
export const PERMANENT_REDIRECT = {
	code: 308,
	message: 'Permanent redirect',
}

// Client Error
export const BAD_REQUEST = {
	code: 400,
	message: 'Bad request',
}
export const UNAUTHORIZED = {
	code: 401,
	message: 'Unauthorized',
}
export const PAYMENT_REQUIRED = {
	code: 402,
	message: 'Payment required',
}
export const FORBIDDEN = {
	code: 403,
	message: 'Forbidden',
}
export const NOT_FOUND = {
	code: 404,
	message: 'Not found',
	description: 'Whatever you were looking for... well, it seems to be quite lost. Perhaps you left it back at camp?',
}
export const METHOD_NOT_ALLOWED = {
	code: 405,
	message: 'Method not allowed',
}
export const NOT_ACCEPTABLE = {
	code: 406,
	message: 'Not acceptable',
}
export const PROXY_AUTHENTICATION_REQUIRED = {
	code: 407,
	message: 'Proxy authentication required',
}
export const REQUEST_TIMEOUT = {
	code: 408,
	message: 'Request timeout',
}
export const CONFLICT = {
	code: 409,
	message: 'Conflict',
}
export const GONE = {
	code: 410,
	message: 'Gone',
}
export const LENGTH_REQUIRED = {
	code: 411,
	message: 'Length required',
}
export const PRECONDITION_FAILED = {
	code: 412,
	message: 'Precondition failed',
}
export const PAYLOAD_TOO_LARGE = {
	code: 413,
	message: 'Payload too large',
}
export const URI_TOO_LONG = {
	code: 414,
	message: 'URI too long',
}
export const UNSUPPORTED_MEDIA_TYPE = {
	code: 415,
	message: 'Unsupported media type',
}
export const RANGE_NOT_SATISFIABLE = {
	code: 416,
	message: 'Range not satisfiable',
}
export const EXPECTATION_FAILED = {
	code: 417,
	message: 'Expectation failed',
}
export const IM_A_TEAPOT = {
	code: 418,
	message: 'I\'m a teapot! 🫖',
}
export const MISDIRECTED_REQUEST = {
	code: 421,
	message: 'Misdirected request',
}
export const UNPROCESSABLE_ENTITY = {
	code: 422,
	message: 'Unprocessable entity',
}
export const LOCKED = {
	code: 423,
	message: 'Locked',
}
export const FAILED_DEPENDENCY = {
	code: 424,
	message: 'Failed dependency',
}
export const UPGRADE_REQUIRED = {
	code: 426,
	message: 'Upgrade required',
}
export const PRECONDITION_REQUIRED = {
	code: 428,
	message: 'Precondition required',
}
export const TOO_MANY_REQUESTS = {
	code: 429,
	message: 'Too many requests',
}
export const HEADER_FIELDS_TOO_LARGE = {
	code: 431,
	message: 'Header fields too large',
}
export const CLOSED_WITHOUT_RESPONSE = {
	code: 444,
	message: 'Closed without resposne',
}
export const UNAVAILABLE_FOR_LEGAL_REASONS = {
	code: 451,
	message: 'Unavailable for legal reasons',
}
export const CLIENT_CLOSED_REQUEST = {
	code: 499,
	message: 'Client closed request',
}

// Server Error
export const INTERNAL_SERVER_ERROR = {
	code: 500,
	message: 'Internal server error',
	description: 'Something\'s gone terribly wrong with the incantation. Unfortunately, your spell was just too powerful for us.',
}
export const NOT_IMPLEMENTED = {
	code: 501,
	message: 'Not implemented',
}
export const BAD_GATEWAY = {
	code: 502,
	message: 'Bad gateway',
}
export const SERVICE_UNAVAILABLE = {
	code: 503,
	message: 'Service unavailable',
}
export const GATEWAY_TIMEOUT = {
	code: 504,
	message: 'Gateway timeout',
}
export const HTTP_VERSION_NOT_SUPPORTED = {
	code: 505,
	message: 'HTTP version not supported',
}
export const VARIANT_ALSO_NEGOTIATES = {
	code: 506,
	message: 'Variant also negotiates',
}
export const INSUFFICIENT_STORAGE = {
	code: 507,
	message: 'Insufficient storage',
}
export const LOOP_DETECTED = {
	code: 508,
	message: 'Loop detected',
}
export const NOT_EXTENDED = {
	code: 510,
	message: 'Not extended',
}
export const NETWORK_AUTHENTICATION_REQUIRED = {
	code: 511,
	message: 'Network authentication required',
}
export const NETWORK_CONNECTION_TIMEOUT_ERROR = {
	code: 599,
	message: 'Network connection timeout error',
}

// Helper Functions
export function isInformational(code) {
	return code >= 100 && code < 200
}

export function isSuccess(code) {
	return code >= 200 && code < 300
}

export function isRedirection(code) {
	return code >= 300 && code < 400
}

export function isError(code) {
	return code >= 400 && code < 600
}

export function isClientError(code) {
	return code >= 400 && code < 500
}

export function isServerError(code) {
	return code >= 500 && code < 600
}
