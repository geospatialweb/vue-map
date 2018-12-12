import mapService from './map.service';
import store from '../store';

export default {
	trailsHash: {},

	createTrailsHash() {
		store.state.trails
			.filter((trail, i) => i > 0)
			.map((trail, i) => {
				this.trailsHash[trail.name] = i + 1;
				return true;
			});
	},

	/* pan and zoom to selected trail */
	setTrail(event) {
		event.stopPropagation();

		const trail = event.target.value;
		const { trails } = store.state;

		if (trail !== trails[0].name) {
			store.setTrailsActive(this.trailsHash[trail]);

			mapService.map.flyTo({
				center: trails[this.trailsHash[trail]].center,
				zoom: trails[this.trailsHash[trail]].zoom,
			});
		}
	},
};
