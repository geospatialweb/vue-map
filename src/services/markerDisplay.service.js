import { mapService } from './map.service';
import { markersService } from './markers.service';

export const markerDisplayService = {
	addMarkers(layer) {
		markersService.markers[markersService.markersHash[layer]]
			.map(marker => marker.addTo(mapService.map));
	},

	removeMarkers(layer) {
		markersService.markers[markersService.markersHash[layer]]
			.map(marker => marker.remove());
	},

	hideMarkers() {
		markersService.markers.map((marker) => {
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
		markersService.markers.map((marker) => {
			if (marker.hidden) {
				const name = marker[0].getElement().classList[0].replace('-marker', '');

				marker.hidden = false;
				this.addMarkers(name);
			}

			return true;
		});
	},
};
