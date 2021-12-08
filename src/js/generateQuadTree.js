import getLayerGroupExtent from "./layerGroupExtent";
import { EventBus } from "@js/event-bus.js";
import { getBottomLeft, getHeight, getWidth, isEmpty } from "ol/extent";
import Polygon from "ol/geom/Polygon";
import Feature from "ol/Feature";

export default function generateQuadTree(layer) {
  let ext = getLayerGroupExtent(layer);
  let length = Math.max(getHeight(ext), getWidth(ext));
  if (isEmpty(ext) || !length) {
    EventBus.$emit("warnMsg", {
      title: "警告",
      message: "生成外接正方形为空。",
      type: "warning",
    });
    return;
  }
  // console.dir(ext);

  let bottomLeft = getBottomLeft(ext);
  let bottomRight = [bottomLeft[0], bottomLeft[1] + length];
  let topLeft = [bottomLeft[0] + length, bottomLeft[1]];
  let topRight = [bottomLeft[0] + length, bottomLeft[1] + length];
  // console.log(bottomLeft);
  //console.log(length);
  // console.log(topRight);
  let poly = new Polygon([
    [bottomLeft, bottomRight, topRight, topLeft, bottomLeft],
  ]);
  let fea = new Feature(poly);
  window.resultLayer.getSource().clear();
  window.resultLayer.getSource().addFeature(fea);
  window.openLayersMap.updateSize();
}
