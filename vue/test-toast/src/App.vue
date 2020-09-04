<template>
  <div id="app">
    <div @click="showToast">点我出toast</div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},

  methods: {
    showToast() {
      this.$toast("hello world", 2000);
    }
  }
};
</script>