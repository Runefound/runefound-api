/* eslint-env node */
// Module imports
import {
	cert,
	getApp,
	initializeApp,
} from 'firebase-admin/app'

const {
	FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
	FIREBASE_AUTH_URI,
	FIREBASE_CLIENT_EMAIL,
	FIREBASE_CLIENT_ID,
	FIREBASE_CLIENT_X509_CERT_URL,
	FIREBASE_DATABASE_URL,
	FIREBASE_PRIVATE_KEY_ID,
	FIREBASE_PRIVATE_KEY,
	FIREBASE_PROJECT_ID,
	FIREBASE_TOKEN_URI,
	FIREBASE_TYPE,
} = process.env

try {
	getApp()
} catch (error) {
	initializeApp({
		credential: cert({
			/* eslint-disable camelcase */
			auth_provider_x509_cert_url: FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
			auth_uri: FIREBASE_AUTH_URI,
			client_email: FIREBASE_CLIENT_EMAIL,
			client_id: FIREBASE_CLIENT_ID,
			client_x509_cert_url: FIREBASE_CLIENT_X509_CERT_URL,
			private_key_id: FIREBASE_PRIVATE_KEY_ID,
			private_key: FIREBASE_PRIVATE_KEY,
			project_id: FIREBASE_PROJECT_ID,
			token_uri: FIREBASE_TOKEN_URI,
			type: FIREBASE_TYPE,
			/* eslint-enable camelcase */
		}),
		databaseURL: FIREBASE_DATABASE_URL,
	})
}

export { getApp }
export { getAuth } from 'firebase-admin/auth'
