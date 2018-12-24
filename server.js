require('dotenv').config();

const express = require('express');
const fs = require('fs');
const http = require('http');
const morgan = require('morgan');
const path = require('path');
const socketio = require('socket.io');
const config = require('./config');
const markers = require('./modules');
const routes = require('./routes');

const app = express()
	.use(express.static(path.resolve(process.env.PUBLIC_ROOT)))
	.use('/api/geojson', routes)
	.use(morgan(config.morgan.format, {
		stream: fs.createWriteStream(path.resolve(config.morgan.logfile), {
			flags: config.morgan.flags,
		}),
	}))

	.set('env', process.env.NODE_ENV)
	.set('host', process.env.HOST)
	.set('port', process.env.PORT || 80);

const server = http.createServer(app)
	.listen(process.env.PORT, process.env.HOST, (err) => {
		err ?
			console.error('Server Failed:\n', err) :

			console.log(`Active on http://localhost:${process.env.PORT} at ` +
                `${new Date().toDateString()} ${new Date().toTimeString()}`);
	});

const io = socketio.listen(server);
io.on('connection', socket => markers(socket));
