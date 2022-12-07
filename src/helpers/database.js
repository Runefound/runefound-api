// Module imports
import { PrismaClient } from '@prisma/client'





// Constants
const prisma = new PrismaClient()





export function createUser(data) {
	const {
		displayName,
		id,
		username,
	} = data

	return prisma.User.create({
		data: {
			displayName,
			id,
			username,
		},
	})
}

export function getUser(id) {
	return prisma.User.findUnique({
		where: { id },
	})
}

export function getUserByUsername(username) {
	return prisma.User.findFirstOrThrow({
		where: { username },
	})
}
