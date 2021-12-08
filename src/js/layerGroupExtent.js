import * as olExtent from "ol/extent";
import LayerGroup from "ol/layer/Group";

//获取图层组的范围
function getLayerGroupExtent(layerGroup) {
  let extent = new olExtent.createEmpty();
  if (layerGroup instanceof LayerGroup) {
    layerGroup.getLayers().forEach(function (layer) {
      olExtent.extend(extent, getLayerGroupExtent(layer));
    });
  } else {
    extent = layerGroup.getSource().getExtent();
  }
  return extent;
}

export default getLayerGroupExtent;
