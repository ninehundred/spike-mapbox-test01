import axios from "axios";
import { useState } from "react"
//const fs = require('fs');
//import JsFileDownloader from 'js-file-downloader';

function ImagePrint() {

    const [imageToPrint, setImageToPrint] = useState([]);

    function writeSVG() {
        let centerX = 15
        let centerY = 15
        let radius = 10
        let style = "fill:rgb(200,200,255);"
    
        const fs = require('fs')
    
        let svg = ""
        svg += '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n'
        svg += '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n'
        svg += '<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">\n'
    
        for (let x = 0; x < 12; x++) {
            svg += `\t<circle cx="${centerX+(x*((radius*2)+5))}" cy="${centerY}" r="${radius}" style="${style}"/>\n`
        }

        svg += '</svg>'
    
        fs.writeFile('/Users/kieran.dolan/northcoders/projects/testSVG.svg', svg, (err) => {  
            // throws an error, you could also catch it here
            if (err) throw err;
    
            // success case, the file was saved
            console.log('SVG written!');
        });
    }

    function downloadFile(params) {
        //get svg element.
        var svg = document.getElementById("svg");

        //get svg source.
        var serializer = new XMLSerializer();
        var source = serializer.serializeToString(svg);

        //add name spaces.
        if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
            source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
            source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
        }

        //add xml declaration
        source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

        //convert svg source to URI data scheme.
        var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);

        //set url value to a element's href attribute.
        document.getElementById("link").href = url;
        //you can download svg file by right click menu.
    }

    // function fileDownloader() {
        
    //     const fileUrl = 'http://...';

    //     new JsFileDownloader({ 
    //         url: fileUrl
    //     })
    //     .then(function () {
    //         // Called when download ended
    //     })
    //     .catch(function (error) {
    //         // Called when an error occurred
    //     });
    // }

    function handleClick() {
        axios.get(`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/path-4+ff4013+0061ff-0.25(%7DwoyHtqZUsCmBpD)/-0.1413,51.5315,15.53,0/840x594?before_layer=road-polygon&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
        .then((response) => {
            console.log(response);
            //writeSVG();
        })
        .catch((error) => {
            console.log(error);
        });
      }
    
    return (
        <button
        key={`toolbar-topic-button`} 
        className="print-image-button"
        onClick = {(e) => { handleClick()}}
        >{`plot`}</button>
    );
}

export default ImagePrint;