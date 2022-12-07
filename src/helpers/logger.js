// Module imports
import {
	createLogger,
	format,
	transports,
} from 'winston'





// Constants
const { NODE_ENV } = process.env





export const logger = createLogger({
	level: 'info',
	transports: [
		new transports.File({
			filename: 'logs/error.log',
			format: format.combine(
				format.timestamp(),
				format.json(),
			),
			level: 'error',
		}),
		new transports.File({
			filename: 'logs/combined.log',
			format: format.combine(
				format.timestamp(),
				format.json(),
			),
		}),
	],
})

if (NODE_ENV !== 'production') {
	logger.add(new transports.Console({
		format: format.combine(
			format.colorize(),
			format.simple(),
		),
	}))
}
