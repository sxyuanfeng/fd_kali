<template>
  <div id="app">
    <div id="page-header">
      <page-header></page-header>
    </div>
    <div id="page-container">
      <div id="center" class="column">
        <router-view></router-view>
      </div>
      <div id="left" class="column">
        <page-sidebar></page-sidebar>
      </div>
    </div>
    <div id="page-footer"></div>
  </div>
</template>

<script>
import PageHeader from './components/header/header';
import PageSidebar from './components/sidebar/sidebar';

export default {
  name: 'App',
  components: {
    PageHeader,
    PageSidebar,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.el-scrollbar__wrap{
  overflow-x: hidden;
}

#page-container {
  padding-left: 200px;
}

#page-container .column {
  float: left;
}

#center {
  width: 100%;
}

#left {
  width: 200px; 
  margin-left: -100%;
  position: relative;
  right: 200px;
}

#page-footer {
  clear: both;
}
</style>
