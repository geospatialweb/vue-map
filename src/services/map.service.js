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
	accessToken: canvas.accessToken,
	layerStyles,
	mapControls,
	mapOptions: {
		container: canvas.container,
		style: mapStyles.default,
		center: canvas.center,
		zoom: canvas.zoom,
	},
	mapStyle: mapStyles.default,
	mapStyles,
	markers,
	splash,

	/* instantiate map instance */
	loadMap() {
		let splashElement;

		mapboxgl.accessToken = this.accessToken;

		this.map = new mapboxgl.Map(this.mapOptions)
			.addControl(new mapboxgl.NavigationControl(), this.mapControls.navigationControl.position)
			/* once layers and markers loaded, hide splash screen */
			.on('styledata', () => {
				if (markersService.markers.length === Object.keys(this.markers).length
						&& layerStylesService.layerStyles.length === Object.keys(this.layerStyles).length
						&& splashElement.className === `${this.splash.splashElement.class} active`) {
					splashService.hideSplash();
				}
			})
			.on('load', () => {
				splashElement = document.querySelector(`${this.splash.splashElement.selector}`);

				dataService.getMarkers();
				dataService.getLayerStyles();
				trailsService.createTrailsHash();
			});
	},

	addLayerStyle(layerStyle) {
		this.map.addLayer(layerStyle);
	},

	changeMapStyle() {
		if (this.mapStyle === this.mapStyles.default) {
			this.mapStyle = this.mapStyles.outdoors;
		} else {
			this.mapStyle = this.mapStyles.default;
		}

		this.map.setStyle(this.mapStyle);

		/* add layers to new map style after delay for aesthetic purposes */
		layerStylesService.layerStyles.map((layerStyle) => {
			setTimeout(() => {
				this.map.addLayer(layerStyle);

				if (layerStyle.layout.visibility === 'visible') {
					this.map.setLayoutProperty(layerStyle.id, 'visibility', 'visible');
				}
			}, 1000);

			return true;
		});
	},
};
