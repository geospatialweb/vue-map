/*
   URL: https://gist.github.com/Pessimistress/1a4f3f5eb3b882ab4dd29f8ac122a7be
   Title: deck.gl + Mapbox HexagonLayer Example
   Author: Xiaoji Chen (@pessimistress)
   Data Source: https://data.gov.uk
*/
import * as d3 from 'd3';
import { HexagonLayer } from '@deck.gl/layers';
import { MapboxLayer } from '@deck.gl/mapbox';
import config from '../config/config.json';
import events from '../events';
import mapService from './map';

export default {
	params: config.heatmap.params,
	addHeatmap() {
		mapService.addLayerStyle(this.heatmap);
	},
	loadHeatmap() {
		this.heatmap = new MapboxLayer({
			type: HexagonLayer,
			id: config.heatmap.id,
			colorRange: config.heatmap.colour_range,
			coverage: Number(config.heatmap.coverage),
			data: d3.csv(config.heatmap.data_url),
			elevationRange: config.heatmap.elevationRange,
			elevationScale: config.heatmap.elevationScale,
			extruded: config.heatmap.extruded,
			getPosition: d => [Number(d.lng), Number(d.lat)],
			opacity: config.heatmap.opacity,
			radius: Number(config.heatmap.radius),
			upperPercentile: Number(config.heatmap.upperPercentile),
		});

		this.params.map((param) => {
			document.getElementById(param).oninput = (event) => {
				const { value } = event.target;

				events.heatmap.setHeatmapParams.emit('setHeatmapParams', param, value);
				this.heatmap.setProps({ [param]: Number(value) });
			};

			return true;
		});

		this.addHeatmap();
	},

	reinitializeHeatmap() {
		events.heatmap.reinitializeHeatmapParams.emit('reinitializeHeatmapParams');

		this.params.map((param) => {
			this.heatmap.setProps({ [param]: Number(config.heatmap[param]) });
			return true;
		});
	},
};
