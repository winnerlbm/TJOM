<template>
    <div class="app-cls">
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    /*加载默认模块，本段代码可以注释*/
    import appCfg from "./config/AppCfg";
    import store from "@/store/AppStore";

    export default {
        name: 'app',
        components: {},
        created() {
            this.resizeHtmlFontSize();
        },
        mounted() {
            this.$nextTick(() => {
                this.$router.push('/');
            });
        },
        methods: {
            resizeHtmlFontSize() {
                let docEl = document.documentElement;       //documentElement 属性是根节点
                let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
                let recalc = function () {
                    let clientWidth = docEl.clientWidth;
                    if (!clientWidth) return;
                    let fontSize = 54 * (clientWidth / 1920)
                    docEl.style.fontSize = fontSize + 'px';//设置html根元素的font-size
                    let chartLabelFont = appCfg.common.chartLabelFont * fontSize
                    store.commit('setChartFontSize', chartLabelFont);
                };

                if (!document.addEventListener) return;
                let ctid = -1;
                window.addEventListener(resizeEvt, function () {
                    clearTimeout(ctid);
                    ctid = setTimeout(recalc, 300);
                }, false);
                document.addEventListener('DOMContentLoaded', function () {
                    clearTimeout(ctid);
                    ctid = setTimeout(recalc, 300);
                }, false)
            }
        }
    }
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
