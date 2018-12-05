'use strict';

import { layerStylesService } from './layerStyles.service';
import { mapService } from './map.service';
import { markerDisplayService } from './markerDisplay.service';
import { layersStore } from '../stores/layers.store';

export const layersService = {
	setLayer(layer, index)
	{
		/* refresh app */
		if (layer === 'reset')
		{
			window.location.reload(true);
		}
		else
		{
			const layers = layersStore.state.layers;

			/* change between 'dark' and 'outdoors' map styles (basemaps) */
			if (layer === 'terrain')
			{
				mapService.changeMapStyle();

				/* hide active markers when changing map styles for aesthetic purposes */
				markerDisplayService.hideMarkers();

				/* show active markers after changing map styles for aesthetic purposes */
				setTimeout(() => markerDisplayService.showMarkers(), 1200);
			}
			/* set style layer visibility */
			else if (layer === 'biosphere' || layer === 'trails')
			{
				if (layers[index].active)
				{
					layerStylesService.layerStyles[layerStylesService.layerStylesHash[layer]].layout.visibility = 'visible';
					mapService.map.setLayoutProperty(layer, 'visibility', 'visible');

					/* add markers */
					if (layer === 'trails') {
						markerDisplayService.addMarkers(layer);
					}
				}
				else
				{
					layerStylesService.layerStyles[layerStylesService.layerStylesHash[layer]].layout.visibility = 'none';
					mapService.map.setLayoutProperty(layer, 'visibility', 'none');

					/* remove markers */
					if (layer === 'trails') {
						markerDisplayService.removeMarkers(layer);
					}
				}
			}
			/* add or remove markers */
			else if (layer === 'office' || layer === 'places')
			{
				layers[index].active ?
					markerDisplayService.addMarkers(layer) :
					markerDisplayService.removeMarkers(layer);
			}
		}
	}
}
