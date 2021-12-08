//比例尺线段控件
<template>
  <div id="MousePosition"></div>
</template>

<script>
import MousePosition from "ol/control/MousePosition";
import { EventBus } from "@js/event-bus";
export default {
  name: "OSMControls.MousePosition",
  data() {
    return {
      //比例尺线段对象
      mousePosition: new MousePosition(),
    };
  },
  beforeCreate() {},
  created() {
    this.onMapInit();
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
  watch: {},
  methods: {
    onMapInit() {
      EventBus.$on("mapInitializedMsg", () => {
        this.addControl();
      });
    },
    addControl() {
      window.openLayersMap &&
        window.openLayersMap.addControl(this.mousePosition);
    },
  },
};
</script>
<style>
</style>
