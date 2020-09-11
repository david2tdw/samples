<template>
  <div>
    <svg @mousemove="mousemove" :width="width" :height="height">
      <g :style="{ transform: `translate(${margin.left}px, ${margin.top}px)` }">
        <path class="area" :d="paths.area" />
        <path class="line" :d="paths.line" />
        <path class="selector" :d="paths.selector" />
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
import TWEEN from '@tweenjs/tween.js'

const props = {
  data: {
    type: Array,
    default: () => [],
  },
  margin: {
    type: Object,
    default: () => ({
      left: 0,
      right: 0,
      top: 10,
      bottom: 10
    })
  },
  ceil: {
    type: Number,
    default: 100,
  }
}

export default {
  name: 'area-chart',
  props,
  data () {
    return {
      width: 0,
      height: 0,
      paths: {
        area: '',
        line: '',
        selector: '',
      },
      lastHoverPoint: {},
      scaled: {
        x: null,
        y: null,
      },
      animatedData: [],
      points: [],
    }
  },
  computed: {
    padded () {
      const width = this.width - this.margin.left - this.margin.right
      const height = this.height - this.margin.top - this.margin.bottom
      return { width, height }
    }
  },
  mounted () {
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },
  methods: {
    onResize () {
      this.width = this.$el.offsetWidth
      this.height = this.$el.offsetHeight
    },
    createArea: d3.area().x(d => d.x).y0(d => d.max).y1(d => d.y),
    createLine: d3.line().x(d => d.x).y(d => d.y),
    createValueSelector: d3.area().x(d => d.x).y0(d => d.max).y1(0),
    initialize () {
      // d3.scaleLinear().domain([]) // 线性比例尺 定义域
      this.scaled.x = d3.scaleLinear().range([0, this.padded.width]) // 线性比例尺 值域
      console.log(this.scaled.x)
      this.scaled.y = d3.scaleLinear().range([this.padded.height, 0])
      console.log(this.scaled.y)
      d3.axisLeft().scale(this.scaled.x)
      d3.axisBottom().scale(this.scaled.y)
    },
    tweenData (newData, oldData) {
      const vm = this
      function animate (time) {
        // console.log(time)
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      // https://www.jianshu.com/p/164538a89939
      // Quadratic ==> 二次方的缓动（t^2）
      // .easing(TWEEN.Easing.easing函数.easing类型)
      new TWEEN.Tween(oldData).easing(TWEEN.Easing.Quadratic.Out).to(newData, 500).onUpdate(function onUpdate () {
        // vm.animatedData = this
        vm.animatedData = newData
        // console.log(newData)
        vm.update()
      }).start()
      animate() // 执行animate()
    },
    update () {
      console.log('update func.')
      // eslint-disable-next-line no-debugger
      debugger
      this.scaled.x.domain(d3.extent(this.data, (d, i) => i))
      this.scaled.y.domain([0, this.ceil])
      this.points = []
      // console.log(this.animatedData)
      for (const [i, d] of this.animatedData.entries()) {
        // console.log(i, d)
        this.points.push({
          x: this.scaled.x(i),
          y: this.scaled.y(d),
          max: this.height,
        })
      }
      // console.log(this.points)
      this.paths.area = this.createArea(this.points)
      this.paths.line = this.createLine(this.points)
    },
    mousemove ({ offsetX}) {
      if (this.points.length > 0) {
        const x = offsetX - this.margin.left
        const closestPoint = this.getClosestPoint(x)
        if (this.lastHoverPoint.index !== closestPoint.index) {
          const point = this.points[closestPoint.index]
          console.log(point)
          this.paths.selector = this.createValueSelector([point])
          console.log(this.paths.selector)
          this.$emit('select', this.data[closestPoint.index])
          this.lastHoverPoint = closestPoint.index
        }
      }
    },
    // map会返回一个新数组
    // https://www.jianshu.com/p/83aa9a2a4055
    getClosestPoint (x) {
      return this.points.map((point, index) => ({
        x: point.x,
        diff: Math.abs(point.x - x),
        index
      })).reduce((memo, val) => (memo.diff < val.diff ? memo: val))
    }
  },
  watch: {
    data: function dataChanged (newData, oldData) {
      this.tweenData(newData, oldData)
    },
    width: function widthChanged () {
      this.initialize()
      this.update()
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  }

}
</script>
<style scoped>
.area {
  fill: #76BF8A;
}
.line {
   stroke: #4F7F5C;
  stroke-width: 1px;
  fill: none;
}
.selector {
  stroke: #28402E;
  stroke-width: 3px;
  fill: none;
}
</style>