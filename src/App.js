import './App.css';
import ReactMapGL, { Source, Layer } from 'react-map-gl';
import { useEffect, useState, useCallback } from 'react';
const shapeGeojson = require('./data/test-data-box.json');
const multiShapeGeoJson = require('./data/test-data-multiple-poly.json');
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

  // <Source id="somepoint" type='geojson' data={geojson}>
  //   <Layer {...pointLayerStyle}/>
  // </Source>

  // <Source id="geojson-shape" type='geojson' data={shapeGeojson}>
  //   <Layer {...boxLayerStyle}/>
  // </Source>

  const [allData, setAllData] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);


  // this is where we get and set out data.
  useEffect(() => {
    // /* global fetch */
    // fetch(
    //   'https://raw.githubusercontent.com/uber/react-map-gl/master/examples/.data/us-income.geojson'
    // )
    //   .then(resp => resp.json())
    //   .then(json => setAllData(json));
    setAllData(multiShapeGeoJson)
  }, []);

  const onHover = useCallback(event => {
    const {
      features,
      srcEvent: {offsetX, offsetY}
    } = event;
    const hoveredFeature = features && features[0];

    setHoverInfo(
      hoveredFeature
        ? {
            feature: hoveredFeature,
            x: offsetX,
            y: offsetY
          }
        : null
    );
  }, []);


  // TODO - research useMemo, see >>> https://reactjs.org/docs/hooks-reference.html
  // const data = useMemo(() => {
  //   return allData && updatePercentiles(allData, f => f.properties.income[year]);
  // }, [allData, year]);


  return (
    <div>
      <ReactMapGL 
      {...viewport } 
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={( viewport ) => {setViewport(viewport)}}
      mapStyle="mapbox://styles/dod900/ckv9v08x7154f15qs9d29virx"
      onHover={onHover}
      >
      
        <Source type='geojson' data={allData}>
          <Layer {...boxLayerStyle}/>
        </Source>
        {hoverInfo && (
          <div className="tooltip" style={{left: hoverInfo.x, top: hoverInfo.y}}>
            <div>Name: {hoverInfo.feature.properties.name}</div>
          </div>
        )}
      </ReactMapGL>
    </div>
  )     
  
}
