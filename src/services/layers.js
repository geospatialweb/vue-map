import events from '../events';
import layers from '../store/modules/layers';
import deckGlService from './deckgl';
import mapService from './map';
import mapStyles from '../store/modules/mapStyles';
import markerDisplayService from './markerDisplay';

export default {
	selectLayer(event) {
		event.stopPropagation();

		const layer = event.target.classList[0];
		const i = layers.state.layers.findIndex(obj => obj.class === layer);
		const j = layers.state.layers.findIndex(obj => obj.class === 'deckgl');
		const k = layers.state.layers.findIndex(obj => obj.class === 'satellite');

		events.layers.setLayerActive.emit('setLayerActive', i);

		if (layer === layers.state.layers[j].class) {
			// events.layers.setLayerActive.emit('setLayerActive', k);

			if (deckGlService.layer.active) {
				if (mapService.mapStyle.name !== mapService.map.currentMapStyle.name) {
					events.layers.setLayerActive.emit('setLayerActive', k);
				}

				mapService.removeHeatmapLayer();
			} else {
				if (!layers.state.layers[k].active) {
					events.layers.setLayerActive.emit('setLayerActive', k);
				}

				this.setLayer(layer, i);
			}
		// } else if (deckGlService.layer.active) {
		// mapService.removeHeatmapLayer();
		// mapService.addHeatmapLayer();
		// }
		} else {
			if (deckGlService.layer.active) {
				mapService.removeHeatmapLayer();
			}

			this.setLayer(layer, i);
		}
	},

	setLayer(layer, i) {
		switch (layer) {
		case 'satellite':
			/* toggle between 'outdoors' and 'satellite' map styles (basemaps) */
			mapService.setMapStyle();

			if (deckGlService.layer.active) {
				mapService.addHeatmapLayer();
			}

			/* hide active markers when changing map styles for aesthetic purposes */
			markerDisplayService.hideMarkers();
			/* show active markers after changing map styles for aesthetic purposes */
			setTimeout(() => markerDisplayService.showMarkers(), 1200);
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

		case 'deckgl':
			if (mapService.mapStyle.name === mapStyles.state.mapStyles.outdoors.name) {
				mapService.setMapStyle();
			}
			/* add deck.gl 'HexagonLayer' heatmap layer */
			mapService.addHeatmapLayer();
			break;

		default:
		}
	},
};
