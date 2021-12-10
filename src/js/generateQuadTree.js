import getLayerGroupExtent from "@js/layerGroupExtent";
import { EventBus } from "@js/event-bus.js";
import { getBottomLeft, getHeight, getWidth, isEmpty } from "ol/extent";
import QuadTree from "./QuadTree";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import LayerGroup from "ol/layer/Group";
import resStyle from "@js/style/resStyle";

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
  //新建结果图层
  window.quadTreeLayers = [];
  for (let i = 0; i < window.quadTreeMaxLevel; i++) {
    let qLayer = new VectorLayer({
      title: `Lv ${i}`,
      source: new VectorSource({}),
      projection: "EPSG:3857",
      zIndex: i + 1,
      opacity: 1,
      visible: false,
    });
    window.quadTreeLayers[i] = qLayer;
  }
  //应用样式
  window.quadTreeLayers[window.quadTreeMaxLevel - 1].setStyle(resStyle);
  window.quadTreeLayers[window.quadTreeMaxLevel - 1].setVisible(true);
  //清空要素索引
  window.drawLayer
    .getSource()
    .getFeatures()
    .forEach((fea) => {
      fea.set("indexes", []);
      fea.set("geomType", fea.getGeometry().getType());
    });
  // eslint-disable-next-line no-unused-vars
  window.quadTreeRoot = new QuadTree(undefined, 0, "0", bottomLeft, width);
  window.quadTreeLayers.forEach((layer) => {
    window.resultLayer.getLayers().array_.push(layer);
  });
  //将结果图层组添加至地图
  window.openLayersMap && window.openLayersMap.addLayer(window.resultLayer);
  window.openLayersMap.updateSize();
}
