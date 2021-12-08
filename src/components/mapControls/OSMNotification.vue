//OSM通知控件
<template>
  <div id="OSMNotification"></div>
</template>

<script>
import "ol-ext/control/Notification.css";
import Notification from "ol-ext/control/Notification";
import { EventBus } from "@js/event-bus";

export default {
  name: "OSMControls.Notification",
  data() {
    return {
      //通知对象
      notification: new Notification({
        closeBox: true,
      }),
    };
  },
  beforeCreate() {},
  created() {
    this.onMapInit();
    //弹出通知
    this.popupNotification();
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
        window.openLayersMap.addControl(this.notification);
    },
    //弹出通知方法
    popupNotification() {
      EventBus.$on("popNotificationMsg", (data) => {
        data && this.notification.show(data);
      });
    },
  },
};
</script>
