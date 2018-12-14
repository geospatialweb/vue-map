import mapService from './map.service';
import markerDisplayService from './markerDisplay.service';
import store from '../store';

export default {
	setLayer(layer, i) {
		const { layers, layerStyles, layerStylesHash } = store.state;

		/* refresh app */
		if (layer === 'reset') {
			window.location.reload(true);
		/* toggle between 'outdoors' and 'satellite' map styles (basemaps) */
		} else if (layer === 'aerial') {
			mapService.setMapStyle();

			/* hide active markers when changing map styles for aesthetic purposes */
			markerDisplayService.hideMarkers();

			/* show active markers after changing map styles for aesthetic purposes */
			setTimeout(() => markerDisplayService.showMarkers(), 1200);
		/* set style layer visibility */
		} else if (layer === 'biosphere' || layer === 'trails') {
			if (layers[i].active) {
				layerStyles[layerStylesHash[layer]].layout.visibility = 'visible';
				mapService.map.setLayoutProperty(layer, 'visibility', 'visible');

				/* add markers */
				if (layer === 'trails') {
					markerDisplayService.addMarkers(layer);
				}
			} else {
				layerStyles[layerStylesHash[layer]].layout.visibility = 'none';
				mapService.map.setLayoutProperty(layer, 'visibility', 'none');

				/* remove markers */
				if (layer === 'trails') {
					markerDisplayService.removeMarkers(layer);
				}
			}
		/* add or remove markers */
		} else if (layer === 'office' || layer === 'places') {
			layers[i].active ?
				markerDisplayService.addMarkers(layer) :
				markerDisplayService.removeMarkers(layer);
		}
	},

	setLayerActive(i) {
		store.setLayerActive(i);
	},
};
