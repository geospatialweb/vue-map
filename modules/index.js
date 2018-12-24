const { Pool } = require('pg');
const config = require('../config');

module.exports = (socket) => {
	socket.on(config.socket.event, (params) => {
		const query = 'SELECT row_to_json(fc) ' +
			'FROM (SELECT \'FeatureCollection\' As type, array_to_json(array_agg(f)) As features ' +
			'FROM (SELECT\'Feature\' As type, ' +
				'ST_AsGeoJSON(t.geom)::json As geometry, ' +
				`row_to_json((SELECT p FROM (SELECT ${params.fields}) As p)) As properties ` +
			`FROM ${params.table} As t) As f) As fc`;

		const pool = new Pool({
			/* local instance process.env.DATABASE_URL_LOCAL */
			connectionString: process.env.DATABASE_URL,
		})
			.on('error', (err) => {
				console.error('Connection Failed:\n', err);
				process.exit(-1);
			});

		pool.query(query, (err, rows) => {
			if (err) {
				console.error('Query Failed:\n', err);
			} else if (rows.rowCount > 0) {
				const geojson = rows.rows[0].row_to_json;
				delete geojson.features[0].properties.st_asgeojson;

				socket.emit(params.table, geojson);
			} else {
				console.error('No rows found:\n', query);
			}

			pool.end();
		});
	});
};
