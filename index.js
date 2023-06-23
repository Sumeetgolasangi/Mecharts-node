const app = require('./app');
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
// const io = new Server(server, {
// 	cors: {
// 		origin: ['http://localhost:3000'],
// 	},
// });

server.listen(8080, () => {
	console.info(`Listening to port 8080`);
});

// io.on('connection', (socket) => {
// 	socket.on('canvas', (data) => {
// 		socket.broadcast.emit('canvas', data, () => {
// 		});
// 	});
// });
const exitHandler = () => {
	if (server) {
		server.close(() => {
			logger.info('Server closed');
			process.exit(1);
		});
	} else {
		process.exit(1);
	}
};

const unexpectedErrorHandler = (error) => {
	// logger.error(error);
	exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
	logger.info('SIGTERM received');
	if (server) {
		server.close();
	}
});
