import EventEmitter from 'events';

export default {
	layers: {
		addLayerStyle: new EventEmitter(),
		getLayerStyles: new EventEmitter(),
		selectLayer: new EventEmitter(),
		setLayerActive: new EventEmitter(),
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
	styles: {
		layer: {
			setLayerStyleActive: new EventEmitter(),
		},
		map: {
			getMapStyle: new EventEmitter(),
			setMapStyle: new EventEmitter(),
			getMapSettings: new EventEmitter(),
			setMapSettings: new EventEmitter(),
			mapSettings: new EventEmitter(),
			mapStyle: new EventEmitter(),
		},
	},
	trails: {
		getTrails: new EventEmitter(),
		selectTrail: new EventEmitter(),
		setTrailActive: new EventEmitter(),
	},
};
