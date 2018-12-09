<template>
	<div>
		<ul class='layers'>
			<LayerElements v-for='layer in layers' :key='layer.class' :el='layer' @click='selectLayer' />
		</ul>

		<LayerIcons v-for='icon in icons' :key='icon.class' :icon='icon' @click='selectLayer' />
	</div>
</template>

<script>
import { layersService } from '../services/layers.service';
import { layersStore } from '../stores/layers.store';
import LayerElements from './LayerElements.component.vue';
import LayerIcons from './LayerIcons.component.vue';

export default {
	name: 'Layers',
	components: {
		LayerElements,
		LayerIcons,
	},
	data() {
		return {
			layers: layersStore.state.layers,
		};
	},
	computed: {
		icons: () => layersStore.state.layers.filter(layer => layer.icon),
	},
	methods: {
		selectLayer: (event) => {
			const layer = event.target.classList[0];
			/* eslint-disable-next-line no-shadow */
			const i = layersStore.state.layers.findIndex(event => event.class === layer);

			layersStore.setLayerActive(i);
			layersService.setLayer(layersStore.state.layers[i].class, i);
		},
	},
};
</script>

<style lang='scss'>
div ul.layers {
	position: absolute;
	margin: 0;
	padding: 0;
	list-style-type: none;
	left: 10px;
	top: 120px;
}
</style>
