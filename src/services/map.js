import mapboxgl from 'mapbox-gl';
import config from '../config';
import events from '../events';
import dataService from './data';
import eventsService from './events';
import layerStyles from '../store/modules/layerStyles';
import layers from '../store/modules/layers';
import mapSettings from '../store/modules/mapSettings';
import mapStyles from '../store/modules/mapStyles';
import markers from '../store/modules/markers';
import splashScreen from '../store/modules/splashScreen';

export default {
	accessToken: config.map.accessToken,
	hillshade: config.hillshade,
	layerStyles: config.layerStyles,
	mapControls: config.map.controls,
	mapOptions: {
		center: config.map.options.center,
		container: config.map.options.container,
		style: mapStyles.state.mapStyles.outdoors.url,
		zoom: config.map.options.zoom,
	},
	mapStyle: mapStyles.state.mapStyles.outdoors,
	markers: config.markers,

	/* instantiate map instance */
	loadMap() {
		mapboxgl.accessToken = this.accessToken;

		this.map = new mapboxgl.Map(this.mapOptions)
			.addControl(new mapboxgl.NavigationControl(), this.mapControls.navigationControl.position)
			/* once layers and markers loaded, hide splash screen */
			.on('data', () => {
				if (layerStyles.state.layerStyles.length === Object.keys(this.layerStyles).length &&
						markers.state.markers.length === Object.keys(this.markers).length &&
						splashScreen.state.splashScreen.active) {
					events.splashScreen.hideSplashScreen.emit('hideSplashScreen');
				}
			})
			.on('load', () => {
				this.addHillShading();
				eventsService.setEvents();
				dataService.getData();
			})
			.on('render', () => {
				this.setMapSettings();
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

	getMapStyle() {
		events.mapStyles.setMapStyle.emit('setMapStyle', this.mapStyle.name);
		events.mapStyles.getMapStyle.emit('getMapStyle');
	},

	setLayerStyleVisibility(i) {
		const layer = layers.state.layers[i];

		layer.active ?
			this.map.setLayoutProperty(layer.class, 'visibility', 'visible') :
			this.map.setLayoutProperty(layer.class, 'visibility', 'none');
	},

	setMapSettings() {
		const settings = {
			bearing: this.map.getBearing(),
			bounds: this.map.getBounds(),
			center: this.map.getCenter(),
			pitch: this.map.getPitch(),
			zoom: this.map.getZoom(),
		};

		if (settings.bounds._ne.lat !== mapSettings.state.mapSettings.bounds._ne.lat ||
			settings.bounds._ne.lng !== mapSettings.state.mapSettings.bounds._ne.lng ||
			settings.bounds._sw.lat !== mapSettings.state.mapSettings.bounds._sw.lat ||
			settings.bounds._sw.lng !== mapSettings.state.mapSettings.bounds._sw.lng) {
			events.mapSettings.setMapSettings.emit('setMapSettings', settings);
		}
	},

	setMapStyle() {
		this.getMapStyle();
		this.map.setStyle(this.mapStyle.url);

		/* add hillshading and layer styles after 1 sec delay to set map style */
		setTimeout(() => {
			if (this.mapStyle.name === mapStyles.state.mapStyles.outdoors.name) {
				this.addHillShading();
			}

			layerStyles.state.layerStyles.map((layerStyle) => {
				this.addLayerStyle(layerStyle);

				if (layerStyle.layout.visibility === 'visible') {
					this.map.setLayoutProperty(layerStyle.id, 'visibility', 'visible');
				}

				return true;
			});
		}, 1000);
	},
};
