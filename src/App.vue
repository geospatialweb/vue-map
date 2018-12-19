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
		events.layers.getLayerStyles.on('getLayerStyles', () => this.$store.dispatch('getLayerStyles'));
		events.layers.setLayerActive.on('setLayerActive', i => this.$store.dispatch('setLayerActive', i));
		events.markers.getMarkers.on('getMarkers', () => this.$store.dispatch('getMarkers'));
		events.markers.loadMarker.on('loadMarker', marker => this.$store.dispatch('loadMarker', marker));
		events.markers.setMarkerActive.on('setMarkerActive', marker => this.$store.dispatch('setMarkerActive', marker));
		events.markers.setMarkerHidden.on('setMarkerHidden', markers => this.$store.dispatch('setMarkerHidden', markers));
		events.splashScreen.hideSplashScreen.on('hideSplashScreen', () => this.$store.dispatch('setSplashScreenActive'));
		events.styles.layer.setLayerStyleActive.on('setLayerStyleActive', name => this.$store.dispatch('setLayerStyleActive', name));
		events.styles.map.getMapSettings.on('getMapSettings', () => this.$store.dispatch('getMapSettings'));
		events.styles.map.setMapSettings.on('setMapSettings', mapSettings => this.$store.dispatch('setMapSettings', mapSettings));
		events.styles.map.getMapStyle.on('getMapStyle', () => this.$store.dispatch('getMapStyle'));
		events.styles.map.setMapStyle.on('setMapStyle', name => this.$store.dispatch('setMapStyle', name));
		events.trails.getTrails.on('getTrails', () => this.$store.dispatch('getTrails'));
		events.trails.setTrailActive.on('setTrailActive', i => this.$store.dispatch('setTrailActive', i));
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
