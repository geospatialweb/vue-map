import ee from '../events';
import heatmapService from './heatmap';

export default {
	getData() {
		heatmapService.loadHeatmap();
		ee.emit('getTrails');
		ee.emit('getMarkers');
		ee.emit('getLayerStyles');
	},
};
