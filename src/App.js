import './App.css';
import ReactMapGL, { Marker, MapContext} from 'react-map-gl';
import { useState } from 'react';
import * as React from 'react';
// import * as hereIsOurData from "somedatasource/..."
// TODO - test react useState to make api call to get data here.
//

import ImagePrint from './components/ImagePrint';
// import FileDownloader from './components/FileDownloader';

function CurrentZoomLevel() {
  const context = React.useContext(MapContext);
  return <div>{context.viewport.zoom}</div>;
}

function MyComponent(props) {
  const { mapImg, setMapImg } = props;
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
    return <></>;
  }
}

export default function App() {
          
  const [viewport, setViewport] = useState({
    latitude: 51.532421,
    longitude: -0.14364838,
    width: '100vw',
    height: '100vh',
    zoom: 15,
    preserveDrawingBuffer: true
  })

  const [mapImg, setMapImg] = useState('');

  return (
    <>
    <MapContext.Provider>
      <div>
        <ReactMapGL 
        {...viewport } 
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={( viewport ) => {setViewport(viewport)}}
        mapStyle="mapbox://styles/dod900/ckv9v08x7154f15qs9d29virx"
        >
          baseline map
        </ReactMapGL>
        <div>
            <MyComponent mapImg={mapImg} setMapImg={setMapImg}/>
        </div>
      </div>
    </MapContext.Provider>
    {/* <FileDownloader /> */}
    {/* <ImagePrint /> */}
    </>
  )
}
