import './App.css';
import ReactMapGL, { Marker } from 'react-map-gl';
import { useState } from 'react';
import * as treeData from './sample-data/tree-data-json-test.json'
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



  return (
    <div>
      <ReactMapGL 
      {...viewport} 
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={( viewport ) => {setViewport(viewport)}}
      mapStyle="mapbox://styles/dod900/ckv9v08x7154f15qs9d29virx"
      >
        {treeData.features.map((tree) => {
          //-3.454413647717782, 55.833552040984969 lon/lat coords from json file
          //console.log(tree.geometry.coordinates)
          const latCoords = tree.geometry.coordinates[1];
          const lonCoords = tree.geometry.coordinates[0];
          return (
            <Marker key={tree.properties.PrimaryKey}
            latitude={latCoords}
            longitude={lonCoords}>
              <div>x</div>
            </Marker>
          )
        })}
      </ReactMapGL>
    </div>
  )     
  
}
