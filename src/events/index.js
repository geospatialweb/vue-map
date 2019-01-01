import EventEmitter from 'events';

export default {
	heatmap: {
		setHeatmapActive: new EventEmitter(),
	},
	layers: {
		selectLayer: new EventEmitter(),
		setLayerActive: new EventEmitter(),
	},
	layerStyles: {
		addLayerStyle: new EventEmitter(),
		getLayerStyles: new EventEmitter(),
		setLayerStyleActive: new EventEmitter(),
	},
	map: {
		loadMap: new EventEmitter(),
	},
	mapSettings: {
		getMapSettings: new EventEmitter(),
		setMapSettings: new EventEmitter(),
		mapSettings: new EventEmitter(),
	},
	mapStyles: {
		getMapStyle: new EventEmitter(),
		setMapStyle: new EventEmitter(),
		mapStyle: new EventEmitter(),
	},
	markers: {
		getMarkers: new EventEmitter(),
		loadMarker: new EventEmitter(),
		setMarker: new EventEmitter(),
		setMarkerActive: new EventEmitter(),
		setMarkerHidden: new EventEmitter(),
	},
	splashScreen: {
		hideSplashScreen: new EventEmitter(),
	},
	trails: {
		getTrails: new EventEmitter(),
		selectTrail: new EventEmitter(),
		setTrailActive: new EventEmitter(),
	},
};
