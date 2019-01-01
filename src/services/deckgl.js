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
import mapService from './map';

export default {
	addHeatmap() {
		mapService.addLayerStyle(this.heatmap);
	},
	loadHeatmap() {
		const options = ['radius', 'coverage', 'upperPercentile'];

		this.heatmap = new MapboxLayer({
			type: HexagonLayer,
			id: config.heatmap.id,
			colorRange: config.heatmap.colour_range,
			coverage: config.heatmap.coverage,
			data: d3.csv(config.heatmap.data_url),
			elevationRange: config.heatmap.elevationRange,
			elevationScale: config.heatmap.elevationScale,
			extruded: config.heatmap.extruded,
			getPosition: d => [Number(d.lng), Number(d.lat)],
			opacity: config.heatmap.opacity,
			radius: config.heatmap.radius,
			upperPercentile: config.heatmap.upperPercentile,
		});

		options.map((option) => {
			document.getElementById(option).oninput = (event) => {
				const value = Number(event.target.value);

				document.getElementById(`${option}-value`).innerHTML = value;
				this.heatmap.setProps({ [option]: value });
			};

			return true;
		});

		this.addHeatmap();
	},
};
