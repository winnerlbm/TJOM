<template>
    <div class="weatherContainerCls">
        <img :src="weatherImg" class="weather"/>
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
                weatherImg: ''
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
                getWeatherInfo("https://www.tianqiapi.com/api?version=v6&city=天津&appid=39927915&appsecret=Ws83rr3o").then(
                    (result) => {
                        this.weather = result['tem1'] + "℃ ~ " + result['tem2'] + "℃"
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
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .weather {
        height: 32px;
    }

    .week {
        font-family: lcd;
        color: #01F9E3;
        font-size: 16px;
        line-height: 16px;
    }
</style>
