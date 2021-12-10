<template>
  <div id="app">
    <div id="popup" class="ol-popup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content"></div>
    </div>
    <OpenLayersMap class="mapClass" />
    <OSMLayerSwitcher ref="OSMLayerSwitcher" />
    <OSMScaleLine ref="OSMScaleLine" />
    <OSMMousePosition ref="OSMMousePosition" />
    <OSMNotification ref="OSMNotification" />
    <OSMDrawPanel ref="OSMDrawPanel" />
    <DrawFeature ref="DrawFeature" />
    <div id="zoomInfo"></div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { EventBus } from "@js/event-bus";
import OpenLayersMap from "@mapArea/OpenLayersMap.vue";
import OSMLayerSwitcher from "@mapControls/OSMLayerSwitcher.vue";
import OSMScaleLine from "@mapControls/OSMScaleLine.vue";
import OSMMousePosition from "@mapControls/OSMMousePosition.vue";
import OSMNotification from "@mapControls/OSMNotification.vue";
import OSMDrawPanel from "@mapControls/OSMDrawPanel.vue";
import DrawFeature from "@mapControls/DrawFeature.vue";

window.openLayersMap = undefined;

export default {
  name: "App",
  components: {
    OpenLayersMap,
    OSMLayerSwitcher,
    OSMScaleLine,
    OSMMousePosition,
    OSMNotification,
    OSMDrawPanel,
    DrawFeature,
  },
  data() {
    return {};
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  errorCaptured() {},
  computed: {},
  methods: {},
  watch: {},
};
</script>

<style>
#app {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

.mapClass {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}

#zoomInfo {
  position: absolute;
  top: 2em;
  right: 3em;
  background-color: white;
}

.ol-popup {
  position: absolute;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -50px;
  min-width: 280px;
}

.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}

.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}

.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}

.ol-popup-closer:after {
  content: "✖";
}
</style>
