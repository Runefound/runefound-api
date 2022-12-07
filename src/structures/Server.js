import 'dotenv/config'

// Module imports
import { createServer } from 'node:http'
import { WebSocketServer } from 'ws'





// Local imports
import { API } from './API.js'
import { Connection } from './Connection.js'
import { logger } from '../helpers/logger.js'





// Local constants
const { PORT } = process.env





export class Server {
	/****************************************************************************\
	 * Private instance properties
	\****************************************************************************/

	#api = new API

	#httpServer = null

	#isInitialised = false

	#websocketServer = null





	/****************************************************************************\
	 * Private instance methods
	\****************************************************************************/

	async #initialise() {
		if (this.#isInitialised) {
			return
		}

		this.#isInitialised = true

		await this.#api.start()

		// Create the Websocket server
		this.#websocketServer = new WebSocketServer({ noServer: true })

		// Create the HTTP server, using Koa as the request handler
		this.#httpServer = createServer(this.#api.callback())

		// Proxy connections from the HTTP server to the websocket server
		this.#httpServer.on('upgrade', (...args) => this.handleUpgrade(...args))

		// Handle new connections on the websocket server
		this.#websocketServer.on('connection', (...args) => new Connection(...args))
	}





	/****************************************************************************\
	 * Public instance methods
	\****************************************************************************/

	async handleUpgrade(request, socket, head) {
		try {
			this.#websocketServer.handleUpgrade(request, socket, head, (ws) => {
				this.#websocketServer.emit('connection', ws, request)
			})
		} catch(err) {
			// Socket uprade failed; close it and clean up
			logger.error('Socket upgrade failed', err)
			socket.destroy()
		}
	}

	async start() {
		await this.#initialise()
		this.#httpServer.listen(PORT, () => logger.info(`Server is listening on port ${PORT}...`))
	}





	/****************************************************************************\
	 * Public instance getters/setters
	\****************************************************************************/

	get websocketServer() {
		return this.#websocketServer
	}
}
