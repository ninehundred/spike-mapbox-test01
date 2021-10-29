import axios from "axios";

//IBA Important Bird Areas

const RSPBApi = axios.create({
  baseURL: "https://services1.arcgis.com/h1C9f6qsGKmqXsVs/arcgis/rest/services",
});
//https://services1.arcgis.com/h1C9f6qsGKmqXsVs/arcgis/rest/services/IBAs_UK/FeatureServer/0/query?f=json&returnIdsOnly=true&returnCountOnly=true&returnGeometry=false&spatialRel=esriSpatialRelIntersects&where=(SitLat >= 50.71 AND SitLat <= 51.13) AND (SitLong >= -4.88 AND SitLong <= -1.11)
export const getIBA = async () => {
  const data = await RSPBApi.get(
    `/IBAs_UK/FeatureServer/0/query?where=%20(SitLat%20%3D%2045%20OR%20SitLat%20%3D%2055)%20%20AND%20%20(SitLong%20%3D%208%20OR%20SitLong%20%3D%209)%20&outFields=*&outSR=4326&f=json`
  );
  console.log(data, "<<<<");
  return data;
};
//latMin,latMax,longMin,longMax
//
// /IBAs_UK/FeatureServer/0/query?where=%20(SitLat%20%3D%2057%20OR%20SitLat%20%3D%2058)%20%20AND%20%20(SitLong%20%3D%204%20OR%20SitLong%20%3D%205)%20&outFields=*&outSR=4326&f=json
// /IBAs_UK/FeatureServer/0/query?where=%20(SitLat%20%3D%2045%20OR%20SitLat%20%3D%2055)%20%20AND%20%20(SitLong%20%3D%208%20OR%20SitLong%20%3D%209)%20&outFields=*&outSR=4326&f=json
