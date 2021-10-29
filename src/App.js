import './App.css';
import ReactMapGL, { Source, Layer } from 'react-map-gl';
import { useEffect, useState } from 'react';
const shapeGeojson = require('./data/test-data-box.json')
// TODO - test react useState to make api call to get data here.
//
 

export default function App() {

  // set the viewport in state so that it can be updated as we move around
  // the screen
  const [viewport, setViewport] = useState({
    latitude: 55.953251,
    longitude: -3.188267,
    width: '100vw',
    height: '100vh',
    zoom: 10
  })

  // this will be read in externally in the final cut
  const geojson = {
    type: 'FeatureCollection',
    features: [
      {type: 'Feature', geometry: {type: 'Point', coordinates: [-3.19262266, 55.9410]}}
    ]
  };

  //const [geojsonShape, setGeoJsonShape] = useState()
  // Remember: we'll have to update a state when we read the api call.

  const pointLayerStyle = {
    id: 'point',
    type: 'circle',
    paint: {
      // this could be a proportion of the zoom?
      'circle-radius': 10,
      'circle-color': '#007cbf'
    }
  };

  // see >>> https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/
  // for how to style shapes, points and so on.
  const boxLayerStyle = {
    id: 'monument',
    type: 'fill',
    paint: {
      "fill-color": "#66ad84",
      "fill-opacity" : 0.5
    }
  };


  return (
    <div>
      <ReactMapGL 
      {...viewport } 
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={( viewport ) => {setViewport(viewport)}}
      mapStyle="mapbox://styles/dod900/ckv9v08x7154f15qs9d29virx"
      >
      <Source id="geojson-shape" type='geojson' data={shapeGeojson}>
        <Layer {...boxLayerStyle}/>
      </Source>
      <Source id="somepoint" type='geojson' data={geojson}>
        <Layer {...pointLayerStyle}/>
      </Source>
      </ReactMapGL>
    </div>
  )     
  
}
