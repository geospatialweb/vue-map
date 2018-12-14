import mapService from './map.service';
import store from '../store';

export default {
	addMarkers(layer) {
		store.state.markers[store.state.markersHash[layer]]
			.map((marker) => {
				marker._state = 'active';
				marker.addTo(mapService.map);
				return true;
			});
	},

	removeMarkers(layer) {
		store.state.markers[store.state.markersHash[layer]]
			.map((marker) => {
				marker._state = 'inactive';
				marker.remove();
				return true;
			});
	},

	hideMarkers() {
		store.state.markers.map((layer) => {
			const name = layer[0].getElement().classList[0].replace('-marker', '');
			const el = document.querySelector(`div.${name}-marker`);

			if (el) {
				store.setMarkersActive(layer);
				this.removeMarkers(name);
			}

			return true;
		});
	},

	showMarkers() {
		store.state.markers.map((layer) => {
			if (layer.hidden) {
				const name = layer[0].getElement().classList[0].replace('-marker', '');

				store.setMarkersActive(layer);
				this.addMarkers(name);
			}

			return true;
		});
	},
};
