<template>
	<select class='selectTrail' @change='selectTrail'>
		<option v-for='trail in trails' :key='trail.name'>{{ trail.name }}</option>
	</select>
</template>

<script>
import trailsConfig from '../config/trails.config';
import trailsService from '../services/trails.service';

export default {
	name: 'TrailsComponent',
	data() {
		return {
			trails: trailsConfig,
		};
	},
	methods: {
		selectTrail: event => trailsService.setTrail(event),
	},
};
</script>

<style lang='scss' scoped>
select.selectTrail {
	position: absolute;
	border-style: none;
	font-family: 'Roboto', sans-serif;
	left: 10px;
	top: 310px;
	width: 132px;
}
</style>
