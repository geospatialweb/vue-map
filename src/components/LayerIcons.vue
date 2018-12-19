<template>
	<div :class='icon.icon' :height='icon.height' :width='icon.width'>
		<img :class='icon.class' :src='icon.src' :height='icon.height' :width='icon.width'
			@click='selectLayer("john")'>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'LayerIcons',
	props: ['icon'],
	methods: {
		...mapActions(['selectLayer']),
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
