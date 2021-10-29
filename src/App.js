import './App.css';
import ReactMapGL, { Marker } from 'react-map-gl';
import { useState } from 'react';
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
 // 
  return (
    <div>
      <ReactMapGL 
      {...viewport } 
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={( viewport ) => {setViewport(viewport)}}
      mapStyle="mapbox://styles/dod900/ckv9v08x7154f15qs9d29virx"
      >
        polygon map
      </ReactMapGL>
    </div>
  )     
  
}
