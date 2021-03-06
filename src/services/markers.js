import mapboxgl from 'mapbox-gl';
import ee from '../events';
import mapService from './map';

export default {
	/* create individual marker elements and add mouse event handlers */
	setMarker(marker, data) {
		const markers = [];
		markers.hidden = marker.hidden;

		data.features.map((feature) => {
			const el = document.createElement('div');

			const popup = new mapboxgl.Popup({
				closeButton: false,
				offset: 15,
			});

			el.active = marker.active;
			el.className = `${marker.id}-marker`;
			el.addEventListener('mouseleave', () => {
				popup.remove();
			});

			switch (marker.id) {
			case 'office':
			case 'places':
				el.addEventListener('mouseenter', () => {
					popup
						.setLngLat(feature.geometry.coordinates)
						.setHTML(`<b>${feature.properties.id}</b><br>${feature.properties.description}`)
						.addTo(mapService.map);
				});

				markers.push(
					new mapboxgl.Marker(el)
						.setLngLat(feature.geometry.coordinates),
				);
				break;

			case 'trails':
				el.addEventListener('mouseenter', () => {
					popup
						.setLngLat([feature.properties.lng, feature.properties.lat])
						.setHTML(`<b>${feature.properties.id}</b><br>${feature.properties.description}`)
						.addTo(mapService.map);
				});

				markers.push(
					new mapboxgl.Marker(el)
						.setLngLat([feature.properties.lng, feature.properties.lat]),
				);
				break;

			default:
			}

			return true;
		});

		ee.emit('loadMarker', markers);
	},
};
