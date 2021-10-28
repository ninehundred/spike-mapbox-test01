const fs = require("fs");

//console.log('doing something...')


fs.readFile("./tree-data-json.json", "utf8", (err, jsonString) => {
    const trees = JSON.parse(jsonString);
    const treesPoints = trees.features;
    const onlyMeadows = treesPoints.filter(tree => tree.properties.Site === 'The Meadows');
    
    const stringOnlyMeadows = JSON.stringify(onlyMeadows, null, 2);
    // JSON.stringify(JSON.parse(jsonStr), null, 2);
    console.log(onlyMeadows);

    fs.writeFile('./meadows-test-data.json', stringOnlyMeadows, err => {
      if (err) {
          console.log('Error writing file', err)
      } else {
          console.log('Successfully wrote file')
      }
    })
})