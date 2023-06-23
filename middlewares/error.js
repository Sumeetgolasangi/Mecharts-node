const config = require('../config/config');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');

const getErrorMessage = (err) => {
	let message = err.message;
	try {
		const details = err?.details?.get('body')?.details;
		if (Array.isArray(details)) {
			for (const i in details) {
				message += `\n ${i + 1}. ${details[i].message}`;
			}
		}
	} catch (e) {}
	return message;
};

// eslint-disable-next-line no-unused-vars
const errorConverter = (err, req, res, next) => {
	let error = err;

	if (!(error instanceof ApiError)) {
		const statusCode = error.statusCode ? 400 : 500;
		const message = getErrorMessage(err) || 'Internal Server Error';
		error = new ApiError(statusCode, message, false, err.stack);
	}
	next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
	let { statusCode, message } = err;
	// if (config.env === 'production' && !err.isOperational) {
	// 	statusCode = 500;
	// 	message = 'Internal Server Error';
	// }

	res.locals.errorMessage = err.message;

	const response = {
		code: statusCode,
		message,
		...(config.env === 'development' && { stack: err.stack }), // send error stack in dev mode
	};

	logger.error(err, err.stack);

	res.status(statusCode).send(response);
};

module.exports = {
	errorConverter,
	errorHandler,
};
