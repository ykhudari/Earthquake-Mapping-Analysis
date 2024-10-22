import React from 'react';
import { GeoJsonLayer } from '@deck.gl/layers';
import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

class MyMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
        };
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-110, 40],
            zoom: 4,
        });

        const deckOverlay = new GoogleMapsOverlay({
            layers: [
                new GeoJsonLayer({
                    id: 'earthquakes',
                    data: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson',
                    filled: true,
                    pointRadiusMinPixels: 2,
                    pointRadiusMaxPixels: 200,
                    opacity: 0.4,
                    pointRadiusScale: 0.3,
                    getRadius: (f) => Math.pow(10, f.properties.mag),
                    getFillColor: [255, 70, 30, 180],
                    autoHighlight: true,
                    transitions: {
                        getRadius: {
                            type: 'spring',
                            stiffness: 0.1,
                            damping: 0.15,
                            enter: () => [0],
                            duration: 10000,
                        },
                    },
                    onDataLoad: () => {
                        // hides progress bar
                        progress.done();
                    },
                }),
            ],
        });

        deckOverlay.setMap(map);

        this.setState({ map });
    }

    render() {
        return <div ref = {
            (el) => (this.mapContainer = el) }
        style = {
            { width: '100%', height: '100%' } }
        />;
    }
}

export default MyMap;