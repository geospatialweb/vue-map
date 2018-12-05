'use strict';

const express = require('express');
const geojson = require('../modules/geojson');
const { Pool } = require('pg');

module.exports =
	express.Router()
		.get('/', (req, res) =>
{
	const sql = `SELECT ${req.query.fields} FROM ${req.query.table}`;

	const pool = new Pool({
		/* local instance process.env.DATABASE_URL_LOCAL */
		connectionString: process.env.DATABASE_URL
	})
		.on('error', err =>
		{
			console.error('Connection Failed:\n', err);
			process.exit(-1);
		});

	pool.query(sql, (err, rows) =>
	{
		err ?
			console.error('Query Failed:\n', err) :

			rows.rowCount > 0 ?
				res.status(200).send(geojson(rows.rows)) :
				console.error('No rows found:\n', sql);

		pool.end();
	});
});
