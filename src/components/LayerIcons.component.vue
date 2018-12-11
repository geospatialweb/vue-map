<template>
	<div :class='icon.icon' :height='icon.height' :width='icon.width'>
		<img :class='icon.class' :src='icon.src' :height='icon.height' :width='icon.width'
			@click='selectLayer'>
	</div>
</template>

<script>
import layersService from '../services/layers.service';
import layersStore from '../stores/layers.store';

export default {
	name: 'LayerIconsComponent',
	props: ['icon'],
	methods: {
		selectLayer: (event) => {
			const layer = event.target.classList[0];
			/* eslint-disable-next-line no-shadow */
			const i = layersStore.state.layers.findIndex(event => event.class === layer);

			layersStore.setLayerActive(i);
			layersService.setLayer(layer, i);
		},
	},
};
</script>

<style lang='scss' scoped>
div {
	div.biosphere-icon {
		position: absolute;
		cursor: pointer;
		left: 22px;
		top: 155px;
		height: 18px;
		width: 18px;
	}

	div.office-icon {
		position: absolute;
		cursor: pointer;
		left: 22px;
		top: 183px;
		height: 20px;
		width: 18px;
	}

	div.places-icon {
		position: absolute;
		cursor: pointer;
		left: 22px;
		top:212px;
		height: 20px;
		width: 18px;
	}

	div.trails-icon {
		position: absolute;
		cursor: pointer;
		left: 22px;
		top: 241px;
		height: 20px;
		width: 18px;
	}
}
</style>
