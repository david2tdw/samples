<template>
  <div>
    <div id="fullpage">
      <div class="section">
        <div class="slide">this is not work.</div>
        <div class="slide">Slide 2 this is not work.</div>
        <div class="slide">Slide 3 this is not work.</div>
        <div class="slide">Slide 4 this is not work.</div>
      </div>
      <div class="section active">Some section2</div>
      <div class="section">Some section3</div>
      <div class="section">Some section4</div>
    </div>
  </div>
</template>

<script>
import fullpage from 'fullpage.js'

export default {
  // https://github.com/alvarotrigo/fullPage.js/wiki/Use-module-loaders-for-fullPage.js
  name: 'thisWayNotWork',
  data () {
    return {}
  },
  mounted () {
    console.log(fullpage)
    // Initializing it
    // eslint-disable-next-line
    var fullPageInstance = new fullpage('#fullpage', {
      // navigation: true,
      // sectionsColor: ['#ff5f45', '#0798ec', '#fc6c7c', 'grey']
    })
  }
}

</script>
<style>
.section {
  width: 100%;
  height: 300px;
}
</style>
