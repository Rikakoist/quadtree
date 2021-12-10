<template>
  <div>
    <div id="OpenLayersMap" class="OpenLayersMap"></div>
  </div>
</template>

<script>
import "ol/ol.css";
import { toLonLat } from "ol/proj";
import { EventBus } from "@js/event-bus";
import initMap from "@js/initMap";
import elementResizeDetectorMaker from "element-resize-detector";
import FeaturePropOverlay from "@js/featurePropOverlay";

let overlay = new FeaturePropOverlay({});

export default {
  name: "MapArea.OSM",
  components: {},
  data() {
    return {
      init: false,
    };
  },
  created() {
    this.animateViewToArea();
    this.fitViewToArea();
    this.onDrawing();
    this.onDrawEnd();
  },
  mounted() {
    this.onMapInit();
    initMap();
    EventBus.$emit("mapInitializedMsg");
  },
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {
    this.mapEvents(false);
  },
  destroyed() {},
  errorCaptured() {},
  methods: {
    //控制视角动画变换到指定位置的方法
    animateViewToArea() {
      EventBus.$on("animateViewToAreaMsg", (data) => {
        this.view.animate(data);
      });
    },
    //控制视角适应到指定范围的方法
    fitViewToArea() {
      EventBus.$on("fitViewToAreaMsg", (data) => {
        this.view.fit(data);
      });
    },
    onMapInit() {
      EventBus.$on("mapInitializedMsg", () => {
        if (window.openLayersMap) {
          window.openLayersMap.on("moveend", () => {
            let view = window.openLayersMap.getView();
            let zoom = view.getZoom();
            let resolution = view.getResolution();
            let center = view.getCenter();
            let rotation = view.getRotation();
            // console.log(toLonLat(center));

            document.getElementById(
              "zoomInfo"
            ).innerHTML = `Zoom level = ${zoom}</br>Resolution = ${resolution}</br>Center: ${toLonLat(
              center
            )}</br>Rotation: ${rotation}`;
          });
          const erd = elementResizeDetectorMaker();
          erd.listenTo(document.getElementById("OpenLayersMap"), function () {
            window.openLayersMap.updateSize();
          });
        }
        if (!this.init) {
          overlay.init();
          this.init = false;
        }
        this.mapEvents(true);
      });
    },
    onDrawing() {
      EventBus.$on("drawFeatureMsg", () => {
        this.mapEvents(false);
      });
    },
    onDrawEnd() {
      EventBus.$on("drawFeatureFinishedMsg", () => {
        this.mapEvents(true);
      });
      EventBus.$on("drawFeatureMandatoryStopMsg", () => {
        this.mapEvents(true);
      });
    },
    mapEvents(enable) {
      if (enable) {
        //console.warn("启用选择");
        window.openLayersMap.un("pointermove", this.judgePointer);
        window.openLayersMap.un("click", this.showFeatureProp);
        overlay.removeOverlay();
        overlay.addOverlay();
        window.openLayersMap.on("pointermove", this.judgePointer);
        window.openLayersMap.on("click", this.showFeatureProp);
      } else {
        //console.warn("禁用选择");
        window.openLayersMap.un("pointermove", this.judgePointer);
        window.openLayersMap.un("click", this.showFeatureProp);
        overlay.removeOverlay();
      }
    },
    //判断光标位置是否有要素
    judgePointer(e) {
      let hit = window.openLayersMap.hasFeatureAtPixel(e.pixel);
      window.openLayersMap.getViewport().style.cursor = hit ? "pointer" : "";
    },
    //显示要素属性
    showFeatureProp(e) {
      overlay.showFeatureProp(e);
    },
  },
  watch: {},
  computed: {},
};
</script>

<style>
#OpenLayersMap {
  width: 100%;
  height: 100%;
}
.ol-zoom {
  top: 10px;
  left: 1em;
}
.ol-rotate {
  top: 7em;
  left: 1em;
  right: auto;
  transition: opacity 0.25s linear, visibility 0s linear;
}
</style>
