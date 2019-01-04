<template>
	<div>
		<Header />
		<Map />
	</div>
</template>

<script>
import Header from './components/Header.vue';
import Map from './components/Map.vue';
import events from './events';

export default {
	name: 'App',
	components: {
		Header,
		Map,
	},
	created() {
		events.heatmap.reinitializeHeatmapParams.on('reinitializeHeatmapParams', () => this.$store.dispatch('heatmap/reinitializeHeatmapParams'));
		events.heatmap.setHeatmapActive.on('setHeatmapActive', () => this.$store.dispatch('heatmap/setHeatmapActive'));
		events.heatmap.setHeatmapParams.on('setHeatmapParams', (param, value) => this.$store.dispatch('heatmap/setHeatmapParams', { param, value }));
		events.layers.setLayerActive.on('setLayerActive', i => this.$store.dispatch('layers/setLayerActive', i));
		events.layerStyles.getLayerStyles.on('getLayerStyles', () => this.$store.dispatch('layerStyles/getLayerStyles'));
		events.layerStyles.setLayerStyleActive.on('setLayerStyleActive', name => this.$store.dispatch('layerStyles/setLayerStyleActive', name));
		events.mapSettings.getMapSettings.on('getMapSettings', () => this.$store.dispatch('mapSettings/getMapSettings'));
		events.mapSettings.setMapSettings.on('setMapSettings', mapSettings => this.$store.dispatch('mapSettings/setMapSettings', mapSettings));
		events.mapStyles.getMapStyle.on('getMapStyle', () => this.$store.dispatch('mapStyles/getMapStyle'));
		events.mapStyles.setMapStyle.on('setMapStyle', name => this.$store.dispatch('mapStyles/setMapStyle', name));
		events.markers.getMarkers.on('getMarkers', () => this.$store.dispatch('markers/getMarkers'));
		events.markers.loadMarker.on('loadMarker', marker => this.$store.dispatch('markers/loadMarker', marker));
		events.markers.setMarkerActive.on('setMarkerActive', marker => this.$store.dispatch('markers/setMarkerActive', marker));
		events.markers.setMarkerHidden.on('setMarkerHidden', markers => this.$store.dispatch('markers/setMarkerHidden', markers));
		events.splashScreen.hideSplashScreen.on('hideSplashScreen', () => this.$store.dispatch('splashScreen/setSplashScreenActive'));
		events.trails.getTrails.on('getTrails', () => this.$store.dispatch('trails/getTrails'));
		events.trails.setTrailActive.on('setTrailActive', i => this.$store.dispatch('trails/setTrailActive', i));
		events.trails.setTrailsDisabled.on('setTrailsDisabled', () => this.$store.dispatch('trails/setTrailsDisabled'));
	},
	mounted() {
		/* eslint-disable-next-line global-require */
		require('./services/events').default.setEvents();
		events.map.loadMap.emit('loadMap');
	},
};
</script>

<style lang="scss">
div.office-marker {
	background-image: url('./assets/office.png');
	cursor: pointer;
	height: 25px;
	width: 22px;
}

div.places-marker {
	background-image: url('./assets/places.png');
	cursor: pointer;
	height: 25px;
	width: 22px;
}

div.trails-marker {
	background-image: url('./assets/trails.png');
	cursor: pointer;
	height: 25px;
	width: 22px;
}
</style>
