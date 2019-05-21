<template>
  <div id="app">
    <vueDemo msg="Welcome" />
  </div>
</template>

<script>
import vueDemo from './components/vueDemo.vue'

export default {
  name: 'app',
  components: {
    vueDemo
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
