import events from '../events';
import layers from '../store/modules/layers';
import mapService from './map';
import markerDisplayService from './markerDisplay';

export default {
	selectLayer(event) {
		event.stopPropagation();

		const layer = event.target.classList[0];
		const i = layers.state.layers.findIndex(obj => obj.class === layer);

		events.layers.setLayerActive.emit('setLayerActive', i);
		this.setLayer(layer, i);
	},

	setLayer(layer, i) {
		switch (layer) {
		case 'satellite':
			/* hide active markers when changing map styles for aesthetic purposes */
			markerDisplayService.hideMarkers();
			/* toggle between 'outdoors' and 'satellite' map styles (basemaps) */
			mapService.setMapStyle();
			break;

		case 'biosphere':
		case 'trails':
			events.layerStyles.setLayerStyleActive.emit('setLayerStyleActive', layer);
			mapService.setLayerStyleVisibility(i);

			if (layers.state.layers[i].active && layer === 'trails') {
				/* add trails markers */
				markerDisplayService.addMarkers(layer);
			} else if (!layers.state.layers[i].active && layer === 'trails') {
				/* remove trails markers */
				markerDisplayService.removeMarkers(layer);
			}
			break;

		case 'office':
		case 'places':
			/* add or remove markers */
			layers.state.layers[i].active ?
				markerDisplayService.addMarkers(layer) :
				markerDisplayService.removeMarkers(layer);
			break;

		case 'heatmap':
			/* display deck.gl 'HexagonLayer' heatmap layer */
			events.heatmap.setHeatmapActive.emit('setHeatmapActive');
			mapService.displayHeatmap();
			break;

		default:
		}
	},
};
