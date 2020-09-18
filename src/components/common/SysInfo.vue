<template>
    <div class="sys-info-cls">
        <div class="sys-logo-cls"/>
        <span class="sys-title-cls">{{sysTitle}}</span>
        <!--<span class="pot">.</span>
        <span class="gist">GIS平台</span>-->
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
        width: 115px;
        height: 50px;
        margin-left: 20px;
        background-image: url("../../assets/image/logo.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
    }

    .sys-title-cls {
        color: #e2e9e9;
        font-size: 24px;
        font-weight: 500;
        margin-left: 10px ;
    }
    .pot {
        color: #e2e9e9;
        font-size: 24px;
        font-weight: 500;
        margin: 0 14px 5px 14px;
    }
    .gist {
        color: #e2e9e9;
        font-size: 18px;
        font-weight: 500;
        vertical-align: middle;
        margin-top: 8px;
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