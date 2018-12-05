'use strict';

import { Axios } from 'axios-observable';
import { data } from '../config/data.config';
import { markers } from '../config/markers.config';
import { layerStyles } from '../config/layerStyles.config';
import { layerStylesService } from './layerStyles.service';
import { mapService } from './map.service';
import { markersService } from './markers.service';

export const dataService = {
	route: data.route,

	/* HTTP request to obtain layer styles from back end PostGIS server */
	getLayerStyles()
	{
		for (const prop in layerStyles)
		{
			const params = {
				fields: layerStyles[prop].fields,
				table: layerStyles[prop].name
			};

			const subscription = Axios
				.get(this.route, { params })
				.subscribe(res =>
				{
					if (res.data)
					{
						const layerStyle = layerStyles[prop].layer;
						layerStyle.source.data = res.data;

						layerStylesService.pushLayerStyle(layerStyle);
						mapService.addLayerStyle(layerStyle);
					}
					else
					{
						console.error('Data Error:\n', res.data);
					}
				},
				(err) =>
				{
					console.log('Query Failed:\n', err.error);
				},
				() =>
				{
					if (layerStylesService.layerStyles.length === Object.keys(layerStyles).length) {
						layerStylesService.createLayerStylesHash();
					}

					subscription.unsubscribe();
				});
		}
	},

	/* HTTP request to obtain markers from back end PostGIS server */
	getMarkers()
	{
		for (const prop in markers)
		{
			let params = {
				fields: markers[prop].fields,
				table: markers[prop].name
			};

			const subscription = Axios
				.get(this.route, { params })
				.subscribe(res =>
				{
					res.data ?
						markersService.setMarkers(markers[prop].name, res.data) :
						console.error('Data Error:\n', res.data);
				},
				(err) =>
				{
					console.error('Query Failed:\n', err.error);
				},
				() =>
				{
					if (markersService.markers.length === Object.keys(markers).length) {
						markersService.createMarkersHash();
					}

					subscription.unsubscribe();
				});
		}
	}
};
