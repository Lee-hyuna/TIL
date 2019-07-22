<template>
    <div id="app">
        
        ㅁㄴㅇㅁㄴㅇ
        <h2   >asd</h2>
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
