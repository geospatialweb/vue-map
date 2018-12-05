<template>
	<section class='mapContainer'>
		<div :id='canvas.container'></div>
		<Splash />
		<Layers />
		<Trails />
	</section>
</template>

<script>
	import { canvas } from '../config/canvas.config';
	import Layers from './Layers.component.vue';
	import Splash from './Splash.component.vue';
	import Trails from './Trails.component.vue';

	export default {
		name: 'Canvas',
		data () {
			return {
				canvas
			}
		},
		components: {
			Layers,
			Splash,
			Trails
        }
	}
</script>

<style lang='scss' scoped>
	section.mapContainer,
	div#canvas {
    	position: absolute;
    	height: 100%;
    	width: 100%;
	}
</style>
