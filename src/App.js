import './App.css';
import ReactMapGL, { Marker, MapContext } from 'react-map-gl';
import { useState } from 'react';
import * as React from 'react';
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
 
  function MyComponent(props) {
    const {map} = React.useContext(MapContext);
  
    if (map) {
      // do something
      //console.log('ready for download')
      const img = map.getCanvas().toDataURL('image/png', 1);
      //const img = map.getCanvas();
      // console.log(mapImg);
      //window.location.href = 'data:application/octet-stream;base64,' + img;
      let element = <a key='dwnLoadLink' href={img} download="map.png">Download current map</a>
      return(
        <div key="downloadLinkContainer" className="App">
          {map && element}
        </div>
      )
    } else {
      return <p>Loading...</p>;
    }
  }

  return (
    <MapContext.Provider>
    <div>
      <ReactMapGL 
      {...viewport } 
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={( viewport ) => {setViewport(viewport)}}
      mapStyle="mapbox://styles/dod900/ckv9v08x7154f15qs9d29virx"
      >
        polygon map
      </ReactMapGL>
      <div>
            <MyComponent/>
      </div>
    </div>
    </MapContext.Provider>
  )     
  
}
