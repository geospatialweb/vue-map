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
import config from '../config/config.json';
import mapService from './map';

export default {
	heatmap: {},
	setHeatmap() {
		this.heatmap = new MapboxLayer({
			type: HexagonLayer,
			id: config.heatmap.id,
			active: config.heatmap.active,
			colorRange: config.heatmap.colour_range,
			coverage: config.heatmap.coverage,
			data: d3.csv(config.heatmap.data_url),
			elevationRange: config.heatmap.elevationRange,
			// elevationRange: [0, 3000],
			elevationScale: config.heatmap.elevationScale,
			// elevationScale: this.state.elevationScale,
			extruded: config.heatmap.extruded,
			getPosition: d => [Number(d.lng), Number(d.lat)],
			lightSettings: config.heatmap.light_settings,
			// onHover: this.props.onHover,
			opacity: config.heatmap.opacity,
			// pickable: Boolean(this.props.onHover),
			radius: config.heatmap.radius,
			upperPercentile: config.heatmap.upperPercentile,
		});

		mapService.addHeatmap(this.heatmap);
	},

	setHeatmapActive() {
		this.heatmap.props.active = !this.heatmap.props.active;
	},
};
