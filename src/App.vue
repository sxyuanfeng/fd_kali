<template>
  <div id="app">
    <account-value></account-value>
  </div>
</template>

<script>
import AccountValue from './pages/account-value';

export default {
  name: 'App',
  components: {
    AccountValue
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
  margin-top: 60px;
}

.el-scrollbar__wrap{
  overflow-x: hidden;
}
</style>
