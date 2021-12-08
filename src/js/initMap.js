import "ol/ol.css";
import { fromLonLat } from "ol/proj";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
// eslint-disable-next-line no-unused-vars
import View from "ol/View";

let OSMLayer = new TileLayer({
  title: "OpenLayers",
  source: new OSM({ transition: 1 }),
  projection: "EPSG:3857",
  zIndex: 0,
  opacity: 1,
});

export default function initMap() {
  window.openLayersMap = new Map({
    target: "OpenLayersMap",
    layers: [OSMLayer],
    view: new View({
      center: fromLonLat([104.065,30.66]),
      minZoom: 8,
      maxZoom: 18,
      zoom: 13,
      rotation: 0,
      projection: "EPSG:3857",
    }),
  });
}
