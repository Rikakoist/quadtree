import Text from "ol/style/Text";
import { Fill, Stroke } from "ol/style";
import Style from "ol/style/Style";

export default function resStyle(feature) {
  return new Style({
    stroke: new Stroke({
      color: "rgba(0,0,0,1)",
      width:1.5,
    }),
    fill: new Fill({
      color: "rgba(127,127,127,0.2)",
    }),
    text: new Text({
      text: feature.get("fullLabel"),
    }),
  });
}
