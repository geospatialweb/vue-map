<template>
	<div class='mapContainer'>
		<div :id='canvas.container'></div>
		<Splash />
		<Layers />
		<Trails />
	</div>
</template>

<script>
import canvasConfig from '../config/canvas.config';
import LayersComponent from './Layers.component.vue';
import SplashComponent from './Splash.component.vue';
import TrailsComponent from './Trails.component.vue';

export default {
	name: 'CanvasComponent',
	data() {
		return {
			canvas: canvasConfig,
		};
	},
	components: {
		Layers: LayersComponent,
		Splash: SplashComponent,
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
