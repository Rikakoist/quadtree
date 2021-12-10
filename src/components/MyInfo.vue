//头像
<template>
  <div id="MyInfo">
    <a href="https://github.com/rikakoist" target="_blank">
      <el-image src="/head.png" fit="fit"></el-image>
    </a>
  </div>
</template>

<script>
export default {
  name: "Controls.MyInfo",
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
  watch: {},
  methods: {},
};
</script>
<style>
#MyInfo {
  position: absolute;
  left: 1.5em;
  bottom: 1.5em;
  width: 60px;
  height: 60px;
  z-index: 9999;
}
</style>