<script src="../../../public/libs/heatmap/leaflet-heatmap.js"></script>
<template>
    <div style="flex: 1">
        <div id="map">
            <!--数据统计面板-->
            <info-container v-show="false" class="map-info-cls"/>
            <!--图层管理面板-->
            <layer-container class="layerClass" v-show="layersShow == true"></layer-container>
            <!--搜索面板-->
            <search-container class="searchClass"></search-container>
            <!--工具条面板-->
            <div class="mapTools">
                <ul>
                    <li @click="setWindy" :class="{'spanSel':windySelect == true}">
                        <img :src="toolImg.windyImg" alt="">
                        <span>风场</span>
                    </li>
                    <li @click="setRoadMap"  :class="{'spanSel':roadSelect == true}" style="border-right: 1px solid rgba(12, 60, 119, 0.64);">
                        <img :src="toolImg.roadImg" alt="">
                        <span>路况</span>
                    </li>
                    <li @click="setMapBox"  :class="{'spanSel':mapboxShow == true}"  style="padding-right: 5px;border-right: 1px solid rgba(12, 60, 119, 0.64);">
                        <img :src="toolImg.mapboxImg" style="width: 15px;height: 15px;" alt="">
                        <span>工具箱</span>
                        <img class="openBox" :src="toolImg.updowImg" alt="">
                    </li>
                    <li @click="setLayers"  :class="{'spanSel':layersShow == true}">
                        <img :src="toolImg.layerImg" alt="">
                        <span>图层</span>
                    </li>
                </ul>
            </div>
            <div class="mapboxs" v-show="mapboxShow == true">
                <ul>
                    <li  v-for="(item,key) in toolList" :key="key" @click="queryMap(item,key)"  @click.stop="doSomething($event)" >
                        <img :src="item.image" alt="">
                        <span>{{item.name}}</span>
                    </li>
                </ul>
            </div>
            <div class="menusDiv">
                <ul>
                    <li  v-for="(item,key) in menuList" :key="key" @click="selectedMenu(item,key)" :class="{'active':selecteIndex == key}">
                        <img :src="item.image" alt="">
                        <span>{{item.name}}</span>
                    </li>
                </ul>
            </div>
            <div class="baseMap"  v-show="showClass == 'baseMap'">
                <ul>
                    <li v-for="(item,key) in mapList" :key="key" @click="changeMap(item,key)" :class="{'active':selecteMapIndex == key}">
                        <img :src="item.image" alt="">
                        <span>{{item.name}}</span>
                    </li>
                </ul>
            </div>

            <div class="themeLayer" v-show="showClass == 'themeMap'">
                <ul>
                    <li v-for="(item,key) in themeList" @click="addTemLayer(item)" :class="{'active':item.selected===true}">
                        <span class="bgspan"></span>
                        <span>{{item.name}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <!--业务图层-->
        <div class="dataLayer">

        </div>
        <time-line :options="options" @onAnimate="onAnimate" @onClickEnd="onclick"></time-line>
    </div>
</template>

<script>
    import L from "leaflet";
    import appCfg from "@config/AppCfg"
    import {getWindyData, getWfsFeature} from '@api/api'
    import InfoContainer from "./InfoContainer";
    import layerContainer from "./layerContainer";
    import SearchContainer from "./SearchContainer";
    import TimeLine from "../util/TimeLine";

    export default {
        name: "MapContainer",
        components: {InfoContainer,layerContainer,SearchContainer,TimeLine},
        data() {
            return {
                highLayer: null,
                featureProps: null,
                windyLayer:null,
                selecteIndex:0,
                selecteMapIndex:0,
                windySelect:false,
                roadSelect:false,
                showClass:"baseMap",
                mapboxShow:false,
                layersShow:false,
                allgrid:[],//风力数据存储
                menuList:[
                    {name:"基础地图",type:"baseMap",image:require("../../assets/image/menu/map-roam_active.png")},
                    {name:"专题地图",type:"themeMap",image:require("../../assets/image/menu/map-tool_active.png")},
                    {name:"业务数据",type:"workData",image:require("../../assets/image/menu/plan_active.png")},
                    {name:"数据统计",type:"analyData",image:require("../../assets/image/menu/analysis_active.png")},
                    {name:"管理清单",type:"manager",image:require("../../assets/image/menu/3D_active.png")},
                    {name:"数据搜索",type:"roadPlan",image:require("../../assets/image/menu/sxsearch_active.png")}
                ],
                mapList:[
                    {id:"tdtLayer",name:"蓝黑版",type:"PurplishBlue",image:require("../../assets/image/map/mapblue.jpg")},
                    {id:"tdtLayer",name:"影像图",type:"tdtimg",image:require("../../assets/image/map/mapimg.jpg")},
                    {id:"tdtLayer",name:"矢量图",type:"tdtvec",image:require("../../assets/image/map/mapvec.jpg")},
                    {id:"tdtLayer",name:"地形图",type:"tdtter",image:require("../../assets/image/map/mapter.jpg")}

                 //   {id:"tdtLayer",name:"暖色版",type:"Warm",image:require("../../assets/image/google.png")}
                ],
                themeList:[
                    {id:"theme_road",name:"路况",type:"road",selected:false},
                    {id:"theme_windy",name:"风场",type:"windy",selected:false},
                    {id:"theme_tem",name:"温度",type:"temperature",selected:false},
                    {id:"theme_rain",name:"降水量",type:"rain",selected:false},
                    {id:"theme_radar",name:"雷达回波",type:"radar",selected:false},
                    {id:"theme_sate",name:"卫星云图",type:"satellite",selected:false},
                    {id:"theme_clouds",name:"云量",type:"clouds",selected:false},
                    {id:"theme_wind",name:"风速",type:"wind",selected:false},
                    {id:"theme_pressure",name:"气压",type:"pressure",selected:false},
                    {id:"theme_storm",name:"雷暴",type:"storm",selected:false},
                    {id:"theme_humidity",name:"湿度",type:"humidity",selected:false},
                    {id:"theme_wave",name:"波浪",type:"wave",selected:false},
                    {id:"theme_snow",name:"积雪层",type:"snow",selected:false},
                    {id:"theme_air",name:"空气污染",type:"air",selected:false}
                ],
                toolList:[
                    {name:"点查询",type:"queryPoint",image:require("../../assets/image/menu/queryPoint.png")},
                    {name:"线查询",type:"queryLine",image:require("../../assets/image/menu/queryLine.png")},
                    {name:"面查询",type:"queryPolygon",image:require("../../assets/image/menu/queryPolygon.png")},
                    {name:"缓冲区",type:"queryBuffer",image:require("../../assets/image/menu/queryBuffer.png")},
                    {name:"多点导航",type:"mulPoint",image:require("../../assets/image/menu/mulPoint.png")}
                ],
                toolImg:{
                    windyImg:require("../../assets/image/menu/wind.png"),
                    roadImg:require("../../assets/image/menu/road.png"),
                    mapboxImg:require("../../assets/image/menu/toolbox.png"),
                    layerImg:require("../../assets/image/menu/layers.png"),
                    updowImg:require("../../assets/image/menu/up.png")
                },
                layerTemps:[],
                drawControl:null,
                options: {
                    speedConfig: { // 速度配置
                        "慢": 5000,
                        "中":3000,
                        "快":1000,
                    },
                    speed:1000,
                    startDate:'2018-07-01 ',
                    endDate:'2018-07-31',
                    timeUnitControl: true, //是否显示时/天切换控件
                    timeUnit: '天', // 默认按天还是按小时
                    isShowHour: true, // 按小时是否可点
                }
            };
        },
        //需要页面加载完执行的方法,可以写在$nextTick中
        mounted() {
            this.$nextTick(() => {
                this.$mapUtil.initMap('map')
               // this.getWindyData()
                this.$mapUtil.wmsLayer('NPWS:TjMap').addTo(this.$mapUtil.lMap)
              //  this.queryFeatureByClick('NPWS:TjMap', 2000, 'the_geom', this.$mapUtil.lMap)
               // this.$mapUtil.heatmapLayer(this.$mapUtil.lMap)
               // this.$mapUtil.removeLayer("layeri",this.$mapUtil.lMap)
                this.$mapUtil.lMap.on('click', (evt) => {
                    if (evt.latlng) {
                        if(this.$mapUtil.lMap.hasLayer(this.windyLayer)){
                            let lat = evt.latlng.lat, lng = evt.latlng.lng;
                            let details = this.getWindyDetail([lng,lat]);
                            let winHtml = this.createWinyHtml(details)
                            L.popup()
                                .setLatLng([lat,lng])
                                .setContent(winHtml)
                                .openOn(this.$mapUtil.lMap);

                        }else{
                            this.queryFeatureByClick('NPWS:TjMap', 2000, 'the_geom', this.$mapUtil.lMap,evt)
                        }
                    }
                });

                var drawnItems = new L.FeatureGroup();
                this.$mapUtil.lMap.addLayer(drawnItems);
                this.drawControl = new L.Control.Draw({
                    edit: {
                        featureGroup: drawnItems
                    }
                });
               // this.$mapUtil.lMap.addControl(drawControl);
                this.$mapUtil.lMap.on(L.Draw.Event.CREATED, function (event) {
                    var layer = event.layer;
                    drawnItems.addLayer(layer);
                });
            });
        },
        methods: {
            /*加载风场数据*/
            getWindyData() {
                getWindyData().then((data) => {
                    console.log(data);
                    if (data && data.length > 0) {
                        this.analysisWindyData(data);
                        this.windyLayer = this.$mapUtil.windyLayer(data);
                        this.$mapUtil.lMap.addLayer(this.windyLayer);
                    } else {
                        console.log('风场数据加载失败！')
                    }
                })
            },
            queryFeatureByClick(wfsName, maxCount, geomField, map,evt) {
                if (evt.latlng) {
                    let lat = evt.latlng.lat, lng = evt.latlng.lng,
                        urlTemplate = appCfg.map.wfsRootUrl + "?service=WFS&request=GetFeature&version=1.0.0%20&typeName=" + wfsName + "&maxFeatures=" + maxCount + "&outputFormat=json&filter=%20%3CFilter%20xmlns=%22http://www.opengis.net/ogc%22%20xmlns:gml=%22http://www.opengis.net/gml%22%3E%20%3CIntersects%3E%20%3CPropertyName%3E" + geomField + "%3C/PropertyName%3E%20%3Cgml:Point%3E%20%3Cgml:coordinates%3E" + lng + "," + lat + "%3C/gml:coordinates%3E%20%3C/gml:Point%3E%20%3C/Intersects%3E%20%3C/Filter%3E"

                    getWfsFeature(urlTemplate).then((data) => {
                        if (this.highLayer) {
                            map.removeLayer(this.highLayer)
                        }
                        if (data && data.features && data.features.length > 0) {
                            //获取要素属性
                            this.featureProps = data.features["0"].properties
                            this.highLayer = L.geoJSON(data, {
                                style: function (feature) {
                                    return {color: appCfg.common.hColor}
                                }
                            })
                            this.highLayer.addTo(map)
                            let winHtml = '<div class="popuDiv"><span>区域名称：</span>'+this.featureProps.MAP_NAME+'</div>';
                            L.popup()
                                .setLatLng([lat,lng])
                                .setContent(winHtml)
                                .openOn(this.$mapUtil.lMap);
                            this.highLayer.bindPopup();
                        } else {
                            console.log("空间查询失败")
                        }
                    })
                }
            },
            addTemLayer(item){
                item.selected = !item.selected;
                if(item.type == "windy"){
                    this.setWindy(item.selected);
                }else if(item.type == "road"){
                    this.setLayerToMap(item.selected,"roadLayer","Geoq.Road.road");
                }else if(item.type == "rain"){
                    this.setLayerToMap(item.selected,"rainLayer","WeatherMap.Weather.Rain");
                }else if(item.type == "temperature"){
                    this.setLayerToMap(item.selected,"temperatureLayer","WeatherMap.Weather.Temp");
                }else if(item.type == "clouds"){
                    this.setLayerToMap(item.selected,"cloudsLayer","WeatherMap.Weather.Cloud");
                }else if(item.type == "wind"){
                    this.setLayerToMap(item.selected,"windLayer","WeatherMap.Weather.Wind");
                }else if(item.type == "pressure"){
                    this.setLayerToMap(item.selected,"pressureLayer","WeatherMap.Weather.Pressure");
                }
                console.log(item.type);
            },
            setWindy(){
                this.windySelect = !this.windySelect;
                if(!this.windySelect&&this.windyLayer){
                    this.$mapUtil.lMap.removeLayer(this.windyLayer);
                    this.toolImg.windyImg = require("../../assets/image/menu/wind.png");
                }else{
                    this.getWindyData();
                    this.toolImg.windyImg = require("../../assets/image/menu/windSel.png");
                }
            },
            createWinyHtml(details){
                let html = [];
                html.push('<div class="popuDiv"><span>风向：</span>'+details.direction+'</div>');
                html.push('<div class="popuDiv"><span>风力：</span>'+details.level+'级</div>');
                html.push('<div class="popuDiv"><span>风速：</span>'+details.speed+' 米/秒</div>');
                return html.join('');
            },
            setRoadMap(){
                this.roadSelect = !this.roadSelect;
                let layerId = "roadLayer";
                if(!this.roadSelect){
                    this.layerTemps.some((item,i) =>{
                        if(item.layerId == layerId){
                            this.$mapUtil.lMap.removeLayer(item.layer);
                            this.layerTemps.slice(i,1);
                        }
                    });
                    this.toolImg.roadImg = require("../../assets/image/menu/road.png");
                }else{
                    let layer = L.tileLayer.chinaProvider("Geoq.Road.road", {
                        id:layerId
                    }).addTo(this.$mapUtil.lMap);
                    this.layerTemps.push({layerId:layerId,layer:layer});
                    this.toolImg.roadImg = require("../../assets/image/menu/roadSel.png");
                }
            },
            setMapBox(){
                this.mapboxShow = !this.mapboxShow;
                if(!this.mapboxShow){
                    this.toolImg.mapboxImg = require("../../assets/image/menu/toolbox.png");
                    this.toolImg.updowImg = require("../../assets/image/menu/up.png");
                }else{
                    this.layersShow = false;
                    this.toolImg.mapboxImg = require("../../assets/image/menu/mapboxSel.png");
                    this.toolImg.updowImg = require("../../assets/image/menu/down.png");
                    this.toolImg.layerImg = require("../../assets/image/menu/layers.png");
                }
            },
            setLayers(){
                this.layersShow = !this.layersShow;
                if(!this.layersShow){
                    this.toolImg.layerImg = require("../../assets/image/menu/layers.png");
                }else{
                    this.mapboxShow = false;
                    this.toolImg.mapboxImg = require("../../assets/image/menu/toolbox.png");
                    this.toolImg.layerImg = require("../../assets/image/menu/layerSel.png");
                }
            },
            setLayerToMap(selected,layerId,layerName){
                if(!selected){
                    this.layerTemps.some((item,i) =>{
                        if(item.layerId == layerId){
                            this.$mapUtil.lMap.removeLayer(item.layer);
                            this.layerTemps.slice(i,1);
                        }
                    });
                }else{
                    let layer = L.tileLayer.chinaProvider(layerName, {
                        id:layerId
                    }).addTo(this.$mapUtil.lMap);
                    this.layerTemps.push({layerId:layerId,layer:layer});
                }
            },
            selectedMenu(item,key){
                this.selecteIndex = key;
                this.showClass = item.type;
            },
            changeMap(item,key){
                this.selecteMapIndex = key;
                this.$mapUtil.changeBaseMap(this.$mapUtil.lMap,item.type);
            },
            queryMap(item,key){
                if(item.type == "queryPoint"){
                    new L.Draw.Marker(this.$mapUtil.lMap ,this.drawControl.options.marker).enable();
                }else if(item.type == "queryLine"){
                    new L.Draw.Polyline(this.$mapUtil.lMap,this.drawControl.options.polyline).enable();
                }else if(item.type == "queryPolygon"){
                    new L.Draw.Polygon(this.$mapUtil.lMap,this.drawControl.options.polygon).enable();
                }else if(item.type == "queryBuffer"){

                }else {

                }



            },
            analysisWindyData(windydata) {
                var p = 0;
                var east, north;
                if (windydata[0].header.parameterNumberName == "eastward_wind") {
                    east = windydata[0];
                    north = windydata[1];
                } else {
                    east = windydata[1];
                    north = windydata[0];
                }
                for (var j = 0; j < north.header.ny; j++) {
                    var row = [];
                    for (var i = 0; i < north.header.nx; i++, p++) {
                        row[i] = [east.data[p], north.data[p]];
                    }
                    this.allgrid[j] = row;
                }
            },
            getWindyDetail(coord) {
                var lng = coord[0];
                var lat = coord[1];
                // 与格网序列的数据转换
                if (lng >= 0) {
                    lng = Math.floor(lng);
                } else {
                    lng = 360 + Math.floor(lng)
                }
                lat = 90 - Math.floor(lat);
                // 获取对应的格网序列
                var xlength = lng;
                var ylength = lat;
                var xdata, ydata;
                xdata = this.allgrid[Math.abs(ylength)][Math.abs(xlength)][0];
                ydata = this.allgrid[Math.abs(ylength)][Math.abs(xlength)][1];
                console.log(xdata);
                console.log(ydata);
                if (typeof xdata != "number" || typeof ydata != "number") {
                    console.error("暂无该区域风向数据！");
                    return;
                }
                var v = Math.sqrt(Math.pow(xdata, 2) + Math.pow(ydata, 2));
                var angle = this.getWindyAngle(xdata, ydata);
                var result = {
                    "direction": this.getWindyDirection(angle),
                    "level": this.getWindyLevel(v),
                    "speed": v.toFixed(2)
                };
                return result;
            },
            getWindyDirection(angle) {
                if ((angle >= 0 && angle <= 22.5) || (angle <= 360 && angle > 337.5)) {
                    return "北风";
                }
                if (angle <= 337.5 && angle > 292.5) {
                    return "西北风";
                }
                if (angle <= 292.5 && angle > 247.5) {
                    return "西风";
                }
                if (angle <= 247.5 && angle > 202.5) {
                    return "西南风";
                }
                if (angle <= 202.5 && angle > 157.5) {
                    return "南风";
                }
                if (angle <= 157.5 && angle > 112.5) {
                    return "东南风";
                }
                if (angle <= 112.5 && angle > 67.5) {
                    return "东风";
                }
                if (angle <= 67.5 && angle > 22.5) {
                    return "东北风";
                }
            },
            getWindyAngle(u, v) {
                var fx = 0;
                if (u > 0 & v > 0) {
                    fx = 270 - Math.atan(v / u) * 180 / Math.PI;
                } else if (u < 0 & v > 0) {
                    fx = 90 - Math.atan(v / u) * 180 / Math.PI;
                } else if (u < 0 & v < 0) {
                    fx = 90 - Math.atan(v / u) * 180 / Math.PI;
                } else if (u > 0 & v < 0) {
                    fx = 270 - Math.atan(v / u) * 180 / Math.PI;
                } else if (u == 0 & v > 0) {
                    fx = 180;
                } else if (u == 0 & v < 0) {
                    fx = 0;
                } else if (u > 0 & v == 0) {
                    fx = 270;
                } else if (u < 0 & v == 0) {
                    fx = 90;
                } else if (u == 0 & v == 0) {
                    fx = 999.9;
                }
                return fx;
            },
            getWindyLevel(v) {
                if (v < 0.3) {
                    return 0;
                }
                if (v >= 0.3 && v < 1.6) {
                    return 1;
                }
                if (v >= 1.6 && v < 3.4) {
                    return 2;
                }
                if (v >= 3.4 && v < 5.5) {
                    return 3;
                }
                if (v >= 5.5 && v < 8.0) {
                    return 4;
                }
                if (v >= 8.0 && v < 10.8) {
                    return 5;
                }
                if (v >= 10.8 && v < 13.9) {
                    return 6;
                }
                if (v >= 13.9 && v < 17.2) {
                    return 7;
                }
                if (v >= 17.2 && v < 20.8) {
                    return 8;
                }
                if (v >= 20.8 && v < 24.5) {
                    return 9;
                }
                if (v >= 24.5 && v < 28.5) {
                    return 10;
                }
                if (v >= 28.5 && v < 32.7) {
                    return 11;
                }
                if (v >= 32.7 && v < 37.0) {
                    return 12;
                }
                if (v >= 37.0 && v < 41.5) {
                    return 13;
                }
                if (v >= 41.5 && v < 46.2) {
                    return 14;
                }
                if (v >= 46.2 && v < 51.0) {
                    return 15;
                }
                if (v >= 51.0 && v < 56.1) {
                    return 16;
                }
                if (v >= 56.1 && v < 61.2) {
                    return 17;
                }
                if (v >= 61.2) {
                    return 18;
                }

            },
            doSomething(e){

            },
            onAnimate(val){
                console.log(val);
            },
            onclick(val){
                console.log(val);
            }
        }
    }
</script>


<style scoped>
    #map {
        width: 100%;
        height: 100%;
        margin: 0;
        overflow: hidden;
        cursor: pointer;
    }
    .spanSel>span {
        color: #3385fe;
    }
    .map-info-cls {
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: 999;
    }
    .menusDiv {
        position: absolute;
        top: 10px;
        z-index: 999;
        left: 10px;
        text-align: center;
        background-color: rgba(27, 27, 27, 0.85);
        color: #97c2ea;
        border-radius: 5px;
        border: 1px solid rgba(3, 169, 244, 0.64);
        padding: 2px;
        display: none;
    }
    .menusDiv ul {
        list-style: none;
        display: flex;
        margin: 0;
        padding: 0 5px;
    }
    .menusDiv ul li{
        padding: 7px 10px;
        border-radius: 5px;
     }
    .menusDiv ul li.active,.menusDiv ul li:hover {
        background-color: rgba(63, 81, 181, 0.5);
        color: #4895dc;
    }
    .menusDiv ul li span{
        display: block;
        margin-top:-10px ;
    }
    .menusDiv ul li img{
        width: 35px;
    }
    .baseMap {
        position: absolute;
        bottom: 10px;
        z-index: 999;
        right: 0;
        text-align: center;
        height: 74px;
        overflow: hidden;
        transition-property: width,background-color;
        transition-duration: .4s;
        width: 110px;
    }
    .baseMap:hover {
        width: 410px;
        -webkit-transition-property: width,background-color;
        transition-property: width,background-color;
        -webkit-transition-duration: .4s;
        transition-duration: .4s;
    }

    .baseMap ul{
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        margin: 0;
        padding: 5px;
        width: 100%;
    }
    .baseMap ul>li {
        width: 85px;
        text-align: center;
        cursor: pointer;
        font-size: 12px;
        border-radius: 3px;
        padding: 1px;
        margin: 0 5px;
        border: 1px solid #4f74a5;
        position: relative;
        height: 65px;
    }

    .baseMap ul>li img{
        width: 85px;
        height: 65px;
        border-radius: 3px;
    }
    .baseMap ul>li span{
        display: inline-block;
        width: 85px;
        background-color: #3498db;
        color: #fff;
        margin-top: -10px;
        position: absolute;
        bottom: 1px;
        left: 1px;
        padding: 0;
        border-radius: 0 0 3px 3px;
    }
    .baseMap ul>li.active,.baseMap ul>li:hover {
        border:1px solid #FF5722;
    }


    .themeLayer {
        position: absolute;
        top: 100px;
        z-index: 999;
        left: 10px;
        text-align: center;
    }
    .themeLayer  ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .themeLayer li {
        background: rgba(0,0,0,.5);
        color: #fff;
        border-radius: 2em;
        padding: 0 1.25em;
        line-height: 2.142em;
        margin: 3px 0 0 0;
        font-family: Helvetica Neue,Arial,Helvetica,sans-serif;
        font-weight: 700;
        display: inline-block;
        transition: .2s;
        position: relative;
        float: left;
        clear: both;
        width: 80px;
        text-align: left;
    }
    .themeLayer li.active,.themeLayer li:hover {
        background-color: rgba(25, 148, 204, 0.75);
    }
    .themeLayer li .bgspan{
        background-image: url("../../assets/image/icons_prepinac_v5.svg");
        background-repeat: no-repeat;
        display: inline-block;
        height: 30px;
        width:30px;
        vertical-align: middle;
    }
    .themeLayer li span {
        vertical-align: middle;
    }
    .themeLayer li:nth-child(1) .bgspan{
        background-position: -30px -30px;
    }
    .themeLayer li:nth-child(2) .bgspan{
        background-position: -30px -150px;
    }
    .themeLayer li:nth-child(3) .bgspan{
        background-position: -30px -90px;
    }
    .themeLayer li:nth-child(4) .bgspan{
        background-position: -30px -180px;
    }
    .themeLayer li:nth-child(5) .bgspan{
        background-position: -30px -300px;
    }
    .themeLayer li:nth-child(6) .bgspan{
        background-position: -30px -330px;
    }
    .themeLayer li:nth-child(7) .bgspan{
        background-position: -30px 0px;
    }
    .themeLayer li:nth-child(8) .bgspan{
        background-position: -30px -150px;
    }
    .themeLayer li:nth-child(9) .bgspan{
        background-position: -30px -120px;
    }
    .themeLayer li:nth-child(10) .bgspan{
        background-position: -30px -60px;
    }
    .themeLayer li:nth-child(11) .bgspan{
        background-position: -30px -240px;
    }
    .themeLayer li:nth-child(12) .bgspan{
        background-position: -30px -270px;
    }
    .themeLayer li:nth-child(13) .bgspan{
        background-position: -30px -210px;
    }
    .themeLayer li:nth-child(14) .bgspan{
        background-position: -30px -390px;
    }

    .mapTools {
        position: absolute;
        top: 80px;
        right: 10px;
        z-index: 999;
        width: auto;
        display: flex;
        border-radius: 3px;
        background-color: rgba(0, 0, 0, 0.7)
    }
    .mapTools ul {
        list-style: none;
        display: flex;
        margin: 0;
        padding: 5px;
    }
    .mapTools ul li {
        height: 35px;
        width: auto;
        line-height: 35px;
        color: #fff;
        padding: 0 15px;
        font-size: 14px;

    }
    .mapTools ul li img{
        vertical-align: middle;
        height: 20px;
        margin-right: 8px;
    }
    .mapTools ul li span {
        vertical-align: middle;
    }
    .openBox {
        width: 14px;
        height: 7px !important;
        margin-left: 5px;
    }

    .mapboxs {
        position: absolute;
        top: 126px;
        right: 100px;
        z-index: 999;
        width: 115px;
        display: flex;
        border-radius: 3px;
        background-color: rgba(0, 0, 0, 0.7)
    }
    .mapboxs ul {
        list-style: none;
        margin: 0;
        padding: 5px;
    }
    .mapboxs ul li {
        height: 30px;
        width: auto;
        line-height: 30px;
        color: #fff;
        font-size: 13px;
        text-align: left;
        padding-left: 10px;

    }
    .mapboxs ul li img{
        vertical-align: middle;
        height: 15px;
        margin-right: 8px;
    }
    .mapboxs ul li span {
        vertical-align: middle;
    }
</style>
<style>
    .popuDiv {
        height: 28px;
        line-height: 28px;
        min-width: 200px;
        width:auto;
        padding: 0 5px;
    }
    .el-checkbox__inner {
        background-color: transparent;
    }
</style>