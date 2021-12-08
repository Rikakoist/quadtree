<template>
  <div id="app">
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
</style>
