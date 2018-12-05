'use strict';

module.exports = features =>
{
    const fc = {
        "type": "FeatureCollection",
        "features": []
    };

    features.map(feature =>
    {
        const geometry = JSON.parse(feature.st_asgeojson);

        const geojson = {
            "type": "Feature",
            "geometry": {
                "type": geometry.type,
                "coordinates": geometry.coordinates
            },
            "properties": {}
        };

        for (const prop in feature)
        {
            if (prop !== 'st_asgeojson') {
                geojson.properties[prop] = feature[prop];
            }
        }

        fc.features.push(geojson);
    });

    return fc;
};
