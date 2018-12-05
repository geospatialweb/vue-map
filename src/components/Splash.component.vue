<template>
	<div :class='[splash.splashScreen.class, {active: splash.splashScreen.active}]'></div>
</template>

<script>
	import { splashStore } from '../stores/splash.store';

	export default {
		name: 'Splash',
		data () {
			return {
				splash: splashStore.state.splash
			}
		}
	}
</script>

<style lang='scss' scoped>
	div.splash {
		position: absolute;
		background: rgba(0,0,0,.5);
		visibility: hidden;
		z-index: 2;
		height: 100%;
		width: 100%;
	}

	div.splash.active {
		visibility: visible;
	}
</style>
