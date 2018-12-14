import mapboxgl from 'mapbox-gl';
import mapService from './map.service';
import store from '../store';

export default {
	/* create individual marker elements and add mouse event handlers */
	setMarkers(layer, data) {
		const markers = [];

		markers.hidden = layer.hidden;
		markers.state = layer.state;

		data.features.map((feature) => {
			const el = document.createElement('div');
			el.className = `${layer.name}-marker`;

			const popup = new mapboxgl.Popup({
				closeButton: false,
				offset: 15,
			});

			if (layer.name === 'office' || layer.name === 'places') {
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
			} else if (layer.name === 'trails') {
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
