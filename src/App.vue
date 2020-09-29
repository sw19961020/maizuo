<template>
  <div id="app">
    <section>
        <router-view></router-view>
    </section>
    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from './components/Tabbar.vue'
import Vue from 'vue'

Vue.component('tabbar', tabbar)

export default {

}
</script>

<style lang="scss">
  *{padding: 0;margin: 0;}
  ul,ol{list-style: none;}
  body,html{height: 100%;}
  section{
    margin-bottom: 50px;
  }

</style>
