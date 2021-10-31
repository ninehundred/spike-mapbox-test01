import axios from "axios";

//RSPB
const RSPBApi = axios.create({
  baseURL: "https://services1.arcgis.com/h1C9f6qsGKmqXsVs/arcgis/rest/services",
});
////IBA Important Bird Areas
export const getRSPBIBA = async () => {
  const { data } = await RSPBApi.get(
    `/IBAs_UK/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json`
  );
  console.log(data.features, "RSPB Important Bird Areas");
  return data;
};

// RSPB Reserves
export const getRSPBRes = async () => {
  const { data } = await RSPBApi.get(
    `/RSPB_Public_Reserves/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json`
  );
  console.log(data.features, "RSPB Reserves");
  return data;
};

//Natural England
const NEApi = axios.create({
  baseURL: "https://services.arcgis.com/JJzESW51TqeY9uat/arcgis/rest/services",
});

// Natural England Ancient Woodland
export const getNEAncientWoodland = async () => {
  const { data } = await NEApi.get(
    `/Ancient_Woodland_England/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json`
  );
  console.log(data.features, "NE Ancient Woodlands");
  return data;
};

// Natural England National Nature Reserves
//https://naturalengland-defra.opendata.arcgis.com/datasets/Defra::national-nature-reserves-england/about
export const getNENatureReserves = async () => {
  const { data } = await NEApi.get(
    `/National_Nature_Reserves_England/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json`
  );
  console.log(data.features, "NE Nature Reserves");
  return data;
};

//DEFRA
const DEFRAApi = axios.create({
  baseURL: "http://environment.data.gov.uk",
});

//OSM API
const OSMApi = axios.create({
  baseURL: "https://lz4.overpass-api.de/api",
});

// Get property addresses and coordinates
// Use this to determine required tags https://taginfo.openstreetmap.org/keys/addr%3Astreet
// use this to retrieve query https://overpass-turbo.eu/#
export const getOSMAddresses = async () => {
  const { data } = await OSMApi.get(
    `/interpreter/?data=[out:json][timeout:25];(node["addr:street"](54.595249192604,-5.9348359107971,54.59773665492,-5.9297440052032);way["addr:street"](54.595249192604,-5.9348359107971,54.59773665492,-5.9297440052032);relation["addr:street"](54.595249192604,-5.9348359107971,54.59773665492,-5.9297440052032););out;>;out skel qt;`
  ).catch((err) => {
    console.log(err, "error message");
  });
  console.log(data, "OSM Addresses");
  return data;
};
