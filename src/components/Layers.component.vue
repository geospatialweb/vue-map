<template>
	<div>
		<ul class='layers'>
			<LayerElements v-for='layer in layers' :key='layer.class' :el='layer' @click='selectLayer' />
		</ul>

		<LayerIcons v-for='icon in icons' :key='icon.class' :icon='icon' @click='selectLayer' />
	</div>
</template>

<script>
import LayerElementsComponent from './LayerElements.component.vue';
import LayerIconsComponent from './LayerIcons.component.vue';
import layersService from '../services/layers.service';
import store from '../store';

export default {
	name: 'LayersComponent',
	components: {
		LayerElements: LayerElementsComponent,
		LayerIcons: LayerIconsComponent,
	},
	data() {
		return {
			icons: store.state.layers.filter(layer => layer.icon),
			layers: store.state.layers.filter(layer => layer.name),
		};
	},
	methods: {
		selectLayer: (event) => {
			const layer = event.target.classList[0];
			/* eslint-disable-next-line no-shadow */
			const i = store.state.layers.findIndex(event => event.class === layer);

			layersService.setLayerActive(i);
			layersService.setLayer(layer, i);
		},
	},
};
</script>

<style lang='scss'>
div {
	ul.layers {
		position: absolute;
		margin: 0;
		padding: 0;
		list-style-type: none;
		left: 10px;
		top: 120px;
	}
}
</style>
