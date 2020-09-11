<template>
  <div>
    <h1>Area Chart</h1>
    <responsive-area-chart @select="onSelect" :data="data" :ceil="max" class="area-chat"></responsive-area-chart>
    <div class="content">
      <h3>Selected Value: {{currentValue}}</h3>
      <div><label for="">Record Count:</label><input type="text" v-model="itemCount"></div>
      <div><label for="">Min Value:</label><input type="text" v-model="min"></div>
      <div><label for="">Max Value:</label><input type="text" v-model="max"></div>
    </div>
  </div>
</template>

<script>
import ResponsiveAreaChart from 'components/ResponsiveAreaChart'
import generateData from './randomData'
export default {
  data () {
    return {
      data: [],
      chartWidth: 0,
      currentValue: null,
      itemCount: 25,
      min: 10,
      max: 100,
    }
  },
  mounted () {
    setInterval(() => {
      this.data = generateData(this.itemCount, parseInt(this.min, 10), parseInt(this.max, 10))
    }, 5000);
  },
  methods: {
    onSelect (value) {
      this.currentValue = value
    }
  },
  components: {
    ResponsiveAreaChart
  }
}
</script>

<style scoped>
.area-chat {
  height: 300px;
}
</style>