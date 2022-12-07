// Module imports
import compress from 'koa-compress'
import cors from '@koa/cors'
import Koa from 'koa'
import KoaRouter from 'koa-router'
import logger from 'koa-logger'
import noTrailingSlash from 'koa-no-trailing-slash'
import path from 'node:path'





// Local imports
import { routerisePath } from '../helpers/routerisePath.js'
// import bodyBuilder from '../helpers/bodyBuilderMiddleware.js'
// import statusCodeGenerator from '../helpers/statusCodeGeneratorMiddleware.js'





export class API {
	/****************************************************************************\
	 * Private instance properties
	\****************************************************************************/

	#app = new Koa

	#router = new KoaRouter





	/****************************************************************************\
	 * Private instance methods
	\****************************************************************************/

	#initialiseMiddleware() {
		this.#app.use(logger())
		this.#app.use(noTrailingSlash())
		this.#app.use(compress())
		this.#app.use(cors())
	}

	async #initialiseRouter() {
		const subRouter = await routerisePath(path.resolve(process.cwd(), 'src', 'routes'), '/')

		this.#router.use(subRouter.routes(), subRouter.allowedMethods())

		this.#app.use(this.#router.routes(), this.#router.allowedMethods())
	}





	/****************************************************************************\
	 * Public instance methods
	\****************************************************************************/

	callback() {
		return this.#app.callback()
	}

	async start() {
		await this.#initialiseMiddleware()
		await this.#initialiseRouter()
	}





	/****************************************************************************\
	 * Public instance getters/setters
	\****************************************************************************/

	get app() {
		return this.#app
	}

	get router() {
		return this.#router
	}
}
