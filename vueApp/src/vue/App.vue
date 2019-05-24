<template>
  <div id="app">
    <ul>
      <li><Greeter name="World"/></li>
      <li><Greeter name="Dave"/></li>
    </ul>
  </div>
</template>

<script>
import Greeter from '@/vue/components/Greeter/index.vue'


export default {
  name: 'App',
  components: {
    // HelloWorld,
    Greeter
  },
  // methods: {
  //   onMapLoaded(event) {
  //     // console.log("map loaded");
  //     debug.log("bla");
  //     this.map = event.map;
  //   }
  // }
}
</script>

<!-- <style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}
body { margin:0; padding:0; }
</style>
 -->