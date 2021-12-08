//绘制面板控件
<template>
  <div id="OSMDrawPanel">
    <el-card>
      <div slot="header">
        <span>控制面板</span>
        <el-button
          v-on:click="setDrawPanelVisibility()"
          style="float: right; padding: 3px 0"
          type="text"
          >{{ drawPanelHeaderDropDown }}
        </el-button>
      </div>
      <el-collapse-transition>
        <div
          id="OSMDrawPanelBody"
          v-show="drawPanelContentVisible"
          style="padding: 20px"
        >
          <DrawFeatureGUI ref="DrawFeatureGUI" />
        </div>
      </el-collapse-transition>
    </el-card>
  </div>
</template>

<script>
import { EventBus } from "@js/event-bus.js";
import DrawFeatureGUI from "@mapControls/DrawFeatureGUI.vue";

export default {
  name: "OSMControls.DrawPanel",
  components: {
    DrawFeatureGUI,
  },
  data() {
    return {
      drawPanelContentVisible: true, //下拉菜单是否可见
    };
  },
  beforeCreate() {},
  created() {
    this.endDraw();
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

  computed: {
    drawPanelHeaderDropDown() {
      return this.drawPanelContentVisible ? "▼" : "▲";
    },
  },
  watch: {},
  methods: {
    //控制面板展开情况
    setDrawPanelVisibility() {
      this.drawPanelContentVisible = !this.drawPanelContentVisible;
    },
    endDraw() {
      EventBus.$on("drawFeatureFinishedMsg", () => {
        this.drawPanelContentVisible = true;
      });
    },
  },
};
</script>
<style>
#OSMDrawPanel {
  position: absolute;
  width: 20em;
  right: 1em;
  bottom: 1em;
}

#OSMDrawPanel .el-card__body {
  padding: 0;
}
</style>
