'use strict';

export const layers = [
	{
		active: false,
		class: 'terrain',
		name: 'Terrain View'
	},
	{
		active: true,
		class: 'biosphere',
		icon: 'biosphere-icon',
		name: 'Biosphere',
		src: '../assets/biosphere.png',
		height: '18',
		width: '18'
	},
	{
		active: false,
		class: 'office',
		icon: 'office-icon',
		name: 'Office',
		src: '../assets/office.png',
		height: '20',
		width: '18'
	},
	{
		active: false,
		class: 'places',
		icon: 'places-icon',
		name: 'Places',
		src: '../assets/places.png',
		height: '20',
		width: '18'
	},
	{
		active: false,
		class: 'trails',
		icon: 'trails-icon',
		name: 'Trails',
		src: '../assets/trails.png',
		height: '20',
		width: '18'
	},
	{
		class: 'reset',
		name: 'Reset Map'
	}
]
