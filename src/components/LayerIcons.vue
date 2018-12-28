<template>
	<div :class='icon.icon' :height='icon.height' :width='icon.width'>
		<img :class='icon.class' :src='icon.src' :height='icon.height' :width='icon.width'
			@click='selectLayer'>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'LayerIcons',
	props: ['icon'],
	methods: {
		...mapActions({ selectLayer: 'layers/selectLayer' }),
	},
};
</script>

<style lang='scss' scoped>
div {
	div.satellite-icon {
		position: absolute;
		cursor: pointer;
		left: 21px;
		top: 126px;
	}

	div.biosphere-icon {
		position: absolute;
		cursor: pointer;
		left: 22px;
		top: 157px;
	}

	div.office-icon {
		position: absolute;
		cursor: pointer;
		left: 22px;
		top: 185px;
	}

	div.places-icon {
		position: absolute;
		cursor: pointer;
		left: 22px;
		top: 216px;
	}

	div.trails-icon {
		position: absolute;
		cursor: pointer;
		left: 22px;
		top: 246px;
	}

	div.uber-icon {
		position: absolute;
		cursor: pointer;
		left: 22px;
		top: 276px;
	}
}
</style>
