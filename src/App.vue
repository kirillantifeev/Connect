<template>
    <nav-bar></nav-bar>
    <div class="app">
        <router-view>
            
        </router-view>
    </div>
</template>

<script>
import NavBar from './components/UI/NavBar.vue';

export default {
    components: {
        NavBar
    }
}
</script>

<style>
     * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .app {
        background-color: rgb(231, 238, 241);
        padding: 40px;
    }
</style>