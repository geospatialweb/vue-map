<template>
	<div id='app'>
		<Header />
		<Canvas />
	</div>
</template>

<script>
import Canvas from './Canvas.component.vue';
import Header from './Header.component.vue';

export default {
	name: 'App',
	components: {
		Canvas,
		Header,
	},
};
</script>

<style lang="scss">
div.office-marker {
	background-image: url('../assets/office.png');
	cursor: pointer;
	height: 25px;
	width: 22px;
}

div.places-marker {
	background-image: url('../assets/places.png');
	cursor: pointer;
	height: 25px;
	width: 22px;
}

div.trails-marker {
	background-image: url('../assets/trails.png');
	cursor: pointer;
	height: 25px;
	width: 22px;
}
</style>
