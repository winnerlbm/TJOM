<!--<script src="../../../public/libs/heatmap/leaflet-heatmap.js"></script>
<script src="../../../public/libs/turf/truf.min.js"></script>-->
<template>
    <div style="flex: 1">
        <div id="map">
            <!--数据统计面板-->
            <info-container v-show="false" class="map-info-cls"/>
            <!--图层管理面板-->
            <layer-container ref="layerContains" class="layerClass" v-show="layersShow"  @click.stop="doSomething($event)" ></layer-container>

            <marker-container ref="markRef" class="layerClass" v-show="markerShow"  @click.stop="doSomething($event)" ></marker-container>
            <!--搜索面板-->
            <search-container class="searchClass"  @click.stop="doSomething($event)" ></search-container>
            <!--工具条面板-->
            <div class="mapTools"  @click.stop="doSomething($event)" >
                <ul>
                    <li @click="setWindy" :class="{'spanSel':windySelect == true}">
                        <img :src="toolImg.windyImg" alt="">
                        <span>风场</span>
                    </li>
                    <li @click="setRoadMap"  :class="{'spanSel':roadSelect == true}" style="border-right: 1px solid rgba(12, 60, 119, 0.64);">
                        <img :src="toolImg.roadImg" alt="">
                        <span>路况</span>
                    </li>
                    <li @click="setManager"  :class="{'spanSel':managerSelect == true}" style="border-right: 1px solid rgba(12, 60, 119, 0.64);">
                        <img :src="toolImg.managerImg" alt="">
                        <span>管理清单</span>
                    </li>
                    <li @click="setMarkMap"  :class="{'spanSel':markerShow == true}" style="border-right: 1px solid rgba(12, 60, 119, 0.64);">
                        <img :src="toolImg.markImg" style="margin-right: 5px;" alt="">
                        <span>标记</span>
                    </li>
                    <li @click="setMapBox"  :class="{'spanSel':mapboxShow == true}"  style="padding-right: 5px;border-right: 1px solid rgba(12, 60, 119, 0.64);">
                        <img :src="toolImg.mapboxImg" style="width: 15px;height: 15px;" alt="">
                        <span>工具箱</span>
                        <img class="openBox" :src="toolImg.updowImg" alt="">
                    </li>
                    <li @click="setLayers"  :class="{'spanSel':layersShow == true}">
                        <img :src="toolImg.layerImg" alt=""  style="margin-right: 5px;">
                        <span>图层</span>
                    </li>
                    <li @click="clearMap" >
                        <img :src="toolImg.clearImg" alt=""  style="margin-right: 5px;">
                        <span>清除</span>
                    </li>
                </ul>
            </div>
            <div class="mapboxs" @click.stop="doSomething($event)"  v-show="mapboxShow == true">
                <ul>
                    <li  v-for="(item,key) in toolList" :key="key" @click="queryMap(item,key)"  @click.stop="doSomething($event)" >
                        <img :src="item.image" alt="">
                        <span>{{item.name}}</span>
                    </li>
                </ul>
            </div>

            <div class="managerbox" @click.stop="doSomething($event)" v-show="managerShow == true">
                <ul>
                    <li  v-for="(item,key) in managerList"  :class="{'active':menuSel == item.id}" :key="key" @click="queryManagerFac(item,key)"  @click.stop="doSomething($event)" >
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
            <div class="baseMap" @click.stop="doSomething($event)"  v-show="showClass == 'baseMap'">
                <ul>
                    <li v-for="(item,key) in mapList" :key="key" @click="changeMap(item,key)" :class="{'active':selecteMapIndex == key}">
                        <img :src="item.image" alt="">
                        <span>{{item.name}}</span>
                    </li>
                </ul>
            </div>

            <div class="themeLayer" @click.stop="doSomething($event)" v-show="showClass == 'themeMap'">
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
        <hour-line ref="hourline" v-show="hourShow" @onTimeChange="onTimeChange"></hour-line>
        <time-container ref="timeContainer"></time-container>
        <data-container ref="dataContainer"></data-container>

        <!--缓冲区设置-->
        <div class="bufferWindow" v-show="bufferShow">
            <div class="bufftitle">缓冲区设置</div>
            <div class="bufferDiv">
                <span>缓冲距离：</span>
                <input type="text" v-model="bufferVal"><span>米</span>
            </div>
            <div class="buffertools">
                <button @click="bufferCalc">确定</button>
                <button @click="hideBuffer">取消</button>
            </div>
        </div>

    </div>
</template>

<script>
    import L from "leaflet";
    import {buffer,point,booleanContains} from "_@turf_turf@5.1.6@@turf/turf/turf.js"
    import appCfg from "@config/AppCfg"
    import {getWindyData, getWfsFeature} from '@api/api'
    import InfoContainer from "./InfoContainer";
    import layerContainer from "./layerContainer";
    import SearchContainer from "./SearchContainer";
    import HourLine from "../util/HourLine";
    import MarkerContainer from "./MarkerContainer";
    import TimeContainer from "./TimeContainer";
    import DataContainer from "./DataContainer";
    export default {
        name: "MapContainer",
        components: {InfoContainer,layerContainer,SearchContainer,HourLine,MarkerContainer,TimeContainer,DataContainer},
        data() {
            return {
                highLayer: null,
                featureProps: null,
                windyLayer:null,
                selecteIndex:0,
                selecteMapIndex:0,
                windySelect:false,
                roadSelect:false,
                markSelect:false,
                markerShow:false,
                managerSelect:false,
                managerShow:false,
                managerList:[],
                showClass:"baseMap",
                hourShow:true,
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
                    /*{id:"tdtLayer",name:"地形图",type:"tdtter",image:require("../../assets/image/map/mapter.jpg")}*/
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
                   /* {name:"缓冲区",type:"queryBuffer",image:require("../../assets/image/menu/queryBuffer.png")},
                    {name:"清除",type:"mulPoint",image:require("../../assets/image/menu/clearMap.png")}*/
                ],
                toolImg:{
                    windyImg:require("../../assets/image/menu/wind.png"),
                    roadImg:require("../../assets/image/menu/road.png"),
                    mapboxImg:require("../../assets/image/menu/toolbox.png"),
                    layerImg:require("../../assets/image/menu/layers.png"),
                    updowImg:require("../../assets/image/menu/up.png"),
                    markImg:require("../../assets/image/menu/marks.png"),
                    managerImg:require("../../assets/image/menu/manager.png"),
                    clearImg:require("../../assets/image/clear.png")
                },
                layerTemps:[],
                drawControl:null,
                menuSel:"",
                allFactory:[],
                bufferPolygon:null,
                drawLayer:null,
                drawGroup:null,
                bufferQuery:false,
                bufferVal:1000,
                bufferShow:false,
                deleteTool:null,
                editTool:null
            };
        },
        //需要页面加载完执行的方法,可以写在$nextTick中
        mounted() {
            let _self = this;
            window.queryContains = function(){
                _self.polygonContains();
            };
            this.$nextTick(() => {
                this.queryManager();
                this.$mapUtil.initMap('map');
               // this.$refs.markRef.initDraw();
                this.$refs.dataContainer.initDraw();
                this.hourShow = false;
                this.$mapUtil.wmsLayer('NPWS:hxtjmap').addTo(this.$mapUtil.lMap);
                this.getAllFactory();

              //  this.queryFeatureByClick('NPWS:hxtjmap', 2000, 'the_geom', this.$mapUtil.lMap)
               // this.$mapUtil.heatmapLayer(this.$mapUtil.lMap)
               // this.$mapUtil.removeLayer("layeri",this.$mapUtil.lMap)
                this.$mapUtil.lMap.on('click', (evt) => {
                    if (evt.latlng) {
                        if(this.$mapUtil.lMap.hasLayer(this.windyLayer)){
                            let lat = evt.latlng.lat, lng = evt.latlng.lng;
                            let details = this.getWindyDetail([lng,lat]);
                            let winHtml = this.createWinyHtml(details);
                            L.popup()
                                .setLatLng([lat,lng])
                                .setContent(winHtml)
                                .openOn(this.$mapUtil.lMap);

                        }else{
                            this.queryFeatureByClick('NPWS:hxtjmap', 2000, 'the_geom', this.$mapUtil.lMap,evt)
                        }
                    }
                });
                this.initMapDraws();
            });
        },
        methods: {
            initMapDraws(){
                this.drawGroup = new L.FeatureGroup();
                this.$mapUtil.lMap.addLayer(this.drawGroup);
                let MyCustomMarker = L.Icon.extend({
                    options: {
                        shadowUrl: null,
                        iconAnchor: new L.Point(12, 12),
                        iconSize: new L.Point(24, 24),
                        iconUrl: require("../../assets/image/marker/point_ered.png")
                    }
                });
                this.drawControl = new L.Control.Draw({
                    draw:{
                        marker:{icon:MyCustomMarker}
                    },
                    edit: {
                        featureGroup: this.drawGroup
                    }
                });
                let _self = this;
                this.$mapUtil.lMap.on(L.Draw.Event.CREATED, function (event) {
                    console.log("11111");
                    let layer = event.layer;
                    if(_self.bufferQuery){
                        let pointIcon = L.icon({
                            iconUrl: require("../../assets/image/marker/point_ered.png"),
                            iconSize: [20, 20],
                            iconAnchor: [10, 20],
                            popupAnchor: [0, 0],
                            shadowSize: [68, 95],
                            shadowAnchor: [22, 94]
                        });
                        if(event.layerType == "marker"){
                            layer.setIcon(pointIcon);
                        }
                        _self.drawLayer = layer;
                        _self.bufferShow = true;
                        _self.drawGroup.addLayer(layer);
                    }else{
                        if(event.layerType == "marker"){
                            layer.setIcon(_self.$refs.markRef.pointIcon);
                        }else{
                            layer.setStyle(_self.$refs.markRef.lineStyle);
                        }
                        _self.drawGroup.addLayer(layer);
                    }
                });
            },
            drawTool(item){
                if(item.type == "delete"){
                    if(!this.deleteTool) {
                        this.deleteTool = new L.EditToolbar.Delete(this.$mapUtil.lMap, {featureGroup: this.drawGroup});
                    }
                    this.deleteTool.enable();
                }else if(item.type == "clear"){
                    this.drawGroup.clearLayers();
                }else if(item.type == "edit"){
                    if(!this.editTool){
                        this.editTool = new L.EditToolbar.Edit(this.$mapUtil.lMap,{featureGroup: this.drawGroup});
                    }
                    this.editTool.enable();
                }else {
                    if(this.editTool){
                        this.editTool.disable();
                    }
                    if(this.deleteTool){
                        this.deleteTool.disable();
                    }
                }
            },
            /*加载风场数据*/
            getWindyData(date) {
                getWindyData(date).then((data) => {
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
                            this.featureProps = data.features["0"].properties;
                            this.highLayer = L.geoJSON(data, {
                                style: function (feature) {
                                    return {color: appCfg.common.hColor}
                                }
                            });
                            this.highLayer.addTo(map);
                            this.bufferPolygon =  data.features[0];
                            this.bufferPolygon.geometry.type = "Polygon";
                            let winHtml = ['<div class="popuDiv"><span>区域名称：</span>'+this.featureProps.MAP_NAME+'</div>'];
                            winHtml.push('<div class="poputools">');
                            winHtml.push('<button onclick="queryContains()">区域查询</button>');
                            winHtml.push('</div>');
                            L.popup()
                                .setLatLng([lat,lng])
                                .setContent(winHtml.join(''))
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
                    this.hourShow = false;
                    this.$refs.hourline.stopPlay();
                }else{
                    this.getWindyData();
                    this.hourShow = true;
                   // this.$refs.hourline.calcWidth();
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
            setManager(){
                this.managerSelect = !this.managerSelect;
                if(!this.managerSelect){
                    this.toolImg.managerImg = require("../../assets/image/menu/manager.png");
                    this.managerShow = false;
                }else{
                    this.toolImg.managerImg = require("../../assets/image/menu/managerSel.png");
                    this.managerShow = true;
                }
            },
            setMarkMap(){
                this.markerShow = !this.markerShow;
                this.bufferQuery = false;
                if(!this.markerShow){
                    this.toolImg.markImg = require("../../assets/image/menu/marks.png");
                    this.markerShow = false;
                }else{
                    this.toolImg.markImg = require("../../assets/image/menu/markSel.png");
                    this.markerShow = true;

                    this.mapboxShow = false;
                    this.toolImg.mapboxImg = require("../../assets/image/menu/toolbox.png");

                    this.layersShow = false;
                    this.toolImg.updowImg = require("../../assets/image/menu/up.png");
                    this.toolImg.layerImg = require("../../assets/image/menu/layers.png");

                }
            },
            setMapBox(){
                this.mapboxShow = !this.mapboxShow;
                this.bufferQuery = true;
                if(!this.mapboxShow){
                    this.toolImg.mapboxImg = require("../../assets/image/menu/toolbox.png");
                    this.toolImg.updowImg = require("../../assets/image/menu/up.png");
                }else{
                    this.layersShow = false;
                    this.toolImg.mapboxImg = require("../../assets/image/menu/mapboxSel.png");
                    this.toolImg.updowImg = require("../../assets/image/menu/down.png");
                    this.toolImg.layerImg = require("../../assets/image/menu/layers.png");
                    this.toolImg.markImg = require("../../assets/image/menu/marks.png");
                    this.markerShow = false;
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
                    this.toolImg.markImg = require("../../assets/image/menu/marks.png");
                    this.markerShow = false;
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
                this.clearMap();
                if(item.type == "queryPoint"){
                    this.bufferQuery = true;
                    this.enableDrawOption("marker");
                }else if(item.type == "queryLine"){
                    this.bufferQuery = true;
                    this.enableDrawOption("line");
                }else if(item.type == "queryPolygon"){
                    this.bufferQuery = true;
                    this.enableDrawOption("polygon");
                }else if(item.type == "queryBuffer"){

                }else {
                    this.bufferQuery = false;
                    this.clearMap();
                }
            },
            enableDrawOption(type){
                if(type == "marker"){
                    new L.Draw.Marker(this.$mapUtil.lMap ,this.drawControl.options.marker).enable();
                }else if(type == "line"){
                    new L.Draw.Polyline(this.$mapUtil.lMap,this.drawControl.options.polyline).enable();
                }else if(type == "polygon"){
                    new L.Draw.Polygon(this.$mapUtil.lMap,this.drawControl.options.polygon).enable();
                }else if(type == "circle"){
                    new L.Draw.Circle(this.$mapUtil.lMap,this.drawControl.options.circle).enable();
                }else if(type == "rectangle"){
                    new L.Draw.Rectangle(this.$mapUtil.lMap,this.drawControl.options.rectangle).enable();
                }
            },
            clearMap(){
                this.$mapUtil.removeTemLayer("factory");
                this.removeDataList("factory");
                this.drawGroup.clearLayers();
            },
            queryManager(){
                let body = {
                    "conditions":[

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
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f73b31b5e0173bd364a1f4f4f?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    let list = res.data.data.list;
                    this.managerList = list;
                })
            },
            queryManagerFac(item,key){
                let layerId = "menulist";
                if(this.menuSel == item.id){
                    this.menuSel = "";
                    this.$mapUtil.removeTemLayer(layerId);
                    this.removeDataList(layerId);
                }else{
                    this.menuSel = item.id;

                    let body = {
                        "conditions":[
                            {
                                "operator":"AND",
                                "match":"equal",
                                "field":"templateId",
                                "value":item.id
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
                        url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f73b31b5e0173bd38cf7f4f5a?userKey="+appCfg.map.userKey,
                        method: "post",
                        data: body,
                        header:{'Content-type': 'application/json'}
                    }).then(res => {
                        let wzIcon = require("../../assets/image/map/map_fac.png");
                        let list = res.data.data;
                        let facLayer = L.markerClusterGroup();
                        for(let model of list) {
                            model.longitude =  this.DegreeConvertBack(model.lngDegree,model.lngMinute,model.lngSecond);
                            model.latitude = this.DegreeConvertBack(model.latDegree,model.latMinute,model.latSecond);
                            let marker = this.$mapUtil.createPointMarker(model,wzIcon);
                            marker.id = model.dataId;
                            if(marker){
                                let html = this.createHtml(model);
                                marker.bindPopup(html);
                                facLayer.addLayer(marker);
                            }
                        }
                        this.$mapUtil.lMap.addLayer(facLayer);
                        this.$mapUtil.addTemLayer(layerId,facLayer);
                        this.setDataList(layerId,list);
                    })
                }
            },
            getAllFactory(){
                let body = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "field":"",
                            "match":"contain",
                            "value":"",
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
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f7371258f01737666a9c811af?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    this.allFactory = res.data.data.list;
                })
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
            onTimeChange(val){
                let day = val.day;
                let hour = val.hour;
                let yhour = hour < 10 ? '0' + hour : '' + hour;
                let ymd = day.replace(/-/g,"")+yhour;
                if(this.$mapUtil.lMap.hasLayer(this.windyLayer)){
                    this.$mapUtil.lMap.removeLayer(this.windyLayer);
                }
                this.getWindyData(ymd);
            },
            showTimeData(param){
                console.log(param);
                this.$refs.timeContainer.searchData(param.id,param.type);
            },
            hideTimeData(){
                this.$refs.timeContainer.showResult = false;
            },
            setDataList(type,list){
                this.$refs.dataContainer.setDataList(type,list);
                this.$refs.timeContainer.showResult = false;
            },
            setDataShow(){
                this.$refs.dataContainer.showData();
            },
            removeDataList(type){
                this.$refs.dataContainer.removeDataList(type);
            },
            setDetailData(obj,type){
                this.$refs.timeContainer.setShowObj(obj,type);
                this.$refs.dataContainer.hideData();
            },
            queryHjxfData(type,stime,etime){
                this.$refs.layerContains.getHjxfData(type,stime,etime);
            },
            queryXzcfData(type,stime,etime){
                this.$refs.layerContains.getXzcfData(type,stime,etime);
            },
            queryFspkData(type,stime,etime){
                this.$refs.layerContains.getWaterData(type,stime,etime);
            },
            queryFqpkData(type,stime,etime){
                this.$refs.layerContains.getAirData(type,stime,etime);
            },
            DegreeConvertBack(deg,min,sec){ ///<summary>度分秒转换成为度</summary>
                return Math.abs(deg) + (Math.abs(min)/60 + Math.abs(sec)/3600);
            },
            createHtml(model){
                let html = [];
                html.push('<div class="popuDiv"><span>企业名称：</span>'+model.companyName+'</div>');
                html.push('<div class="popuDiv"><span>企业地址：</span>'+model.operationAddress+'</div>');
                html.push('<div class="popuDiv"><span>企业类型：</span>'+model.industryType+'</div>');
                html.push('<div class="popuDiv"><span>排污许可证号：</span>'+model.permitLicence+'</div>');
                html.push('<div class="poputools">');
                html.push('<button onclick="getMineTime('+JSON.stringify(model).replace(/"/g, '&quot;')+',\'factory\')">详情</button>');
                html.push('</div>');
                return html.join('');
            },
            polygonContains(){//计算点与面的相关关联
                console.log(this.bufferPolygon);
                let conList = [];
                let layerId = "factory";
                let wzIcon = require("../../assets/image/map/map_fac.png");
                let facLayer = L.markerClusterGroup();
                for(let i=0;i<this.allFactory.length;i++){
                    let model = this.allFactory[i];
                    model.longitude =  this.DegreeConvertBack(model.lngDegree,model.lngMinute,model.lngSecond);
                    model.latitude = this.DegreeConvertBack(model.latDegree,model.latMinute,model.latSecond);
                    let po = point([model.longitude,model.latitude]);
                    if(booleanContains(this.bufferPolygon,po)){
                        let marker = this.$mapUtil.createPointMarker(model,wzIcon);
                        marker.id = model.dataId;
                        if(marker){
                            let html = this.createHtml(model);
                            marker.bindPopup(html);
                            facLayer.addLayer(marker);
                        }
                        conList.push(model);
                    }
                }
                this.$mapUtil.lMap.addLayer(facLayer);
                this.$mapUtil.addTemLayer(layerId,facLayer);
                this.setDataList(layerId,conList);
            },
            bufferCalc(){
                let buffMeter = 0;
                if(this.bufferVal == ""){
                    this.$message("缓冲距离设置异常！");
                    return;
                }else if(this.bufferVal=="0"){
                    buffMeter = 0.1;
                }else{
                    buffMeter = this.bufferVal;
                }
                const buffered = buffer(this.drawLayer.toGeoJSON(), buffMeter, {
                    units: 'meters'
                });
                this.bufferPolygon = buffered;
                L.geoJSON(buffered, {
                    style: function(feature) {
                        return {
                            color: 'red'
                        };
                    }
                }).addTo(this.drawGroup);
                this.polygonContains();
                this.bufferShow = false;
            },
            hideBuffer(){
                this.bufferShow = false;
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
        width: 310px;
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
        right: 180px;
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

    .managerbox {
        position: absolute;
        top: 126px;
        right: 375px;
        z-index: 999;
        width: 115px;
        display: flex;
        border-radius: 3px;
        background-color: rgba(0, 0, 0, 0.7)
    }
    .managerbox ul {
        list-style: none;
        margin: 0;
        padding: 5px;
        width: 100%;
    }
    .managerbox ul li {
        height: 30px;
        width: auto;
        line-height: 30px;
        color: #fff;
        font-size: 13px;
        text-align: center;
    }
    .managerbox ul li:hover,.managerbox ul li.active {
        color: #3071e9;
    }
    .managerbox ul li img{
        vertical-align: middle;
        height: 15px;
        margin-right: 8px;
    }
    .managerbox ul li span {
        vertical-align: middle;
    }

    .bufferWindow {
        position: absolute;
        top: 200px;
        width: 260px;
        height: 140px;
        color: #fff;
        z-index: 9999;
        left: calc(50% - 100px);
        background-color: #000;
        border: 1px solid #112c5a;
        border-radius: 3px;
    }
    .bufftitle {
        height: 28px;
        line-height: 28px;
        padding: 0 15px;
        text-align: left;
        background-color: #112c5a;
    }
    .bufferDiv {
        padding: 10px 15px;
        text-align: left;
        margin: 10px 0;
    }
    .bufferDiv input {
        width: 140px;
        margin: 0 5px;
        background: rgba(17, 44, 90, 0.33);
        border: 1px solid #0c87c6;
        color: #fff;
        height: 20px;
        line-height: 20px;
        border-radius: 3px;
    }
    .buffertools button {
        border: none;
        width: 70px;
        margin: 5px;
        background-color: #3190ff;
        color: #fff;
        padding: 3px;
        font-size: 13px;
        cursor: pointer;
    }
</style>
<style>
    .popuDiv {
        height: auto;
        line-height: 28px;
        min-width: 250px;
        width:auto;
        padding: 0 5px;
        word-break: break-all;
        word-wrap: break-word;
    }
    .el-checkbox__inner {
        background-color: transparent;
    }
    .poputools {
        text-align: right;
        border-top: 1px solid #383838;
        padding-top: 7px;
    }
    .poputools button {
        border: none;
        padding: 3px 5px;
        border-radius: 3px;
        background-color: #409eff;
        color: #fff;
        cursor: pointer;
        margin-left: 5px;
        font-size: 12px;
    }
    .leaflet-popup-content-wrapper, .leaflet-popup-tip {
        background: rgba(0, 0, 0, 0.59);
        color: #fff;
        box-shadow: 0 3px 14px rgba(0,0,0,0.4);
        border-radius: 3px;
    }
    ::-webkit-scrollbar {
        width: 6px;
        height: 6px
    }
    ::-webkit-scrollbar-button {
        height: 0;
        width: 0
    }
    ::-webkit-scrollbar-track {
        background-color: #0F274B;
        border-radius: 2px;
    }
    ::-webkit-scrollbar-thumb {
        background: #3E6CBC;
        border-radius: 2px;
    }
    ::-webkit-input-placeholder {
        color: #aaa;
        font-size: 14px
    }
    ::-moz-placeholder {
        color: #aaa;
        font-size: 14px
    }
    :-ms-input-placeholder {
        color: #aaa;
        font-size: 14px
    }
    * {
        scrollbar-base-color: #ccc;
        scrollbar-3dlight-color: #ccc;
        scrollbar-highlight-color: #ccc;
        scrollbar-track-color: #f1f1f1;
        scrollbar-arrow-color: #000;
        scrollbar-shadow-color: #ccc;
        scrollbar-dark-shadow-color: #ccc
    }
</style>
