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
          <el-row> <DrawFeatureGUI ref="DrawFeatureGUI" /> </el-row>
          <br />
          <el-row>
            <el-button
              type="primary"
              v-on:click="execQuadTree()"
              :disabled="drawing"
            >
              生成四叉树
            </el-button>
          </el-row>
        </div>
      </el-collapse-transition>
    </el-card>
  </div>
</template>

<script>
import { EventBus } from "@js/event-bus";
import DrawFeatureGUI from "@mapControls/DrawFeatureGUI.vue";
import generateQuadTree from "@js/generateQuadTree";

export default {
  name: "OSMControls.DrawPanel",
  components: {
    DrawFeatureGUI,
  },
  data() {
    return {
      drawPanelContentVisible: true, //下拉菜单是否可见
      drawing: false,
    };
  },
  beforeCreate() {},
  created() {
    this.onWarnMsg();
    this.onDrawing();
    this.onDrawEnd();
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
    onDrawing() {
      EventBus.$on("drawFeatureMsg", () => {
        this.drawing = true;
      });
    },
    onDrawEnd() {
      EventBus.$on("drawFeatureFinishedMsg", () => {
        this.drawPanelContentVisible = true;
        this.drawing = false;
      });
      EventBus.$on("drawFeatureMandatoryStopMsg", () => {
        this.drawing = false;
      });
    },
    execQuadTree() {
      generateQuadTree(window.drawLayer);
    },
    onWarnMsg() {
      EventBus.$on("warnMsg", (msgData) => {
        this.$notify(msgData);
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
