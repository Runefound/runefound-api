// Module imports
import fs from 'node:fs/promises'
import KoaRouter from 'koa-router'
import path from 'node:path'





export async function routerisePath(localBasePath, basePath) {
	const router = new KoaRouter
	const directoryContents = await fs.readdir(localBasePath)

	for (const item of directoryContents) {
		const localItemPath = path.join(localBasePath, item)
		const itemExtension = path.extname(item)
		const itemPath = path.join(basePath, item.replace(itemExtension, ''))
		const itemStats = await fs.stat(localItemPath)

		if (itemStats.isDirectory()) {
			const subRouter = await routerisePath(localItemPath, itemPath)
			router.use(subRouter.routes())
		} else {
			const {
				allowedMethods,
				handler,
				middleware = [],
			} = await import(localItemPath)

			allowedMethods.forEach(method => {
				const combinedMiddleware = [...middleware, handler]
				router[method.toLowerCase()](itemPath, ...combinedMiddleware)
			})
		}
	}

	return router
}
