<template>
	<select class='selectTrail' @change='selectTrail'>
		<option v-for='trail in trails' :key='trail.name'>{{ trail.name }}</option>
	</select>
</template>

<script>
import { mapActions } from 'vuex';
import config from '../config';

export default {
	name: 'Trails',
	data() {
		return {
			trails: config.trails,
		};
	},
	methods: {
		...mapActions(['selectTrail']),
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
