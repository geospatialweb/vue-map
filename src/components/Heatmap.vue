<template>
	<div :class='[heatmap.class, {active: heatmap.active}]'>
		<div>
			<label>Coverage</label>
			<input id="coverage" type="range" min="0" max="1" step="0.1" value="1" />
			<span id="coverage-value"></span>
		</div>
		<div>
			<label>Radius</label>
			<input id="radius" type="range" min="1000" max="5000" step="500" value="1000" />
			<span id="radius-value"></span>
		</div>
		<div>
			<label>Upper Percentile</label>
			<input id="upperPercentile" type="range" min="80" max="100" step="1" value="100" />
			<span id="upperPercentile-value"></span>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'Heatmap',
	computed: {
		...mapGetters({ heatmap: 'heatmap/heatmap' }),
	},
};
</script>

<style lang='scss' scoped>
@mixin border-radius($radius) {
	border-radius: $radius;
	-webkit-border-radius: $radius;
	-moz-border-radius: $radius;
	-ms-border-radius: $radius;
}

div.heatmap {
	position: absolute;
	background: rgb(160,150,140);
	border: 1px solid rgb(187,187,187);
	@include border-radius(4px);
	color: rgb(60,75,90);
	cursor: pointer;
	font-family: 'Roboto', sans-serif;
	font-size: 0.95em;
	line-height: 1.5;
	padding: 10px 10px 10px 15px;
	right: 10px;
	top: 10px;
	visibility: hidden;
	width: 140px;

	div label,
	div input,
	div span {
		cursor: pointer;
	}
}

div.heatmap.active {
	visibility: visible;
}
</style>
