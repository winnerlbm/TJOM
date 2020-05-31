<template>
    <div class="app-cls">
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    /*加载默认模块，本段代码可以注释*/
    /*export default {
        name: 'app',
        components: {},
        mounted() {
            this.$nextTick(() => {
                this.$router.push('/');
            });
        }
    }*/
</script>

<style>
    @import 'assets/css/font.css';

    .app-cls {
        width: 100%;
        height: 100%;
        margin: 0;
        overflow: hidden;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
