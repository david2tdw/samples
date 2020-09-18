<template>
  <div id="app">
    <button id="toggle" @click="toggleCropper">Toggle Cropper</button>
    <input type="checkbox" id="zoomable" v-model="cropOptions.zoomable">
    <label for="zoomable">Zoomable?</label>
    <button @click="$emit('rotate', 90)">Rotate 90°</button>
    <pre id="output">
      x: {{cropData.x}}
      y: {{cropData.y}}
      width: {{cropData.width}}
      height: {{cropData.height}}
    </pre>
    <img v-if="showCropper" @crop="handleCrop" v-cropper="cropOptions" src="./assets/289kb.jpeg" alt="jquery memo" />
  </div>
</template>

<script>
// import Vue from 'vue'
import Cropper from './directives/Cropper'
// const eventHub = new Vue()
export default {
  name: 'App',
  data () {
    return {
      cropData: {},
      cropOptions: {
        viewMode: 0,
        zoomable: false
      },
      showCropper: true
    }
  },
  created () {
    // eventHub.$on('crop', this.handleCrop)
  },
  // events: {
  //   crop (event) {
  //   }
  // },
  directives: {
    Cropper
  },
  methods: {
    handleCrop (event) {
      console.log('aaaa', event)
      this.cropData = {
        x: event.detail.x,
        y: event.detail.y,
        width: event.detail.width,
        height: event.detail.height
      }
    },
    toggleCropper () {
      this.showCropper = !this.showCropper
    }
  },
  beforeDestroy () {
    // eventHub.$off('crop', this.handleCrop)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
img {
  display: block;
  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
</style>
