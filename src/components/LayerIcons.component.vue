<template>
	<div :class='icon.icon' :height='icon.height' :width='icon.width'>
		<img :class='icon.class' :src='icon.src' :height='icon.height' :width='icon.width' @click='selectLayer'>
	</div>
</template>

<script>
	import { layersService } from '../services/layers.service';
	import { layersStore } from '../stores/layers.store';

	export default {
		name: 'LayerIcons',
		props: ['icon'],
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

<style lang='scss' scoped>
	div div.biosphere-icon {
		position: absolute;
		cursor: pointer;
		left: 22px;
		top: 155px;
		height: 18px;
		width: 18px;
	}

	div div.office-icon {
		position: absolute;
		cursor: pointer;
		left: 22px;
		top: 183px;
		height: 20px;
		width: 18px;
	}

	div div.places-icon {
		position: absolute;
		cursor: pointer;
		left: 22px;
		top:212px;
		height: 20px;
		width: 18px;
	}

	div div.trails-icon {
		position: absolute;
		cursor: pointer;
		left: 22px;
		top: 241px;
		height: 20px;
		width: 18px;
	}
</style>
