import mapboxgl from 'mapbox-gl';
import mapService from './map.service';
import store from '../store';

export default {
	markersHash: {},

	createMarkersHash() {
		store.state.markers.map((marker, i) => {
			const name = marker[0].getElement().classList[0].replace('-marker', '');

			this.markersHash[name] = i;
			return true;
		});
	},

	/* create individual marker elements and add mouse event handlers */
	setMarkers(name, data) {
		const markers = [];

		data.features.map((feature) => {
			const el = document.createElement('div');
			el.className = `${name}-marker`;

			const popup = new mapboxgl.Popup({
				closeButton: false,
				offset: 15,
			});

			if (name === 'office' || name === 'places') {
				el.addEventListener('mouseenter', () => {
					popup
						.setLngLat(feature.geometry.coordinates)
						.setHTML(`<b>${feature.properties.name}</b><br>${feature.properties.description}`)
						.addTo(mapService.map);
				});

				el.addEventListener('mouseleave', () => {
					popup.remove();
				});

				markers.push(
					new mapboxgl.Marker(el)
						.setLngLat(feature.geometry.coordinates),
				);
			} else if (name === 'trails') {
				el.addEventListener('mouseenter', () => {
					popup
						.setLngLat([feature.properties.lng, feature.properties.lat])
						.setHTML(`<b>${feature.properties.name}</b><br>${feature.properties.description}`)
						.addTo(mapService.map);
				});

				el.addEventListener('mouseleave', () => {
					popup.remove();
				});

				markers.push(
					new mapboxgl.Marker(el)
						.setLngLat([feature.properties.lng, feature.properties.lat]),
				);
			}

			return true;
		});

		store.addMarkers(markers);
	},
};
