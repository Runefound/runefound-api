// Module imports
import { v4 as uuid } from 'uuid'





// Local imports
import { logger } from '../helpers/logger.js'
import * as ACTIONS from '../constants/ACTIONS.js'
// import * as CAPABILITIES from '../constants/CAPABILITIES.js'
// import * as database from '../helpers/database.js'
// import * as TwitchCapabilityManager from './TwitchCapabilityManager.js'





// Constants
const { CONNECTION_PING_ENABLED } = process.env





export class Connection {
	/****************************************************************************\
	 * Public static properties
	\****************************************************************************/

	static collection = {}





	/****************************************************************************\
	 * Private instance properties
	\****************************************************************************/

	#approvedCapabilities = []

	#closeTimeoutID = null

	#id = uuid()

	#isAlive = true

	#isAuthorised = false

	#options = null

	#pingIntervalID = null

	#user = null





	/****************************************************************************\
	 * Constructor
	\****************************************************************************/

	constructor(socket, request) {
		this.#options = {
			request,
			socket,
		}

		Connection.collection[this.id] = this

		logger.info(`Established connection ${this.id} from ${request.headers.host}`)

		this.#start()
	}





	/****************************************************************************\
	 * Private instance methods
	\****************************************************************************/

	#handleMessageWithCapability(parsedMessage) {
		// const { capability } = parsedMessage
		// let errorMessage = null

		// if (!CAPABILITIES[capability]) {
		// 	errorMessage = `${capability} is not a valid capability.`
		// } else if (!this.#approvedCapabilities.includes(capability)) {
		// 	errorMessage = `Connection not approved for the ${capability} capability.`
		// }

		// if (errorMessage) {
		// 	return this.send({
		// 		data: {
		// 			message: errorMessage,
		// 		},
		// 		meta: {
		// 			originalPayload: message,
		// 		},
		// 		status: 'error',
		// 	})
		// }

		// const handlerMethodName = `handle${parsedMessage.action}`

		// let capabilityManager = null

		// switch (capability) {
		// 	case CAPABILITIES.TWITCH:
		// 		capabilityManager = TwitchCapabilityManager
		// 		break
		// }

		// if (typeof TwitchCapabilityManager[handlerMethodName] === 'undefined') {
		// 	return logger.warn(`Received unrecognised action (${parsedMessage.action}) from connection ${this.id}:`, parsedMessage)
		// }

		// TwitchCapabilityManager[handlerMethodName](parsedMessage)
	}

	#handleMessage(message) {
		let parsedMessage = null

		try {
			parsedMessage = JSON.parse(message.toString('utf8'))

			if (!this.#isAuthorised && (parsedMessage.action !== ACTIONS.AUTHORISE)) {
				return this.close('Received messages before authorisation.')
			}
		} catch (error) {
			return this.send({
				status: 'error',
				data: {
					message: 'Invalid JSON.',
				},
				meta: {
					originalPayload: message,
				},
			})
		}

		this.#startPing()

		logger.verbose(`Received message from ${this.id}:`, parsedMessage)

		if (parsedMessage.capability) {
			this.#handleMessageWithCapability(parsedMessage)
		} else {
			const handlerMethodName = `handle${parsedMessage.action}`

			if (typeof this[handlerMethodName] === 'undefined') {
				return logger.warn(`Received unrecognised action (${parsedMessage.action}) from connection ${this.id}:`, parsedMessage)
			}

			this[handlerMethodName](parsedMessage)
		}
	}

	#ping() {
		logger.verbose(`Pinging connection ${this.id}`)

		this.send({ action: ACTIONS.PING })

		this.#closeTimeoutID = setTimeout(() => this.close('missing heartbeat'), process.env.CONNECTION_PING_RESPONSE_TIMEOUT)
	}

	async #start() {
		this.socket.on('message', message => this.#handleMessage(message))

		this.#startPing()
	}

	#startPing() {
		if (CONNECTION_PING_ENABLED) {
			clearTimeout(this.#pingIntervalID)
			this.#pingIntervalID = setInterval(() => this.#ping(), process.env.CONNECTION_PING_FREQUENCY)
		}
	}





	/****************************************************************************\
	 * Public instance methods
	\****************************************************************************/

	close(reason = 'unknown') {
		logger.warn(`Closing connection ${this.id}. Reason: ${reason}`)
		delete Connection.collection[this.id]
		clearTimeout(this.#closeTimeoutID)
		clearInterval(this.#pingIntervalID)
		this.socket.terminate()
	}

	// async handleAUTHORISE(message) {
	// 	const {
	// 		clientID,
	// 		clientSecret,
	// 	} = message.data

	// 	const clientSecretObject = await database.getAPIClientSecret(clientID)

	// 	if (clientSecretObject.secret !== clientSecret) {
	// 		return this.close('Invalid authorisation.')
	// 	}

	// 	this.#clientData = await database.getAPIClient(clientID)
	// 	this.#clientID = clientID
	// 	this.#user = await database.getUser(this.#clientData.ownerID)

	// 	this.#isAuthorised = true

	// 	this.send({
	// 		action: ACTIONS.READY,
	// 		data: {
	// 			user: this.#user,
	// 		},
	// 	})

	// 	logger.info(`Connection ${this.id} has been successfully authenticated by ${this.#user.displayName}`)
	// }

	// async handleREQUESTCAPABILITIES(message) {
	// 	const approved = []
	// 	const unrecognised = []

	// 	for (const capability of message.data) {
	// 		switch (capability) {
	// 			case CAPABILITIES.TWITCH:
	// 				await this.#enableTwitchCapabilities()
	// 				break

	// 			default:
	// 				unrecognised.push(capability)
	// 				continue
	// 		}

	// 		approved.push(capability)
	// 	}

	// 	this.#approvedCapabilities = approved

	// 	this.send({
	// 		action: ACTIONS.REQUESTCAPABILITIES,
	// 		data: {
	// 			approved,
	// 			unrecognised,
	// 		},
	// 	})

	// 	logger.info(`Capabilities requested by connection ${this.id}:`, {
	// 		approved,
	// 		unrecognised,
	// 	})
	// }

	handlePING(message) {
		const response = { action: ACTIONS.PONG }

		if (message.data) {
			response.data = message.data
		}

		this.send(response)
	}

	handlePONG() {
		clearTimeout(this.#closeTimeoutID)
	}

	send(data) {
		const fullMessage = {
			...data,
			meta: {
				...(data.meta || {}),
				sentAt: Date.now(),
			},
		}
		const stringifiedData = JSON.stringify(fullMessage)

		logger.verbose(`Sending message to connection ${this.id}:`, fullMessage)

		this.socket.send(stringifiedData)
	}





	/****************************************************************************\
	 * Public instance getters/setters
	\****************************************************************************/

	get id() {
		return this.#id
	}

	get isAlive() {
		return this.#isAlive
	}

	get options() {
		return this.#options
	}

	get request() {
		return this.#options.request
	}

	get socket() {
		return this.#options.socket
	}
}
