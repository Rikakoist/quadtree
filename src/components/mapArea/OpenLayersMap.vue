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

export default {
  name: "MapArea.OSM",
  components: {},
  data() {
    return {};
  },
  created() {
    this.animateViewToArea();
    this.fitViewToArea();
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
  beforeDestroy() {},
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
        window.openLayersMap &&
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
            //保存移动后的视角位置、缩放、旋转
            // this.$store.commit("OSMView/setOSMViewParams", {
            //   center: toLonLat(center),
            //   zoom: zoom,
            //   rotation: rotation,
            // });
          });
      });
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
