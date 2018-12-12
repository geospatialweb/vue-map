<template>
	<div :class='[splashElement.class, {active: splashElement.active}]'></div>
</template>

<script>
import store from '../store';

export default {
	name: 'SplashElementComponent',
	data() {
		return {
			splashElement: store.state.splashElement,
		};
	},
};
</script>

<style lang='scss' scoped>
div.splashElement {
	position: absolute;
	background: rgba(0,0,0,.5);
	visibility: hidden;
	z-index: 2;
	height: 100%;
	width: 100%;
}

div.splashElement.active {
	visibility: visible;
}
</style>
