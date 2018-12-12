import mapService from './map.service';
import markersService from './markers.service';
import store from '../store';

export default {
	addMarkers(layer) {
		store.state.markers[markersService.markersHash[layer]]
			.map(marker => marker.addTo(mapService.map));
	},

	removeMarkers(layer) {
		store.state.markers[markersService.markersHash[layer]]
			.map(marker => marker.remove());
	},

	hideMarkers() {
		store.state.markers.map((marker) => {
			const name = marker[0].getElement().classList[0].replace('-marker', '');
			const el = document.querySelector(`div.${name}-marker`);

			if (el) {
				this.removeMarkers(name);
				marker.hidden = true;
			}

			return true;
		});
	},

	showMarkers() {
		store.state.markers.map((marker) => {
			if (marker.hidden) {
				const name = marker[0].getElement().classList[0].replace('-marker', '');

				this.addMarkers(name);
				marker.hidden = false;
			}

			return true;
		});
	},
};
