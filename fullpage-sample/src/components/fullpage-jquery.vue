<template>
  <div>
    <div class="header">this is header section.</div>
    <div id="fullpage">
      <div class="section">
        <div class="slide">Slide 1</div>
        <div class="slide">Slide 2</div>
        <div class="slide">Slide 3</div>
        <div class="slide">Slide 4</div>
        <!-- <div class="section">
          this is first content.
        </div> -->
      </div>
      <div class="section active">Some section2</div>
      <div class="section fp-auto-height">
        <div class="fix-height">this section is 710 fixed height</div>
      </div>
      <div class="section fp-auto-height">
        <div class="over-fix-height">this section is 900 fixed height</div>
      </div>
      <div class="section fp-auto-height-responsive">
        <div>
          <h2>Resize the height to less than 410px</h2>
          <h2>Section 1</h2>
          <h2>Section 1</h2>
          <h2>Section 1</h2>
          <h2>Section 1</h2>
          <h2>Section 1</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import 'fullpage.js/dist/jquery.fullpage.css'
// import 'jquery/dist/jquery.min.js'
import 'fullpage.js/dist/jquery.fullpage.js'

export default {
  name: 'app',
  data () {
    return {

    }
  },
  mounted () {
    $('#fullpage').fullpage({
      menu: '#menu',
      navigation: true,
      navigationPosition: 'right',
      navigationTooltips: ['firstSlide', 'secondSlide', 'secondSlide', 'secondSlide'],
      // anchors: ['page1', 'page2', 'page3', 'page4'],
      sectionsColor: ['#41b883', '#ff5f45', '#0798ec', '#41b883'], // 为每个 section 定义 CSS background-color 属性
      bigSectionsDestination: 'top', // 定义如何滚动到超出视图的 section。
      onLeave: function (origin, destination, direction) {
        // section 离开可视区
        console.log('onLeave')
      },
      afterLoad: function (origin, destination, direction) {
        console.log('afterLoad')
      },
      afterRender: function () {
        console.log('afterRender')
      },
      onSlideLeave: function (section, origin, destination, direction) {
        // section里的slide 离开可视区
        console.log('123')
      }
    })
    this.setScroll()
  },
  methods: {
    setScroll () {
      $.fn.fullpage.setAllowScrolling(true)
      console.log('setScroll done.')
    }
  },
  beforeDestroy () {
    $.fn.fullpage.destroy()
  }
}

</script>
<style>
.header {
  position: fixed;
  right: 0;
  left: 0;
  z-index: 1030;
  height: 50px;
  background: blue;
  color: #fff;
  font-size: 2em;
}
.section {
  padding-top: 50px;
  width: 100%;
  text-align: center;
  font-size: 3em;
}
.fix-height {
  height: 710px;
}
.over-fix-height {
  height: 900px;
}
</style>
