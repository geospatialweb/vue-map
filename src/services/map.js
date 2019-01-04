import mapboxgl from 'mapbox-gl';
import config from '../config/config.json';
import dataService from './data';
import ee from '../events';
import heatmap from '../store/modules/heatmap';
import heatmapService from './heatmap';
import layers from '../store/modules/layers';
import layersService from './layers';
import layerStyles from '../store/modules/layerStyles';
import mapSettings from '../store/modules/mapSettings';
import mapStyles from '../store/modules/mapStyles';
import markerDisplayService from './markerDisplay';
import markers from '../store/modules/markers';
import splashScreen from '../store/modules/splashScreen';

export default {
	accessToken: config.map.accessToken,
	heatmap: config.heatmap.settings,
	hillshade: config.hillshade,
	layerStyles: config.layerStyles,
	mapControls: config.map.controls,
	mapOptions: {
		center: config.map.options.center,
		container: config.map.options.container,
		style: mapStyles.state.mapStyles.outdoors.url,
		minZoom: config.map.options.minZoom,
		maxZoom: config.map.options.maxZoom,
		zoom: config.map.options.zoom,
	},
	mapStyle: mapStyles.state.mapStyles.outdoors,
	markers: config.markers,

	/* instantiate map instance */
	loadMap() {
		mapboxgl.accessToken = this.accessToken;

		this.map = new mapboxgl.Map(this.mapOptions)
			.addControl(new mapboxgl.NavigationControl(), this.mapControls.navigationControl.position)
			/* once layer styles and markers loaded, hide splash screen */
			.on('data', () => {
				if (layerStyles.state.layerStyles.length === Object.keys(this.layerStyles).length &&
						markers.state.markers.length === Object.keys(this.markers).length &&
						splashScreen.state.splashScreen.active) {
					ee.emit('hideSplashScreen');
				}
			})
			.on('load', () => {
				this.addHillShading();
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

		if (heatmapService.heatmap && !heatmap.state.heatmap.active &&
				layerStyle.id === heatmapService.heatmap.id) {
			this.map.setLayoutProperty(layerStyle.id, 'visibility', 'none');
		}
	},

	displayHeatmap() {
		const i = layers.state.layers.findIndex(
			obj => obj.class === mapStyles.state.mapStyles.satellite.name,
		);

		if (heatmap.state.heatmap.active) {
			ee.emit('setTrailsDisabled');

			this.map.bearing = mapSettings.state.mapSettings.bearing;
			this.map.center = mapSettings.state.mapSettings.center;
			this.map.pitch = mapSettings.state.mapSettings.pitch;
			this.map.mapStyle = this.mapStyle;
			this.map.zoom = mapSettings.state.mapSettings.zoom;

			this.map.setBearing(this.heatmap.bearing);
			this.map.setCenter(this.heatmap.center);
			this.map.setPitch(this.heatmap.pitch);
			this.map.setZoom(this.heatmap.zoom);

			if (this.mapStyle.name === mapStyles.state.mapStyles.outdoors.name) {
				ee.emit('setLayerActive', i);
				layersService.setLayer(layers.state.layers[i].class, i);
			} else {
				this.map.setLayoutProperty(heatmapService.heatmap.id, 'visibility', 'visible');
			}
		} else {
			ee.emit('setTrailsDisabled');
			heatmapService.reinitializeHeatmap();

			this.map.setBearing(this.map.bearing);
			this.map.setCenter(this.map.center);
			this.map.setLayoutProperty(heatmapService.heatmap.id, 'visibility', 'none');
			this.map.setPitch(this.map.pitch);
			this.map.setZoom(this.map.zoom);

			layerStyles.state.layerStyles.map((layerStyle) => {
				if (layerStyle.layout.visibility === 'visible') {
					this.map.setLayoutProperty(layerStyle.id, 'visibility', 'none');
				}

				return true;
			});

			if (this.mapStyle.name !== this.map.mapStyle.name) {
				ee.emit('setLayerActive', i);
				layersService.setLayer(layers.state.layers[i].class, i);
			} else if (this.map.mapStyle.name === mapStyles.state.mapStyles.outdoors.name) {
				markerDisplayService.hideMarkers();

				setTimeout(() => {
					layerStyles.state.layerStyles.map((layerStyle) => {
						if (layerStyle.layout.visibility === 'visible') {
							this.map.setLayoutProperty(layerStyle.id, 'visibility', 'visible');
						}

						return true;
					});

					markerDisplayService.showMarkers();
				}, 1250);
			} else if (this.map.mapStyle.name === mapStyles.state.mapStyles.satellite.name) {
				layerStyles.state.layerStyles.map((layerStyle) => {
					if (layerStyle.layout.visibility === 'visible') {
						this.map.setLayoutProperty(layerStyle.id, 'visibility', 'visible');
					}

					return true;
				});
			}
		}
	},

	getMapStyle() {
		ee.emit('setMapStyle', this.mapStyle.name);
		ee.emit('getMapStyle');
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
			ee.emit('setMapSettings', settings);
		}
	},

	setMapStyle() {
		this.getMapStyle();

		if (heatmap.state.heatmap.active &&
				this.mapStyle.name === mapStyles.state.mapStyles.satellite.name) {
			this.map.removeLayer(this.hillshade.id);
		}

		this.map.setStyle(this.mapStyle.url);

		/* add hillshading, layer styles and active markers after 1.25 sec delay to set map style */
		setTimeout(() => {
			if (this.mapStyle.name === mapStyles.state.mapStyles.outdoors.name) {
				this.addHillShading();
			}

			heatmapService.addHeatmap();

			if (!heatmap.state.heatmap.active) {
				this.map.setLayoutProperty(heatmapService.heatmap.id, 'visibility', 'none');
			}

			layerStyles.state.layerStyles.map((layerStyle) => {
				this.addLayerStyle(layerStyle);

				if (layerStyle.layout.visibility === 'visible') {
					this.map.setLayoutProperty(layerStyle.id, 'visibility', 'visible');
				}

				return true;
			});

			markerDisplayService.showMarkers();
		}, 1250);
	},
};
