<template>
	<li>
		<div :class='[el.class, {active: el.active}]' @click='selectLayer'>{{ el.name }}</div>
	</li>
</template>

<script>
import { layersService } from '../services/layers.service';
import { layersStore } from '../stores/layers.store';

export default {
	name: 'LayerElements',
	props: ['el'],
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
div ul.layers li div {
	display: block;
	padding: 5px 0 5px 40px;
	background: rgb(160,150,140);
	border: 1px solid rgb(187,187,187);
	border-bottom-width: 0;
	color: rgb(60,75,90);
	cursor: pointer;
	font-family: 'Roboto', sans-serif;
	font-size: 0.95em;
	text-decoration: none;
	width: 90px;
}

div ul.layers li div:hover {
	background: rgb(140,130,120);
}

div ul.layers li:first-child div {
	border-radius: 3px 3px 0 0;
	-webkit-border-radius: 3px 3px 0 0;
}

div ul.layers li:last-child div {
	border-bottom-width: 1px;
	border-radius: 0 0 3px 3px;
	-webkit-border-radius: 0 0 3px 3px;
}

div ul.layers li div.aerial.active,
div ul.layers li div.biosphere.active,
div ul.layers li div.office.active,
div ul.layers li div.places.active,
div ul.layers li div.trails.active {
	background: rgb(120,110,100);
	color: rgb(216,216,216);
}
</style>
