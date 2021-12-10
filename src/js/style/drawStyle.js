import { Fill, Stroke, Circle, Style } from "ol/style";
import GeometryType from "ol/geom/GeometryType";

var white = [255, 255, 255, 1];
var blue = [0, 153, 255, 1];
var width = 3;
let styles = {};
styles[GeometryType.POLYGON] = [
  new Style({
    fill: new Fill({
      color: [255, 255, 255, 0.4],
    }),
    stroke: new Stroke({
      color: blue,
      width: width,
    }),
  }),
];
styles[GeometryType.MULTI_POLYGON] = styles[GeometryType.POLYGON];
styles[GeometryType.LINE_STRING] = [
  new Style({
    stroke: new Stroke({
      color: white,
      width: width + 3,
    }),
  }),
  new Style({
    stroke: new Stroke({
      color: blue,
      width: width + 1,
    }),
  }),
];
styles[GeometryType.MULTI_LINE_STRING] = styles[GeometryType.LINE_STRING];
styles[GeometryType.POINT] = [
  new Style({
    image: new Circle({
      radius: width * 2 + 1,
      fill: new Fill({
        color: blue,
      }),
      stroke: new Stroke({
        color: white,
        width: width / 2 + 1,
      }),
    }),
    zIndex: Infinity,
  }),
];
styles[GeometryType.MULTI_POINT] = styles[GeometryType.POINT];
styles[GeometryType.CIRCLE] = styles[GeometryType.POLYGON];
styles[GeometryType.GEOMETRY_COLLECTION] = styles[GeometryType.POLYGON].concat(
  styles[GeometryType.LINE_STRING],
  styles[GeometryType.POINT]
);

export default function drawStyle(feature) {
  return styles[feature.getGeometry().getType()];
}
