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
			LayerIcons
        },
		data () {
			return {
				layers: layersStore.state.layers
			}
		},
		computed: {
			icons: () =>
			{
				return layersStore.state.layers.filter(layer =>
				{
					return layer.icon;
				})
			}
		},
		methods: {
			selectLayer: event =>
			{
				const layer = event.target.classList[0];
				const index = layersStore.state.layers.findIndex(event => event.class === layer);

				layersStore.setLayerActive(index);
				layersService.setLayer(layersStore.state.layers[index].class, index);
			}
		}
	}
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
