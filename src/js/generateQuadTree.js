import getLayerGroupExtent from "./layerGroupExtent";
import { EventBus } from "@js/event-bus.js";
import { getBottomLeft, getHeight, getWidth, isEmpty } from "ol/extent";
import QuadTree from "./QuadTree";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import LayerGroup from "ol/layer/Group";

export default function generateQuadTree(layer) {
  let ext = getLayerGroupExtent(layer);
  let width = Math.max(getHeight(ext), getWidth(ext));
  if (isEmpty(ext) || !width) {
    EventBus.$emit("warnMsg", {
      title: "警告",
      message: "生成外接正方形为空。",
      type: "warning",
    });
    return;
  }
  // console.dir(ext);
  //移除先前的结果
  window.resultLayer &&
    window.openLayersMap &&
    window.openLayersMap.removeLayer(window.resultLayer);

  window.resultLayer = new LayerGroup({
    title: "生成结果",
    layers: [],
    zIndex: 1,
    opacity: 1,
  });

  let bottomLeft = getBottomLeft(ext);
  let rootLayer = new VectorLayer({
    title: "Lv 0",
    source: new VectorSource({}),
    projection: "EPSG:3857",
    zIndex: 0,
    opacity: 1,
  });
  let root = new QuadTree(undefined, 0, "0", bottomLeft, width, rootLayer);
  root.addToLayerGroup(window.resultLayer); //迭代添加图层至图层组
  //将结果图层组添加至地图
  window.openLayersMap && window.openLayersMap.addLayer(window.resultLayer);
  window.openLayersMap.updateSize();

  console.dir(root);
}
