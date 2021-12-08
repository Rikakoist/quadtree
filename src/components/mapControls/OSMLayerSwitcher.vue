//图层切换控件
<template>
  <div id="OSMLayerSwitcher"></div>
</template>

<script>
import "ol-ext/control/LayerSwitcher.css";
import LayerSwitcher from "ol-ext/control/LayerSwitcher";
import { EventBus } from "@js/event-bus";
export default {
  name: "OSMControls.LayerSwitcher",
  data() {
    return {
      //图层切换控件标题
      layerSwitcherHeader: "",
      //图层切换控件对象
      layerSwitcher: new LayerSwitcher({
        collapsed: false,
        selection: true,
        show_progress: true,
        trash: false,
        extent: true,
        drawDelay: 50,
      }),
    };
  },
  beforeCreate() {},
  created() {
    this.onMapInit();
    this.layerSwitcherHeader = "图层列表";
  },
  beforeMount() {},
  mounted() {
    this.addControl();
  },
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  errorCaptured() {},

  computed: {},
  watch: {
    //监听图层切换控件的标题改变
    layerSwitcherHeader: function (val) {
      this.layerSwitcher?.setHeader(val);
    },
  },
  methods: {
    onMapInit() {
      EventBus.$on("mapInitializedMsg", () => {
        this.addControl();
      });
    },
    addControl() {
      window.openLayersMap &&
        window.openLayersMap.addControl(this.layerSwitcher);
    },
  },
};
</script>
<style>
/*覆盖layerswitcher样式*/
.ol-control.ol-layerswitcher {
  left: 1em;
  top: 10em;
  right: auto;
  bottom: auto;
  overflow: hidden;
  line-height: 1.1em;
}
/*按钮位置*/
.ol-layerswitcher > button {
  float: left;
  font-size: 1.5em !important;
}
.ol-layerswitcher > button:hover {
  cursor: pointer;
}
</style>
