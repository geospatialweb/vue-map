import mapboxgl from 'mapbox-gl';
import canvasConfig from '../config/canvas.config';
import hillshadeConfig from '../config/hillshade.config';
import mapControlsConfig from '../config/mapControls.config';
import mapStylesConfig from '../config/mapStyles.config';
import dataService from './data.service';
import splashService from './splash.service';
import trailsService from './trails.service';
import store from '../store';

export default {
	accessToken: canvasConfig.accessToken,
	hillshade: hillshadeConfig,
	mapControls: mapControlsConfig,
	mapOptions: {
		container: canvasConfig.container,
		style: mapStylesConfig.outdoors,
		center: canvasConfig.center,
		zoom: canvasConfig.zoom,
	},
	mapStyle: mapStylesConfig.outdoors,
	mapStyles: mapStylesConfig,

	/* instantiate map instance */
	loadMap() {
		let splashElement;

		mapboxgl.accessToken = this.accessToken;

		this.map = new mapboxgl.Map(this.mapOptions)
			.addControl(new mapboxgl.NavigationControl(), this.mapControls.navigationControl.position)
			/* once markers and layers loaded, hide splash screen */
			.on('styledata', () => {
				if (store.state.markers.length === Object.keys(dataService.markers).length &&
						store.state.layerStyles.length === Object.keys(dataService.layerStyles).length &&
						splashElement.className === `${store.state.splash.splashElement.class} active`) {
					splashService.hideSplash();
				}
			})
			.on('load', () => {
				this.addLayerStyle(this.hillshade, this.hillshade.index);
				splashElement = document.querySelector(`${store.state.splash.splashElement.selector}`);

				dataService.getData();
				trailsService.createTrailsHash();
			});
	},

	addLayerStyle(layerStyle, index) {
		if (index) {
			this.map.addSource(layerStyle.source, layerStyle.layer);
		}

		this.map.addLayer(layerStyle, index);
	},

	setMapStyle() {
		this.mapStyle === this.mapStyles.outdoors ?
			this.mapStyle = this.mapStyles.satellite :
			this.mapStyle = this.mapStyles.outdoors;

		this.map.setStyle(this.mapStyle);

		/* add hillshading and layer styles to changed map style after 1 sec delay to load  */
		setTimeout(() => {
			if (this.mapStyle === this.mapStyles.outdoors) {
				this.addLayerStyle(this.hillshade, this.hillshade.index);
			}

			store.state.layerStyles.map((layerStyle) => {
				this.map.addLayer(layerStyle);

				if (layerStyle.layout.visibility === 'visible') {
					this.map.setLayoutProperty(layerStyle.id, 'visibility', 'visible');
				}

				return true;
			});
		}, 1000);
	},
};
