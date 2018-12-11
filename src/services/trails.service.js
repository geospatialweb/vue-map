import trailsConfig from '../config/trails.config';
import mapService from './map.service';

export default {
	trails: trailsConfig,
	trailsHash: {},

	createTrailsHash() {
		this.trails
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

		if (trail !== this.trails[0].name) {
			mapService.map.flyTo({
				center: this.trails[this.trailsHash[trail]].center,
				zoom: this.trails[this.trailsHash[trail]].zoom,
			});
		}
	},
};
