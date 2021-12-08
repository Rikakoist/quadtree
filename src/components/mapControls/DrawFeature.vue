<template>
  <el-container
    id="drawFeature"
    class="drawFeature"
    :class="{ drawPanelInvisible: !functioning }"
  >
    <el-col :span="24">
      <el-button
        id="finishDrawingBtn"
        type="success"
        round
        v-on:click="finishDrawing()"
        >结束绘制
      </el-button>
      <el-tooltip effect="dark" content="移除上一点" placement="top">
        <el-button icon="el-icon-minus" circle v-on:click="undo()"></el-button>
      </el-tooltip>
      <el-tooltip effect="dark" content="清空所有要素" placement="top">
        <el-button
          type="danger"
          icon="el-icon-delete"
          round
          v-on:click="clearDrawSource()"
        ></el-button>
      </el-tooltip>
    </el-col>
  </el-container>
</template>

<script>
import { EventBus } from "@js/event-bus.js";
import Draw from "ol/interaction/Draw";

export default {
  data() {
    return {
      name: "mapControls.DrawFeature",
      functioning: false, //是否运行中
      drawType: null, //绘制方式
      draw: null, //绘制对象
      drawSource: null, //绘制的源
      drawLayer: null, //绘制的图层
      operationID: null, //操作的ID
    };
  },
  created() {
    this.startDrawing();
    this.mandatoryStop();
  },
  mounted() {},
  methods: {
    //开始绘制
    startDrawing() {
      EventBus.$on("drawFeatureMsg", (drawSettings, operationID) => {
        if (this.functioning) {
          this.finishDrawing();
        }
        if (!drawSettings) {
          console.error("绘制错误：未指定绘制配置。");
          return;
        }
        this.draw = new Draw(drawSettings);
        this.drawSource = drawSettings.source;
        this.drawType = drawSettings.type;
        this.operationID = operationID;
        this.functioning = false;
        if (window.openLayersMap) {
          this.functioning = true;
          console.log(
            `DrawFeature启用，绘制类型:${this.drawType}，操作ID：${operationID}`
          );
        } else {
          console.log(`DrawFeature未启用`);
        }
        if (this.functioning) {
          this.addInteraction();
          EventBus.$emit(
            "popNotificationMsg",
            this.drawType == "None" ||
              this.drawType == undefined ||
              this.drawType == null
              ? "绘制功能错误：没有选择要绘制的要素类型"
              : `请绘制${this.drawTypeTxt}`
          );
        } else {
          this.removeInteraction();
        }
      });
    },
    //绑定地图事件
    addInteraction() {
      this.removeInteraction();
      window.openLayersMap && window.openLayersMap.addInteraction(this.draw);
    },
    //解绑地图事件
    removeInteraction() {
      window.openLayersMap && window.openLayersMap.removeInteraction(this.draw);
    },

    //撤销上一步
    undo() {
      this.draw.removeLastPoint();
    },

    //结束绘制
    finishDrawing() {
      console.log("结束要素绘制");
      EventBus.$emit("drawFeatureFinishedMsg", this.operationID);
      this.removeInteraction();
      this.reset();
    },

    //强制结束绘制
    mandatoryStop() {
      EventBus.$on("drawFeatureMandatoryStopMsg", () => {
        this.removeInteraction();
        this.reset();
      });
    },

    //点击清除绘制按钮触发
    clearDrawSource() {
      if (!this.drawSource) return;
      this.drawSource.clear(); //清除绘制源内所有要素
      window.openLayersMap.updateSize();
    },
    //重置
    reset() {
      this.functioning = false;
      this.drawType = null;
      this.draw = null;
      this.drawSource = null;
      this.drawLayer = null;
      this.operationID = null;
    },
  },
  watch: {},
  computed: {
    drawTypeTxt: function () {
      switch (this.drawType) {
        case "Point": {
          return "点";
        }
        case "LineString": {
          return "线";
        }
        case "Polygon": {
          return "多边形";
        }
        case "Circle": {
          return "圆";
        }
        default: {
          return "未定义形状";
        }
      }
    },
  },
};
</script>
<style>
#drawFeature {
  background-color: transparent;
  /*box-shadow: 0px 1px 4px rgb(0 0 0 / 30%);*/
  position: absolute;
  right: 50vh;
  transform: translateX(-50%);
  bottom: 1em;
}

.drawPanelInvisible {
  display: none;
}
</style>
