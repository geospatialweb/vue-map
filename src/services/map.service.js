import mapboxgl from 'mapbox-gl';
import canvasConfig from '../config/canvas.config';
import hillshadeConfig from '../config/hillshade.config';
import mapControlsConfig from '../config/mapControls.config';
import dataService from './data.service';
import store from '../store';

export default {
	accessToken: canvasConfig.accessToken,
	hillshade: hillshadeConfig,
	mapControls: mapControlsConfig,
	mapOptions: {
		container: canvasConfig.container,
		style: store.getMapStyle().url,
		center: canvasConfig.center,
		zoom: canvasConfig.zoom,
	},
	mapStyle: store.getMapStyle(),

	/* instantiate map instance */
	loadMap() {
		mapboxgl.accessToken = this.accessToken;

		this.map = new mapboxgl.Map(this.mapOptions)
			.addControl(new mapboxgl.NavigationControl(), this.mapControls.navigationControl.position)
			/* once layers and markers loaded, hide splash screen */
			.on('styledata', () => {
				if (store.state.layerStyles.length === Object.keys(dataService.layerStyles).length &&
						store.state.markers.length === Object.keys(dataService.markers).length &&
						store.state.splashScreen.active) {
					store.setSplashScreen();
				}
			})
			.on('load', () => {
				this.addHillShading();
				dataService.getData();
			});
	},

	/* add hillshading to 'outdoors' map style */
	addHillShading() {
		this.addLayerStyle(this.hillshade, this.hillshade.index);
	},

	addLayerStyle(layerStyle, index) {
		if (index) {
			this.map.addSource(layerStyle.source, layerStyle.layer);
		}

		this.map.addLayer(layerStyle, index);
	},

	setMapStyle() {
		store.setMapStyle(this.mapStyle.name);
		this.mapStyle = store.getMapStyle();

		this.map.setStyle(this.mapStyle.url);

		/* add hillshading and layer styles after 1 sec delay to set map style */
		setTimeout(() => {
			if (this.mapStyle.name === store.state.mapStyles.outdoors.name) {
				this.addHillShading();
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
