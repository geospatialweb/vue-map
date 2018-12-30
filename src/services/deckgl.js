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
import config from '../config/index.json';

export default {
	layer: new MapboxLayer({
		type: HexagonLayer,
		id: 'heatmap',
		active: false,
		colorRange: config.heatmap.colour_range,
		coverage: 1,
		data: d3.csv(config.heatmap.data_url),
		elevationRange: [0, 1000],
		// elevationRange: [0, 3000],
		elevationScale: 250,
		// elevationScale: this.state.elevationScale,
		extruded: true,
		getPosition: d => [Number(d.lng), Number(d.lat)],
		lightSettings: config.heatmap.light_settings,
		// onHover: this.props.onHover,
		opacity: 1,
		// pickable: Boolean(this.props.onHover),
		radius: 1000,
		upperPercentile: 100,
	}),

	setHeatmapActive() {
		this.layer.active = !this.layer.active;
	},
};
