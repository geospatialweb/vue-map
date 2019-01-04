import ee from '../events';
import mapService from './map';
import markers from '../store/modules/markers';

export default {
	addMarkers(layer) {
		markers.state.markers[markers.state.markersHash[layer]]
			.map((marker) => {
				ee.emit('setMarkerActive', marker);
				marker.addTo(mapService.map);
				return true;
			});
	},

	removeMarkers(layer) {
		markers.state.markers[markers.state.markersHash[layer]]
			.map((marker) => {
				ee.emit('setMarkerActive', marker);
				marker.remove();
				return true;
			});
	},

	hideMarkers() {
		markers.state.markers.map((marker) => {
			const name = marker[0].getElement().classList[0].replace('-marker', '');
			const el = document.querySelector(`div.${name}-marker`);

			if (el) {
				ee.emit('setMarkerHidden', marker);
				this.removeMarkers(name);
			}

			return true;
		});
	},

	showMarkers() {
		markers.state.markers.map((marker) => {
			if (marker.hidden) {
				const name = marker[0].getElement().classList[0].replace('-marker', '');

				ee.emit('setMarkerHidden', marker);
				this.addMarkers(name);
			}

			return true;
		});
	},
};
