import ee from '../events';
import layersService from './layers';
import mapService from './map';
import markersService from './markers';
import trailsService from './trails';

export default {
	setEvents() {
		ee.on('selectLayer', event => layersService.selectLayer(event));
		ee.on('addLayerStyle', layerStyle => mapService.addLayerStyle(layerStyle));
		ee.on('loadMap', () => mapService.loadMap());
		ee.on('mapSettings', (mapSettings) => {
			mapService.mapSettings = mapSettings;
			return true;
		});
		ee.on('mapStyle', (mapStyle) => {
			mapService.mapStyle = mapStyle;
			return true;
		});
		ee.on('setMarker', (marker, data) => markersService.setMarker(marker, data));
		ee.on('selectTrail', event => trailsService.selectTrail(event));
	},
};
