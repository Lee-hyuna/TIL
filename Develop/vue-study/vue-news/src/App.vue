<template>
  <div id="app">
    <tool-bar></tool-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import ToolBar from './components/ToolBar'

export default {
  name: 'app',
  components: {
    ToolBar,
  }
}
</script>
