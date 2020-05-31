<template>
    <div class="sys-info-cls">
        <div class="sys-logo-cls"/>
        <span class="sys-title-cls">{{sysTitle}}</span>
    </div>
</template>

<script>
    export default {
        name: "SysInfo",
        data() {
            return {
                sysTitle: process.env.VUE_APP_TITLE
            }
        }
    }
</script>

<style scoped>
    .sys-logo-cls {
        width: 48px;
        height: 48px;
        background-image: url("../../assets/image/logo.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%
    }

    .sys-title-cls {
        color: #01F9E3;
        font-size: 32px;
        font-weight: bold;
        /*margin-left: 10px;*/
    }

    .sys-info-cls {
        overflow: hidden;
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
</style>