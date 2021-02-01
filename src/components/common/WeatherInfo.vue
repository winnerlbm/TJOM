<template>
    <div class="weatherContainerCls">
        <img :src="weatherImg" class="weather"/>
        <span class="week pm25"><img src="@/assets/image/weather/PM2.5.png"/>{{air_pm25}}</span>
        <span class="week pm25">{{air_level}}</span>
        <span class="week">{{cityName}}</span>
        <span class="week">{{weather}}</span>
        <span class="week">{{windy}}</span>
    </div>
</template>

<script>
    import {getWeatherInfo} from '@/api/api'
    import appCfg from "@config/AppCfg"
    export default {
        name: "WeatherInfo",
        data() {
            return {
                weather: '',
                weatherImg: '',
                air_pm25:10,
                air_level:"优",
                windy:'',
                cityName:'天津市'
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.queryWeatherInfo();
                this.getCountryData();
            });
        },
        methods: {
            //天气信息
            queryWeatherInfo() {
                getWeatherInfo("https://www.tianqiapi.com/api?version=v6&city=天津&appid=48344738&appsecret=bPbHS8vf").then(
                    (result) => {
                        this.weather = result['tem2'] + "℃ ~ " + result['tem1'] + "℃";
                        this.weatherImg = require('@/assets/image/weather/' + result['wea_img'] + '.png');
                        this.windy = result.win;
                        //this.air_pm25 = result.air_pm25;
                        //this.air_level = result.air_level;
                    }
                )
            },
            getCountryData(){
                let _self = this;
                let body = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "field":"stationCode",
                            "match":"equal",
                            "value":"1023A",
                            "maxValue":"",
                            "minValue":""
                        }
                    ],
                    "page":{
                        "pageable": false,
                        "currentPage": 1,
                        "pageSize": 10
                    },
                    "sort":{
                        "field": "",
                        "order": "DESC"
                    }
                };
                this.$axios({
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f753f777a0175535ed4b856e7?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    let _self = this;
                    let list = res.data.data.list;
                    let model = list[0];
                    if(model){
                        _self.air_pm25 = model["v121"];
                        _self.air_level = this.getPm25Level(model["v121"]);
                    }
                })
            },
            getPm25Level(val){
                val = parseFloat(val);
                if(val>0&&val<=35){
                    return "优";
                }else if(val>35&&val<=75){
                    return "良";
                }else if(val>75&&val<=115){
                    return "轻度污染";
                }else if(val>115&&val<150){
                    return "中度污染";
                }else if(val>150&&val<250){
                    return "重度污染";
                }else if(val>250&&val<350){
                    return "严重污染";
                }else{
                    return "严重污染";
                }
            }
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
    .pm25 {
        line-height:18px;
        margin-top:1px;
    }
    .pm25 img{
        WIDTH: 20PX;
        VERTICAL-ALIGN: MIDDLE;
    }
</style>
