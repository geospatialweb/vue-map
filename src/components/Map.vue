<template>
	<div class='mapContainer'>
		<div :id='container'></div>
		<SplashScreen />
		<Heatmap />
		<Layers />
		<Trails />
	</div>
</template>

<script>
import Heatmap from './Heatmap.vue';
import Layers from './Layers.vue';
import SplashScreen from './SplashScreen.vue';
import Trails from './Trails.vue';
import mapService from '../services/map';

export default {
	name: 'Map',
	data: () => ({
		container: mapService.mapOptions.container,
	}),
	components: {
		Heatmap,
		Layers,
		SplashScreen,
		Trails,
	},
};
</script>

<style lang='scss' scoped>
div.mapContainer,
div#map {
	position: absolute;
	height: 100%;
	width: 100%;
}
</style>
