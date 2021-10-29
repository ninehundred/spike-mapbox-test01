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

