import mapService from './map.service';
import store from '../store';

export default {
	/* pan and zoom to selected trail */
	setTrail(event) {
		event.stopPropagation();

		const trail = event.target.value;
		const { trails, trailsHash } = store.state;

		if (trail !== trails[0].name) {
			store.setTrailsActive(trailsHash[trail]);

			mapService.map.flyTo({
				center: trails[trailsHash[trail]].center,
				zoom: trails[trailsHash[trail]].zoom,
			});
		}
	},
};
