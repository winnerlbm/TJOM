<template>
    <div class="top-container-cls">
        <sys-info/>
        <weather-info/>
        <date-info style="margin: 0 10px 0 20px"/>
    </div>
</template>

<script>
    import WeatherInfo from "../common/WeatherInfo";
    import DateInfo from "../common/DateInfo";
    import SysInfo from "../common/SysInfo";

    export default {
        name: "TopContainer",
        components: {SysInfo, DateInfo, WeatherInfo}
    }
</script>

<style scoped>
    .top-container-cls {
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        justify-content: center;
        align-items: stretch;
        width: 100%;
        position: absolute;
        z-index: 999;
        top: 0;
        height: 60px;
       /* background-image: url("../../assets/image/title.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;*/
        left: 0;
        background-color: rgba(3, 30, 56, 0.95);
    }
</style>