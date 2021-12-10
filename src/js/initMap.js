import "ol/ol.css";
import { fromLonLat } from "ol/proj";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import View from "ol/View";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import drawStyle from "@js/style/drawStyle";

let OSMLayer = new TileLayer({
  title: "OpenLayers",
  source: new OSM({ transition: 1 }),
  projection: "EPSG:3857",
  zIndex: 0,
  opacity: 1,
});

let drawLayer = new VectorLayer({
  title: "用户绘制图层",
  source: new VectorSource({}),
  projection: "EPSG:3857",
  zIndex: 1000,
  opacity: 1,
  style: drawStyle,
});
window.drawLayer = drawLayer;

export default function initMap() {
  window.openLayersMap = new Map({
    target: "OpenLayersMap",
    layers: [OSMLayer, drawLayer],
    view: new View({
      center: fromLonLat([104.065, 30.66]),
      minZoom: 8,
      maxZoom: 18,
      zoom: 13,
      rotation: 0,
      projection: "EPSG:3857",
    }),
  });
}
