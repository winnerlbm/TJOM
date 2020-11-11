<template>
    <div class="weatherContainerCls">
        <img :src="weatherImg" class="weather"/>
        <span class="week">{{cityName}}</span>
        <span class="week">{{weather}}</span>
    </div>
</template>

<script>
    import {getWeatherInfo} from '@/api/api'

    export default {
        name: "WeatherInfo",
        data() {
            return {
                weather: '',
                weatherImg: '',
                cityName:'天津市'
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.queryWeatherInfo();
            });
        },
        methods: {
            //天气信息
            queryWeatherInfo() {
                getWeatherInfo("https://www.tianqiapi.com/api?version=v6&city=天津&appid=48344738&appsecret=bPbHS8vf").then(
                    (result) => {
                        this.weather = result['tem2'] + "℃ ~ " + result['tem1'] + "℃";
                        this.weatherImg = require('@/assets/image/weather/' + result['wea_img'] + '.png')
                    }
                )
            },
        }
    }
</script>

<style scoped>
    .weatherContainerCls {
        display: flex;
        height: 100%;
        overflow: hidden;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .weather {
        height: 25px;
    }

    .week {
        font-family: lcd;
        color: #03e8eb;
        font-size: 16px;
        line-height: 16px;
        font-weight: 600;
        margin-left: 10px;
    }
</style>
