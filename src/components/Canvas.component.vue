<template>
	<div class='mapContainer'>
		<div :id='container'></div>
		<SplashScreen />
		<Layers />
		<Trails />
	</div>
</template>

<script>
import canvasConfig from '../config/canvas.config';
import LayersComponent from './Layers.component.vue';
import SplashScreenComponent from './SplashScreen.component.vue';
import TrailsComponent from './Trails.component.vue';

export default {
	name: 'CanvasComponent',
	data() {
		return {
			container: canvasConfig.container,
		};
	},
	components: {
		Layers: LayersComponent,
		SplashScreen: SplashScreenComponent,
		Trails: TrailsComponent,
	},
};
</script>

<style lang='scss' scoped>
div.mapContainer,
div#canvas {
	position: absolute;
	height: 100%;
	width: 100%;
}
</style>
