import events from '../events';
import heatmapService from './heatmap';

export default {
	getData() {
		heatmapService.loadHeatmap();
		events.trails.getTrails.emit('getTrails');
		events.markers.getMarkers.emit('getMarkers');
		events.layerStyles.getLayerStyles.emit('getLayerStyles');
	},
};
