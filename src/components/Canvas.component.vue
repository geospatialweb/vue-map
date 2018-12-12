<template>
	<div class='mapContainer'>
		<div :id='canvas.container'></div>
		<SplashElement />
		<Layers />
		<Trails />
	</div>
</template>

<script>
import canvasConfig from '../config/canvas.config';
import LayersComponent from './Layers.component.vue';
import SplashElementComponent from './SplashElement.component.vue';
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
		SplashElement: SplashElementComponent,
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
