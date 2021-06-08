<template>
  <div id="app">
    <!-- router-view通过判断当前组件的嵌套层次，
    然后通过这个层次从route.matches数组中获取当前需要渲染的组件，
    最后调用全局的$createElement来创建对应的VNode完成渲染 -->
    <router-view />
  </div>
</template>

<script>


export default {
  name: 'app',
 
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
</style>
