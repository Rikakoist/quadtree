<template>
  <el-col :span="24">
    <el-row style="text-align:left;margin-bottom:.3em;">
      <b>{{ internalInfo.title }}</b>
    </el-row>
    <el-row type="flex" align="middle" :gutter="10">
      <el-col :span="18">
        <el-input-number
            show-input
            :size="internalInfo.size"
            v-model="value"
            :min="internalInfo.min"
            :max="internalInfo.max"
            :step="internalInfo.step"
            :show-tooltip="false"
            @change="valueChanged($event)"
        >
        </el-input-number>
      </el-col>
      <el-col :span="6">
        <el-tooltip effect="dark" content="重置数值" placement="top">
          <el-button
              type="danger"
              icon="el-icon-refresh-right"
              round
              v-on:click="reset()"
          ></el-button>
        </el-tooltip>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>

// eslint-disable-next-line no-unused-vars
import {EventBus} from "@js/event-bus";

export default {
  name: "OSMControls.InputNumberGUI",
  props: {
      title: {type: String, required: false}, //控件标题
      size: {type: String, required: false}, //控件尺寸
      min: {type: Number, required: false}, //输入最小值
      max: {type: Number, required: false}, //输入最大值
      step: {type: Number, required: false}, //输入步长
      defaultValue: {type: Number, required: false}, //输入默认值
  },
  data() {
    return {
      value: 3,
    };
  },
  beforeCreate() {
  },
  created() {
  },
  beforeMount() {
  },
  mounted() {
    this.reset();
  },
  beforeUpdate() {
  },
  updated() {
  },
  activated() {
  },
  deactivated() {
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  errorCaptured() {
  },

  computed: {
    internalInfo() {
      return {
        title: this.title ?? "树最大层数",
        size: this.size ?? "",
        min: this.min ?? 2,
        max: this.max ?? 5,
        step: this.step ?? 1,
        defaultValue: this.defaultValue ?? 3,
      }
    }
  },
  watch: {},
  methods: {
    //滑块值改变触发
    // eslint-disable-next-line no-unused-vars
    valueChanged(ev) {
      //console.log(ev);
    },
    //点击重置按钮触发
    reset() {
      //console.log(this.internaldefaultValue)
      this.value = this.internalInfo.defaultValue;
    },
  },
};
</script>
