require('dotenv').config();

const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const config = require('./config/config');

express()
	.use(morgan(config.morgan.format, {
		stream: fs.createWriteStream(path.resolve(config.morgan.logfile), {
			flags: config.morgan.flags,
		}),
	}))

	.use(express.static(path.resolve(process.env.PUBLIC_ROOT)))

	.use('/data', require('./routes/data'))

	.set('env', process.env.NODE_ENV)

	.set('host', process.env.HOST)

	.set('port', process.env.PORT)

	.set('timeout', process.env.TIMEOUT)

	.listen(process.env.PORT, process.env.HOST, (err) => {
		err ?
			console.error('Server Failed:\n', err) :

			console.log(`Active on http://${process.env.LOCALHOST}:${process.env.PORT} at ` +
                `${new Date().toDateString()} ${new Date().toTimeString()}`);
	});
