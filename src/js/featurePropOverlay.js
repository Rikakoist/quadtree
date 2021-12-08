import Overlay from "ol/Overlay";
import { filterAttribute } from "@common/filterAttribute";
import { objectAttrToTable } from "@common/objAttrToTable";

class FeaturePropOverlay {
  popupContent;
  closer;
  overlay;
  constructor() {}
  init() {
    let that = this;
    this.popupContent = document.getElementById("popup-content");
    this.closer = document.getElementById("popup-closer");
    this.overlay = new Overlay({
      element: document.getElementById("popup"),
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });
    this.closer.onclick = function() {
      that.overlay.setPosition(undefined);
      that.closer.blur();
      return false;
    };
  }

  addOverlay() {
    window.openLayersMap.addOverlay(this.overlay);
  }

  removeOverlay() {
    this.overlay.setPosition(undefined);
    window.openLayersMap.removeOverlay(this.overlay);
  }

  showFeatureProp(e) {
    console.log(e.coordinate);
    let feature = window.openLayersMap.forEachFeatureAtPixel(e.pixel, function(
      feature,
      // eslint-disable-next-line no-unused-vars
      layer
    ) {
      return feature;
    });
    if (feature) {
      let attr = filterAttribute(feature.getProperties());
      //console.dir(attr);
      this.popupContent.innerHTML = "";
      this.popupContent.appendChild(objectAttrToTable(attr));
      this.overlay.setPosition(e.coordinate);
    } else {
      this.overlay.setPosition(undefined);
    }
  }
}
export default FeaturePropOverlay;
