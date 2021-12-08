//比例尺线段控件
<template>
  <div id="OSMScaleLine"></div>
</template>

<script>
import ScaleLine from "ol/control/ScaleLine";
import { EventBus } from "@js/event-bus";

export default {
  name: "OSMControls.ScaleLine",
  data() {
    return {
      //比例尺线段对象
      scaleLine: new ScaleLine(),
    };
  },
  beforeCreate() {},
  created() {
    this.onMapInit();
  },
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
  watch: {},
  methods: {
    onMapInit() {
      EventBus.$on("mapInitializedMsg", () => {
        this.addControl();
      });
    },
    addControl() {
      window.openLayersMap && window.openLayersMap.addControl(this.scaleLine);
    },
  },
};
</script>
<style>
/*覆盖比例尺原样式*/
.ol-scale-line {
  background: rgba(0, 0, 0, 0) !important;
  border-radius: 4px;
  bottom: 1em !important;
  right: 1em;
  left: auto !important;
  padding: 2px;
  position: absolute;
}
</style>
