<template>
  <el-col :span="24">
    <el-row style="text-align: left">
      <b>{{ title }}：{{ drawType }}</b>
      <el-select v-model="selectedDrawType" :disabled="drawing" size="medium">
        <el-option
          v-for="item in drawOptions"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="12"> 已绘制 {{ num }}/{{ limit }} 个</el-col>
      <el-col :span="6">
        <el-tooltip effect="dark" content="点击绘制要素" placement="top">
          <el-button
            type="primary"
            icon="el-icon-edit"
            round
            v-on:click="startDraw()"
            :disabled="drawing"
          ></el-button>
        </el-tooltip>
      </el-col>
      <el-col :span="6">
        <el-tooltip effect="dark" content="点击清除要素" placement="top">
          <el-button
            type="danger"
            icon="el-icon-delete"
            round
            v-on:click="clearDrawSource()"
            :disabled="drawing"
          ></el-button>
        </el-tooltip>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
import { EventBus } from "@js/event-bus";

export default {
  name: "AnalysisFunction.Common.DrawFeatureGUI",

  data() {
    return {
      title: "绘制要素",
      operationID: 0, //操作ID
      selectedDrawType: "Point",
      drawOptions: ["Point", "LineString", "Polygon", "Circle"],
      drawSettings: {
        type: "Point",
        featureNumLimit: -1,
        source: window.drawLayer.getSource(),
        warpX: true,
      },
      drawing: false,
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
    num: function () {
      if (!this.drawSettings) return 0;
      //console.log(this.drawSettings.source);
      return this.drawSettings.source.getFeatures().length;
    },
    limit: function () {
      if (!this.drawSettings) return NaN;
      if (
        !this.drawSettings.featureNumLimit ||
        this.drawSettings.featureNumLimit < 0
      )
        return "无限";
      return this.drawSettings.featureNumLimit;
    },
    drawType: function () {
      if (!this.drawSettings) return "未定义形状";
      switch (this.drawSettings.type) {
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
  watch: {
    selectedDrawType(val) {
      EventBus.$emit("drawFeatureMandatoryStopMsg");
      this.drawSettings.type = val;
      console.dir(this.drawSettings);
    },
  },
  methods: {
    //点击开始绘制按钮触发
    startDraw() {
      let that = this;
      if (!this.drawSettings && !this.operationID) {
        return;
      }
      if (
        this.drawSettings.featureNumLimit &&
        this.drawSettings.featureNumLimit > 0
      ) {
        this.drawSettings.condition = function () {
          return that.num < that.drawSettings.featureNumLimit;
        };
      }
      EventBus.$emit("drawFeatureMsg", this.drawSettings, this.operationID);
      this.drawing = true;
    },
    //由DrawFeature组件回传消息触发
    endDraw() {
      EventBus.$on("drawFeatureFinishedMsg", () => {
        this.drawing = false;
        return;
      });
    },
    //点击清除绘制按钮触发
    clearDrawSource() {
      if (!this.drawSettings) return;
      this.drawSettings.source.clear(); //清除绘制源内所有要素
      //this.drawSettings.source.refresh();  //强制刷新图层（无效）
      window.openLayersMap.updateSize();
    },
  },
};
</script>
<style></style>
