import './App.css';
import ReactMapGL, { Marker, Source, Layer } from 'react-map-gl';
import { useState, useEffect, useCallback } from 'react';
//import * as treeData from './sample-data/tree-data-json-test.json'
const treeData = require('./sample-data/tree-data-json-test.json')
//const multiShapeGeoJson = require('./data/test-data-multiple-poly.json');
// import * as hereIsOurData from "somedatasource/..."
// TODO - test react useState to make api call to get data here.
//
 

export default function App() {

  const [viewport, setViewport] = useState({
    latitude: 55.953251,
    longitude: -3.188267,
    width: '100vw',
    height: '100vh',
    zoom: 10
  })

  // this would probably need to be set in state in order that the 
  // scale of the dots changed with the zoom level
  const pointLayerStyle = {
    id: 'point',
    type: 'circle',
    paint: {
      // this could be a proportion of the zoom?
      'circle-radius': 5,
      'circle-color': '#1b4a22'
    }
  };

  const [allData, setAllData] = useState(null);

  // this is where we get and set out data.
  useEffect(() => {
    // /* global fetch */
    // fetch(
    //   'https://raw.githubusercontent.com/uber/react-map-gl/master/examples/.data/us-income.geojson'
    // )
    //   .then(resp => resp.json())
    //   .then(json => setAllData(json));
    setAllData(treeData)
  }, [setAllData, allData]);

  const [hoverInfo, setHoverInfo] = useState(null);

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

  console.log(hoverInfo)
    // AgeGroup: "Mature"
    // CommonName: "Sycamore"
    // DiameterAtBreastHeight: "80 - 90"
    // Easting: 325688
    // Height: ""
    // LatinName: "Acer pseudoplatanus"
    // LocationOrTagNo: ""
    // NTRef: "NT27-5688-2599"
    // Northing: 672599
    // OBJECTID: 33397
    // Owner: "Common Good"
    // PrimaryKey: "Sgl/1528 (757864)"
    // Site: "The Meadows"
    // Spread: ""
    // Ward: "Meadows/Morningside\n"

  return (
    <div>
      <ReactMapGL 
      {...viewport} 
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={( viewport ) => {setViewport(viewport)}}
      mapStyle="mapbox://styles/dod900/ckv9v08x7154f15qs9d29virx"
      onHover={onHover}
      >
        <Source type='geojson' data={allData}>
          <Layer {...pointLayerStyle}/>
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
