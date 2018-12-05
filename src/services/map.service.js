'use strict';

import mapboxgl from 'mapbox-gl';
import { canvas } from '../config/canvas.config';
import { layerStyles } from '../config/layerStyles.config';
import { mapControls } from '../config/mapControls.config';
import { mapStyles } from '../config/mapStyles.config';
import { markers } from '../config/markers.config';
import { splash } from '../config/splash.config';
import { dataService } from './data.service';
import { layerStylesService } from './layerStyles.service';
import { markersService } from './markers.service';
import { splashService } from './splash.service';
import { trailsService } from './trails.service';

export const mapService = {
	mapOptions: {
		container: canvas.container,
		style:  mapStyles.default,
		center: canvas.center,
		zoom: canvas.zoom
	},

	mapStyle: mapStyles.default,

	/* instantiate map instance */
	loadMap()
	{
		mapboxgl.accessToken = canvas.accessToken;

		this.map = new mapboxgl.Map(this.mapOptions)
			.addControl(new mapboxgl.NavigationControl(), mapControls.navigationControl.position)
			/* once markers and layers loaded, hide splash screen */
			.on('styledata', () =>
			{
				if (markersService.markers.length === Object.keys(markers).length &&
					layerStylesService.layerStyles.length === Object.keys(layerStyles).length &&
					splashService.splashElement.className === splash.splashElement.className)
				{
					splashService.hideSplash();
				}
			})
			.on('load', () =>
			{
				splashService.splashElement = document.querySelector(`${splash.splashElement.selector}`);

				dataService.getMarkers();
				dataService.getLayerStyles();
				trailsService.createTrailsHash();
			});
	},

	addLayerStyle(layerStyle)
	{
		this.map.addLayer(layerStyle);
	},

	changeMapStyle()
	{
		this.mapStyle === mapStyles.default ?
			this.mapStyle = mapStyles.outdoors :
			this.mapStyle = mapStyles.default;

		this.map.setStyle(this.mapStyle);

		/* add layers to new map style after delay for aesthetic purposes */
		layerStylesService.layerStyles.map(layerStyle =>
		{
			setTimeout(() =>
			{
				this.map.addLayer(layerStyle);

				if (layerStyle.layout.visibility === 'visible') {
					this.map.setLayoutProperty(layerStyle.id, 'visibility', 'visible');
				}
			}, 1000)
		});
	}
};
