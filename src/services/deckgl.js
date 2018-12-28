/* Uber code cited was developed for React... my Vue implementation below... with thanks...

   URL: https://beta.observablehq.com/@pessimistress/deck-gl-hexagonlayer-example
   Title: deck.gl HexagonLayer Example
   Author: Xiaoji Chen (@pessimistress)
   Version: 252
   Runtime version: 1
*/
import * as d3 from 'd3';
import { HexagonLayer } from '@deck.gl/layers';
import { MapboxLayer } from '@deck.gl/mapbox';
import mapService from './map';

export default {
	data_url: 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv',
	colour_range: [
		[1, 152, 189],
		[73, 227, 206],
		[216, 254, 181],
		[254, 237, 177],
		[254, 173, 84],
		[209, 55, 78],
	],
	light_settings: {
		lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
		ambientRatio: 0.4,
		diffuseRatio: 0.6,
		specularRatio: 0.2,
		lightsStrength: [0.8, 0.0, 0.8, 0.0],
		numberOfLights: 2,
	},
	loadHeatmap() {
		const heatmap = new MapboxLayer({
			type: HexagonLayer,
			id: 'heatmap',
			colorRange: this.colour_range,
			coverage: 1,
			data: d3.csv(this.data_url),
			elevationRange: [0, 1000],
			// elevationRange: [0, 3000],
			elevationScale: 250,
			// elevationScale: this.state.elevationScale,
			extruded: true,
			getPosition: d => [Number(d.lng), Number(d.lat)],
			lightSettings: this.light_settings,
			// onHover: this.props.onHover,
			opacity: 1,
			// pickable: Boolean(this.props.onHover),
			radius: 1000,
			upperPercentile: 100,
		});

		mapService.map.setBearing(-27.3967);
		mapService.map.setCenter([-1.4157, 52.2324]);
		mapService.map.setPitch(45);
		mapService.map.setZoom(6);
		mapService.setMapStyle();

		/* 100ms delay to set map style */
		setTimeout(() => mapService.map.addLayer(heatmap), 100);
	},
};
