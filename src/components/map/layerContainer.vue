<template>
    <div class="layerDiv" v-loading="loading"  element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="etitle" v-show="true">
            数据图层
        </div>
        <div class="layerTitle">
            <span class="laRec"></span>
            企业数据
        </div>
        <div class="layerList">
            <ul>
                <li v-for="(item,key) in factoryList" :key="key" >
                    <!--el-checkbox style="vertical-align: middle" v-model="item.checked"></el-checkbox-->
                    <img :src="item.image" alt="">
                    <span>{{item.name}}</span>
                    <el-switch  v-model="item.checked" active-color="#20AFB0"  @change="setFactory($event,item)" inactive-color="#356570" :width="30">
                    </el-switch>
                </li>
            </ul>
        </div>
        <!--<div class="layerTitle">
            监测站点
        </div>
        <div class="layerList">
            <ul>
                <li v-for="(item,key) in moniList" :key="key" >
                    <el-checkbox style="vertical-align: middle" v-model="item.checked" @change="setFactory($event,item)"></el-checkbox>
                    <img :src="item.image" alt="">
                    <span>{{item.name}}</span>
                    <el-switch  v-model="item.checked" active-color="#20AFB0"  @change="setFactory($event,item)" inactive-color="#356570" width="30">
                    </el-switch>
                </li>
            </ul>
        </div>-->
        <div class="layerTitle">
            <span class="laRec"></span>
            空气质量数据监测站
        </div>
        <div class="layerList">
            <ul>
                <li v-for="(item,key) in airList" :key="key" >
                    <!--el-checkbox style="vertical-align: middle" v-model="item.checked" @change="setFactory($event,item)"></el-checkbox-->
                    <img :src="item.image" alt="">
                    <span>{{item.name}}</span>
                    <el-switch  v-model="item.checked" active-color="#20AFB0"  @change="setFactory($event,item)" inactive-color="#356570" :width="30">
                    </el-switch>
                </li>
            </ul>
        </div>
        <div class="layerTitle">
            <span class="laRec"></span>
            热力图
        </div>
        <div class="layerList">
            <ul>
                <li v-for="(item,key) in statisList" :key="key" >
                    <!--el-checkbox style="vertical-align: middle" v-model="item.checked" @change="setHeatMap($event,item)"></el-checkbox-->
                    <img :src="item.image" alt="">
                    <span>{{item.name}}</span>
                    <el-switch  v-model="item.checked" active-color="#20AFB0"  @change="setHeatMap($event,item)" inactive-color="#356570" :width="30">
                    </el-switch>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import appCfg from "@config/AppCfg"
    export default {
        name: "layerContainer",
        data(){
            return {
                factoryList:[
                    {type:"factory",name:"所有企业",checked:false,image:require("../../assets/image/icon/factory.png")},
                    {type:"wryFac",name:"在线监控企业",checked:false,image:require("../../assets/image/icon/gkxx.png")},
                    {type:"mine",name:"工况监控企业",checked:false,image:require("../../assets/image/icon/wryfac.png")},
                   /* {type:"wg",name:"废气排污口",checked:false,image:require("../../assets/image/icon/wry.png")},
                    {type:"ww",name:"废水排污口",checked:false,image:require("../../assets/image/icon/wry.png")}*/
                ],
                moniList:[
                    {type:"sttp_normal",name:"常规监测站",checked:false,image:require("../../assets/image/icon/cgz.png")},
                   // {type:"sttp_yd",name:"移动监测站",checked:false,image:require("../../assets/image/icon/ydz.png")},
                    {type:"sttp_wz",name:"微站",checked:false,image:require("../../assets/image/icon/wz.png")}
                ],
                airList:[
                    {type:"sttp_all",name:"空气质量监测站",checked:false,image:require("../../assets/image/icon/sttp_air.png")},
                    {type:"sttp_gk",name:"国控站",checked:false,image:require("../../assets/image/icon/sttp_gk.png")},
                    /*{type:"sttp_sk",name:"省(区)控站",checked:false,image:require("../../assets/image/icon/skz.png")},*/
                    {type:"sttp_normal",name:"常规监测站",checked:false,image:require("../../assets/image/icon/normal.png")},
                    // {type:"sttp_yd",name:"移动监测站",checked:false,image:require("../../assets/image/icon/ydz.png")},
                    {type:"sttp_wz",name:"微型站",checked:false,image:require("../../assets/image/icon/wz.png")}
                ],
                statisList:[
                    {type:"hjxf",name:"环境信访热力图",checked:false,image:require("../../assets/image/icon/rlt_1.png")},
                    {type:"xzcf",name:"行政处罚热力图",checked:false,image:require("../../assets/image/icon/rlt_2.png")},
                    {type:"fqpk",name:"废气排口超标热力图",checked:false,image:require("../../assets/image/icon/heat_air.png")},
                    {type:"fspk",name:"废水排口超标热力图",checked:false,image:require("../../assets/image/icon/heat_water.png")}
                ],
                qy:require("@/assets/image/fa/fa-qy.png"),
                addr:require("@/assets/image/fa/fa-addr.png"),
                qtype:require("@/assets/image/fa/fa-type.png"),
                lic:require("@/assets/image/fa/fa-lic.png"),
                sttp:require("@/assets/image/fa/fa-sttp.png"),
                par:require("@/assets/image/fa/fa-par.png"),
                loading:false
            }
        },
        props:{
            map : Object
        },
        mounted(){
            console.log(appCfg.map.gisApiUrl);
            let _self = this;
            window.getMineTime = function(model,type){
                _self.$parent.setDetailData(model,type);
            };
            window.validNullStr = function(str){
                if(str!=null&&str!="null"){
                    return str;
                }
                return "-";
            }
        },
        methods: {
            initSTime(){
                const end = new Date();
                return this.$appUtil.formatDate("yyyy-MM-dd HH:ff:ss",end);
            },
            initETime(day){
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * day);
                return this.$appUtil.formatDate("yyyy-MM-dd HH:ff:ss",start);
            },
            setAllChecked(checked){
                for(let data of this.factoryList) {
                    data.checked = checked;
                }
                for(let data of this.airList) {
                    data.checked = checked;
                }
            },
            setFactory(val,item){
                if(!this.valideDate()){
                    this.$message.error("软件许可授权已过期！");
                    return;
                }
                if(val){
                    this.$parent.resetTime();//从此处开启图层查询需重置其它位置的时间
                    if(item.type == "factory"){
                        this.getFactory(item.type);
                    }else if(item.type == "sttp_yd"){
                        this.getSttp(item.type);
                    }else if(item.type == "wry"){
                        this.getWry(item.type);
                    }else if(item.type == "wg"){
                        this.getWry(item.type);
                    }else if(item.type == "sttp_normal"){
                       // this.getNormalSttp(item.type);
                        this.getSttpData(item.type,"1","AQI");
                    }else if(item.type == "sttp_wz"){
                       // this.getWzSttp(item.type);
                        this.getSttpData(item.type,"2","AQI");
                    }else if(item.type == "mine"){
                        this.getMineData(item.type);
                    }else if(item.type == "sttp_all"){
                        this.getSttpAll(item.type);
                    }else if(item.type == "sttp_gk"){
                        //this.getCsttp(item.type,1);
                        this.getCountryData(item.type,"vaqi");
                    }else if(item.type == "sttp_sk"){
                        this.getCsttp(item.type,2);
                    }else if(item.type == "ww"){
                        this.getPwk(item.type);
                    }else if(item.type == "wryFac"){
                        this.getWryFac(item.type);
                    }
                }else{
                    this.$mapUtil.removeTemLayer(item.type);
                    this.$parent.removeDataList(item.type);
                }
            },
            setHeatMap(val,item){
                if(val){
                    this.$parent.resetTime();//从此处开启图层查询需重置其它位置的时间
                    let stime = this.initETime(30);
                    let etime = this.initSTime();
                    if(item.type == "xzcf"){
                        this.getXzcfData(item.type,stime,etime);
                    }else if(item.type == "hjxf"){
                        this.getHjxfData(item.type,stime,etime);
                    }else if(item.type == "fspk"){
                        this.getWaterData(item.type,stime,etime);
                    }else if(item.type == "fqpk"){
                        this.getAirData(item.type,stime,etime);
                    }
                }else{
                    this.$mapUtil.removeTemLayer(item.type);
                    this.$parent.removeDataList(item.type);
                }
            },
            getFactory(layerId){
                let _self = this;
                setTimeout(function () {//延时0.1秒 解决卡顿问题
                    _self.loading = true;
                    let faclist =  _self.$parent.allFactory;
                    if(faclist.length>0){
                        _self.drawFactoryMap(layerId,faclist);
                        _self.loading = false;
                    }else{
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
                        _self.$axios({
                            url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f7371258f01737666a9c811af?userKey="+appCfg.map.userKey,
                            method: "post",
                            data: body,
                            header:{'Content-type': 'application/json'}
                        }).then(res => {
                            _self.loading = false;
                            let list = res.data.data.list;
                            _self.drawFactoryMap(layerId,list);
                        })
                    }
                }, 100);
            },
            getWryFac(layerId){
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
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f746c8ba001746d602ebd013d?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    this.loading = false;
                    let list = res.data.data.list;
                    this.drawFactoryMap(layerId,list);
                })
            },
            drawFactoryMap(layerId,list){
                let wzIcon = null;
                if(layerId == "factory"){
                    wzIcon = require("../../assets/image/map/factory.png");
                }else {
                    wzIcon = require("../../assets/image/map/wryFac.png");
                }
                let _self = this;
                let facLayer = L.markerClusterGroup({maxClusterRadius:40});
                for(let model of list) {
                   // model.longitude =  this.DegreeConvertBack(model.lngDegree,model.lngMinute,model.lngSecond);
                   // model.latitude = this.DegreeConvertBack(model.latDegree,model.latMinute,model.latSecond);
                    let marker = this.$mapUtil.createPointMarker(model,wzIcon);
                    if(marker){
                        marker.model = model;
                        marker.on("click",function(e){
                            let cmodel = e.target.model;
                            _self.$parent.setDetailData(model,"factory");
                        });
                        marker.id = model.permitLicence;
                        let html = this.createHtml(model);
                        marker.bindPopup(html);
                        facLayer.addLayer(marker);
                    }
                }
                this.$mapUtil.lMap.addLayer(facLayer);
                this.$mapUtil.addTemLayer(layerId,facLayer);
                this.$parent.setDataList(layerId,list);
            },
            getMineData(layerId){
                let wzIcon = require("../../assets/image/map/mine.png");
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
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f73768e6501737affb75b00ad?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    let _self = this;
                    let list = res.data.data.list;
                    let facLayer = L.markerClusterGroup();
                    for(let model of list) {
                        let marker = this.$mapUtil.createPointMarker(model,wzIcon);
                        if(marker){
                            marker.id = model.permitLicence;
                            marker.model = model;
                            marker.on("click",function(e){
                                let cmodel = e.target.model;
                                _self.$parent.setDetailData(model,layerId);
                            });
                            let html = this.createMineHtml(model);
                            marker.bindPopup(html);
                            facLayer.addLayer(marker);
                        }
                    }
                    this.$mapUtil.lMap.addLayer(facLayer);
                    this.$mapUtil.addTemLayer(layerId,facLayer);
                    this.$parent.setDataList(layerId,list);
                })
            },
            getWry(layerId){
                let wzIcon = require("../../assets/image/map/wry_water.png");
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
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f73768e6501737696cc1e0021?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    let _self = this;
                    let list = res.data.data.list;
                    let markers = [];
                    for(let model of list) {
                        let marker = this.$mapUtil.createPointMarker(model,wzIcon);
                        if(marker){
                            marker.id = model.id;
                            marker.model = model;
                            marker.on("click",function(e){
                                let cmodel = e.target.model;
                                _self.$parent.setDetailData(model,layerId);
                            });

                            let html = this.createWryHtml(model);
                            marker.bindPopup(html);
                            markers.push(marker);
                        }
                    }
                    let facLayer = L.layerGroup(markers);
                    this.$mapUtil.lMap.addLayer(facLayer);
                    this.$mapUtil.addTemLayer(layerId,facLayer);
                    this.$parent.setDataList(layerId,list);
                })
            },
            getPwk(layerId){
                let wzIcon = require("../../assets/image/map/wry_air.png");
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
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f73768e6501737695b208001e?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    let list = res.data.data.list;
                    let _self = this;
                    let markers = [];
                    for(let model of list) {
                        let marker = this.$mapUtil.createPointMarker(model,wzIcon);
                        if(marker){
                            marker.id = model.id;
                            marker.model = model;
                            marker.on("click",function(e){
                                let cmodel = e.target.model;
                                _self.$parent.setDetailData(model,layerId);
                            });
                            let html = this.createPwkHtml(model);
                            marker.bindPopup(html);
                            markers.push(marker);
                        }
                    }
                    let facLayer = L.layerGroup(markers);
                    this.$mapUtil.lMap.addLayer(facLayer);
                    this.$mapUtil.addTemLayer(layerId,facLayer);
                    this.$parent.setDataList(layerId,list);
                })
            },
            getSttp(layerId){
                let wzIcon = require("../../assets/image/map/map_yd.png");
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
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f73768e65017376b69a16003c?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    let list = res.data.data.list;
                    let markers = [];
                    for(let model of list) {
                        let marker = this.$mapUtil.createPointMarkerByLgnt(model,wzIcon);
                        if(marker){
                            let html = this.createSttpHtml(model);
                            marker.bindPopup(html);
                            markers.push(marker);
                        }
                    }
                    let facLayer = L.layerGroup(markers);
                    this.$mapUtil.lMap.addLayer(facLayer);
                    this.$mapUtil.addTemLayer(layerId,facLayer);
                })
            },
            getCsttp(layerId,type){
                let wzIcon = null;
                if(layerId == "sttp_gk"){
                    wzIcon = require("../../assets/image/map/sttp_gk.png");
                }else{
                    wzIcon = require("../../assets/image/map/sttp_sk.png");
                }
                let body = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "field":"managerType",
                            "match":"equal",
                            "value":type,//国家级
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
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f73768e65017376b968ff0048?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    let list = res.data.data.list;
                    let _self = this;
                    if(list.length == 0){
                        this.$message.error("未查询到相关数据！");
                        return;
                    }
                    let markers = [];
                    for(let model of list) {
                        let marker = this.$mapUtil.createPointMarker(model,wzIcon);
                        if(marker){
                            marker.id = model.id;
                            marker.model = model;
                            marker.on("click",function(e){
                                let cmodel = e.target.model;
                                _self.$parent.setDetailData(model,"air");
                            });
                            let html = this.createGSttpHtml(model);
                            marker.bindPopup(html);
                            markers.push(marker);
                        }
                    }
                    let facLayer = L.layerGroup(markers);
                    this.$mapUtil.lMap.addLayer(facLayer);
                    this.$mapUtil.addTemLayer(layerId,facLayer);
                    this.$parent.setDataList(layerId,list);
                })
            },
            getNormalSttp(layerId){
                let wzIcon = require("../../assets/image/map/normal.png");
                let body = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "field":"stationType",
                            "match":"equal",
                            "value":"1",//普通站
                            "maxValue":"",
                            "minValue":""
                        }
                    ]
                };
                this.$axios({
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f73768e65017376b5f9b30039?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    let list = res.data.data.list;
                    let _self = this;
                    let markers = [];
                    for(let model of list) {
                        let marker = this.$mapUtil.createPointMarkerByLgnt(model,wzIcon);
                        if(marker){
                            marker.id = model.stationId;
                            marker.model = model;
                            marker.on("click",function(e){
                                let cmodel = e.target.model;
                                _self.$parent.setDetailData(model,"sttp");
                            });
                            let html = this.createSttpHtml(model);
                            marker.bindPopup(html);
                            markers.push(marker);
                        }
                    }
                    let facLayer = L.layerGroup(markers);
                    this.$mapUtil.lMap.addLayer(facLayer);
                    this.$mapUtil.addTemLayer(layerId,facLayer);
                    this.$parent.setDataList(layerId,list);
                })
            },
            getWzSttp(layerId){
                let wzIcon = require("../../assets/image/map/wz.png");
                let body = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "field":"stationType",
                            "match":"equal",
                            "value":"2",//微站
                            "maxValue":"",
                            "minValue":""
                        }
                    ]
                };
                this.$axios({
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f73768e65017376b5f9b30039?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    let list = res.data.data.list;
                    let _self = this;
                    let markers = [];
                    for(let model of list) {
                        let marker = this.$mapUtil.createPointMarkerByLgnt(model,wzIcon);
                        if(marker){
                            marker.id = model.stationId;
                            marker.model = model;
                            marker.on("click",function(e){
                                let cmodel = e.target.model;
                                _self.$parent.setDetailData(model,"sttp");
                            });
                            let html = this.createSttpHtml(model);
                            marker.bindPopup(html);
                            markers.push(marker);
                        }
                    }
                    let facLayer = L.layerGroup(markers);
                    this.$mapUtil.lMap.addLayer(facLayer);
                    this.$mapUtil.addTemLayer(layerId,facLayer);
                    this.$parent.setDataList(layerId,list);
                })
            },
            getSttpAll(layerId){
                let wzIcon = require("../../assets/image/map/sttp_air.png");
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
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f73768e65017376b968ff0048?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    let list = res.data.data.list;
                    let _self = this;
                    let markers = [];
                    for(let model of list) {
                        let cjs = _self.$mapUtil.wgs84togcj02(parseFloat(model.longitude),parseFloat(model.latitude));
                        model.longitude = cjs[0];
                        model.latitude = cjs[1];

                        let marker = this.$mapUtil.createPointMarker(model,wzIcon);
                        if(marker){
                            marker.id = model.id;
                            marker.model = model;
                            marker.on("click",function(e){
                                let cmodel = e.target.model;
                                _self.$parent.setDetailData(model,"air");
                            });
                            let html = this.createGSttpHtml(model);
                            marker.bindPopup(html);
                            markers.push(marker);
                        }
                    }
                    let facLayer = L.layerGroup(markers);
                    this.$mapUtil.lMap.addLayer(facLayer);
                    this.$mapUtil.addTemLayer(layerId,facLayer);
                    this.$parent.setDataList(layerId,list);
                })
            },

            getSttpData(layerId,type,item){
               // let wzIcon = require("../../assets/image/map/wry_water.png");

                let body = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "field":"stationType",
                            "match":"equal",
                            "value":type,//1常规站 2微站
                        },
                        {
                            "operator":"AND",
                            "field":"itemName",
                            "match":"equal",
                            "value":item
                        }
                    ],
                    "page":{
                        "pageable": false,
                        "currentPage": 1,
                        "pageSize": 10
                    },
                    "sort":{
                        "field": "value",
                        "order": "DESC"
                    }
                };
                this.$axios({
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f7473169a017476eb0bb51102?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    let _self = this;
                    let list = res.data.data.list;
                    let markers = [];
                    for(let model of list) {
                        let cjs = _self.$mapUtil.wgs84togcj02(parseFloat(model.lng),parseFloat(model.lat));
                        model.lng = cjs[0];
                        model.lat = cjs[1];
                        let marker = this.createPointByLevel(model);
                        if(marker){
                            marker.id = model.stationId;
                            marker.model = model;
                            marker.on("click",function(e){
                                let cmodel = e.target.model;
                                _self.$parent.setDetailData(model,"sttp");
                            });

                            let html = this.createSttpHtml(model);
                            marker.bindPopup(html);
                            markers.push(marker);
                        }
                    }
                    let facLayer = L.layerGroup(markers);
                    this.$mapUtil.lMap.addLayer(facLayer);
                    this.$mapUtil.addTemLayer(layerId,facLayer);
                    this.$parent.setDataList(layerId,list);
                })
            },
            getCountryData(layerId,item){
                let body = {
                    "conditions":[
                        
                    ],
                    "page":{
                        "pageable": false,
                        "currentPage": 1,
                        "pageSize": 10
                    },
                    "sort":{
                        "field": item,
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
                    let markers = [];
                    for(let model of list) {
                        let cjs = _self.$mapUtil.wgs84togcj02(parseFloat(model.longitude),parseFloat(model.latitude));
                        model.longitude = cjs[0];
                        model.latitude = cjs[1];
                        if(item=="vaqi"){
                            model.value = model[item];
                            model.level = this.getLevel(model.quality);
                        }else if(item=="v101"){
                            model.value = model[item];
                            model.level = this.getSo2Level(model.value);
                        }else if(item=="v121"){
                            model.value = model[item];
                            model.level = this.getPm25Level(model.value);
                        }else if(item=="v141"){
                            model.value = model[item];
                            model.level = this.getNo2Level(model.value);
                        }else if(item=="v107"){
                            model.value = model[item];
                            model.level = this.getPm10Level(model.value);
                        }else if(item=="v106"){
                            model.value = model[item];
                            model.level = this.getCOLevel(model.value);
                        }else if(item=="v108"){
                            model.value = model[item];
                            model.level = this.getO3Level(model.value);
                        }
                        let marker = this.createGkPointByLevel(model);
                        if(marker){
                            marker.id = model.id;
                            marker.model = model;
                            marker.on("click",function(e){
                                let cmodel = e.target.model;
                                _self.$parent.setDetailData(model,layerId);
                            });

                            let html = this.createGKttpHtml(model);
                            marker.bindPopup(html);
                            markers.push(marker);
                        }
                    }
                    let facLayer = L.layerGroup(markers);
                    this.$mapUtil.lMap.addLayer(facLayer);
                    this.$mapUtil.addTemLayer(layerId,facLayer);
                    this.$parent.setDataList(layerId,list);
                })
            },
            DegreeConvertBack(deg,min,sec){ ///<summary>度分秒转换成为度</summary>
                return Math.abs(deg) + (Math.abs(min)/60 + Math.abs(sec)/3600);
            },
            createHtml(model){
                let html = [];
                
                html.push('<div class="popuDiv"><img class="faicon" src="'+this.qy+'" />'+validNullStr(model.companyName)+'</div>');
                html.push('<div class="popuDiv"><img class="faicon" src="'+this.addr+'" />'+validNullStr(model.operationAddress)+'</div>');
                html.push('<div class="popuDiv"><img class="faicon" src="'+this.qtype+'" />'+validNullStr(model.industryTypeName)+'</div>');
                html.push('<div class="popuDiv"><img class="faicon" src="'+this.lic+'" />'+validNullStr(model.permitLicence)+'</div>');
               /* html.push('<div class="poputools">');
                html.push('<button onclick="getMineTime('+JSON.stringify(model).replace(/"/g, '&quot;')+',\'factory\')">详情</button>');
                html.push('</div>');*/
                return html.join('');
            },
            createMineHtml(model){
                let html = [];
                html.push('<div class="popuDiv"><img class="faicon" src="'+this.qy+'" />'+validNullStr(model.enterpriseName)+'</div>');
                html.push('<div class="popuDiv"><img class="faicon" src="'+this.addr+'" />'+validNullStr(model.address)+'</div>');
                html.push('<div class="popuDiv"><img class="faicon" src="'+this.lic+'" />'+validNullStr(model.permitLicence)+'</div>');
               /* html.push('<div class="poputools">');
                html.push('<button onclick="getMineTime('+JSON.stringify(model).replace(/"/g, '&quot;')+',\'mine\')">详情</button>');
                html.push('</div>');*/
                return html.join('');
            },
            createSttpHtml(model){
                let html = [];
                html.push('<div class="popuDiv"><img class="faicon" src="'+this.sttp+'" />'+validNullStr(model.stationName)+'</div>');
                html.push('<div class="popuDiv"><img class="faicon" src="'+this.qtype+'" />'+this.getStationTypeNm(model.stationType)+'</div>');
                html.push('<div class="popuDiv"><img class="faicon" src="'+this.par+'" />'+validNullStr(model.param)+'</div>');
               /* html.push('<div class="poputools">');
                html.push('<button onclick="getMineTime(\''+model.stationId+'\',\'stpmine\')">分钟数据</button>');
                html.push('<button onclick="getMineTime(\''+model.stationId+'\',\'stphour\')">小时数据</button>');
                html.push('</div>');
                html.push('<div class="poputools">');
                html.push('<button onclick="getMineTime('+JSON.stringify(model).replace(/"/g, '&quot;')+',\'sttp\')">详情</button>');
                html.push('</div>');*/
                return html.join('');
            },
            createPwkHtml(model){
                let html = [];
                html.push('<div class="popuDiv"><span>排口名称：</span>'+validNullStr(model.portName)+'</div>');
                html.push('<div class="popuDiv"><span>公司名称：</span>'+validNullStr(model.companyName)+'</div>');
                html.push('<div class="popuDiv"><span>使用状态：</span>'+validNullStr(model.useStatusName)+'</div>');
                html.push('<div class="popuDiv"><span>排污许可证：</span>'+validNullStr(model.permitLicence)+'</div>');
                /*html.push('<div class="poputools">');
                html.push('<button onclick="getMineTime('+JSON.stringify(model).replace(/"/g, '&quot;')+',\'ww\')">详情</button>');
                html.push('</div>');*/
                return html.join('');
            },
            createGSttpHtml(model){
                let html = [];
                html.push('<div class="popuDiv"><img class="faicon" src="'+this.sttp+'" />'+validNullStr(model.pointName)+'</div>');
                html.push('<div class="popuDiv"><img class="faicon" src="'+this.qtype+'" />'+validNullStr(model.manageLevelName)+'</div>');
                //html.push('<div class="popuDiv"><span>站点编码：</span>'+validNullStr(model.pointCode)+'</div>');
                html.push('<div class="popuDiv"><img class="faicon" src="'+this.addr+'" />'+validNullStr(model.address)+'</div>');
                /*html.push('<div class="poputools">');
                html.push('<button onclick="getMineTime('+JSON.stringify(model).replace(/"/g, '&quot;')+',\'air\')">详情</button>');
                html.push('</div>');*/
                return html.join('');
            },
            createGKttpHtml(model){
                let html = [];
                html.push('<div class="popuDiv"><img class="faicon" src="'+this.sttp+'" />'+validNullStr(model.stationName)+'</div>');
                html.push('<div class="popuDiv"><img class="faicon" src="'+this.qtype+'" />国控监测站</div>');
                html.push('<div class="popuDiv"><img class="faicon" src="'+this.addr+'" />'+validNullStr(model.stationCode)+'</div>');
                return html.join('');
            },
            createWryHtml(model){
                let html = [];
                html.push('<div class="popuDiv"><span>排污口名称：</span>'+validNullStr(model.portName)+'</div>');
                html.push('<div class="popuDiv"><span>公司名称：</span>'+validNullStr(model.companyName)+'</div>');
                html.push('<div class="popuDiv"><span>排污许可证：</span>'+validNullStr(model.permitLicence)+'</div>');
                html.push('<div class="popuDiv"><span>排污口类型：</span>废水排污口</div>');
                /*html.push('<div class="poputools">');
                html.push('<button onclick="getMineTime('+JSON.stringify(model).replace(/"/g, '&quot;')+',\'wg\')">详情</button>');
                html.push('</div>');*/
                return html.join('');
            },
            getStationTypeNm(type){
                if(type == 1){
                    return "常规监测站";
                }else if(type == 2){
                    return "传感器监测站";
                }else {
                    return "其它";
                }
            },
            getLevel(level){
                if(level=="优"){
                    return 1;
                }else if(level == "良"){
                    return 2;
                }else if(level == "轻度污染"){
                    return 3;
                }else if(level == "中度污染"){
                    return 4;
                }else if(level == "重度污染"){
                    return 5;
                }else if(level == "严重污染"){
                    return 6;
                }else{
                    return 1;
                }
            },
            getSo2Level(val){
                val = parseFloat(val);
                if(val>0&&val<=150){
                    return 1;
                }else if(val>150&&val<=500){
                    return 2;
                }else if(val>500&&val<=650){
                    return 3;
                }else if(val>650&&val<800){
                    return 4;
                }else{
                    return 6;
                }
            },
            getNo2Level(val){
                val = parseFloat(val);
                if(val>0&&val<=100){
                    return 1;
                }else if(val>100&&val<=200){
                    return 2;
                }else if(val>200&&val<=700){
                    return 3;
                }else if(val>700&&val<1200){
                    return 4;
                }else if(val>1200&&val<2340){
                    return 5;
                }else if(val>2340&&val<3090){
                    return 6;
                }else{
                    return 6;
                }
            },
            getPm10Level(val){
                val = parseFloat(val);
                if(val>0&&val<=50){
                    return 1;
                }else if(val>50&&val<=150){
                    return 2;
                }else if(val>150&&val<=250){
                    return 3;
                }else if(val>250&&val<350){
                    return 4;
                }else if(val>350&&val<420){
                    return 5;
                }else if(val>420&&val<500){
                    return 6;
                }else{
                    return 6;
                }
            },
            getPm25Level(val){
                val = parseFloat(val);
                if(val>0&&val<=35){
                    return 1;
                }else if(val>35&&val<=75){
                    return 2;
                }else if(val>75&&val<=115){
                    return 3;
                }else if(val>115&&val<150){
                    return 4;
                }else if(val>150&&val<250){
                    return 5;
                }else if(val>250&&val<350){
                    return 6;
                }else{
                    return 6;
                }
            },
            getO3Level(val){
                val = parseFloat(val);
                if(val>0&&val<=100){
                    return 1;
                }else if(val>100&&val<=160){
                    return 2;
                }else if(val>160&&val<=200){
                    return 3;
                }else if(val>200&&val<300){
                    return 4;
                }else if(val>300&&val<400){
                    return 5;
                }else if(val>400&&val<800){
                    return 6;
                }else{
                    return 6;
                }
            },
            getCOLevel(val){
                val = parseFloat(val);
                if(val>0&&val<=5){
                    return 1;
                }else if(val>5&&val<=10){
                    return 2;
                }else if(val>10&&val<=35){
                    return 3;
                }else if(val>35&&val<60){
                    return 4;
                }else if(val>60&&val<90){
                    return 5;
                }else if(val>90&&val<120){
                    return 6;
                }else{
                    return 6;
                }
            },
            createPointByLevel(model){
                if(model.lat&&model.lng&&model.lat!=""&&model.lng!=""){
                    let markCls = "gMarker_" + model.level;
                    let divIcon = L.divIcon({
                        className: markCls,
                        //iconSize: [30, 30]
                    });
                    return L.marker([ model.lat,model.lng],{
                        icon:divIcon
                    });
                }else{
                    return null;
                }
            },
            createGkPointByLevel(model){
                if(model.latitude&&model.longitude&&model.latitude!=""&&model.longitude!=""){
                    let markCls = "gMarker_" + model.level;
                    let divIcon = L.divIcon({
                        className: markCls,
                        //iconSize: [30, 30]
                    });
                    return L.marker([ model.latitude,model.longitude],{
                        icon:divIcon
                    });
                }else{
                    return null;
                }
            },
            getXzcfData(layerId,stime,etime){
                this.$mapUtil.removeTemLayer(layerId);
                let body = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "match":"contain",
                            "field":"startDate",
                            "value":stime
                        },
                        {
                            "operator":"AND",
                            "match":"contain",
                            "field":"endDate",
                            "value":etime
                        }
                    ]
                };
                this.$axios({
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f73768e6501737b048d0300bc?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    let list = res.data.data;
                    if(list.length>0){
                        let data = [];
                        for(let model of list) {
                            if(model.longitude!="null"&&model.longitude!=null){
                               // model.longitude =  this.DegreeConvertBack(model.lngDegree,model.lngMinute,model.lngSecond);
                               // model.latitude = this.DegreeConvertBack(model.latDegree,model.latMinute,model.latSecond);
                                let point = {lat: model.latitude, lng: model.longitude, count: Number(model.indexValue)};
                                data.push(point)
                            }
                        }
                        let heatData = {
                            max: 10,
                            data: data
                        };
                        let heatLayer = this.$mapUtil.heatmapLayer(this.$mapUtil.lMap,heatData);
                        this.$mapUtil.addTemLayer(layerId,heatLayer);
                    }
                    this.$parent.setDataList(layerId,list);
                })
            },
            getHjxfData(layerId,stime,etime){
                this.$mapUtil.removeTemLayer(layerId);
                let body = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "match":"contain",
                            "field":"startDate",
                            "value":stime
                        },
                        {
                            "operator":"AND",
                            "match":"contain",
                            "field":"endDate",
                            "value":etime
                        }
                    ]
                };
                this.$axios({
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f73768e6501737b04109f00b9?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    let list = res.data.data;
                    if(list.length>0){
                        let data = [];
                        for(let model of list) {
                            if(model.longitude!="null"&&model.longitude!=null){
                               // model.longitude =  this.DegreeConvertBack(model.lngDegree,model.lngMinute,model.lngSecond);
                               // model.latitude = this.DegreeConvertBack(model.latDegree,model.latMinute,model.latSecond);
                                let point = {lat: model.latitude, lng: model.longitude, count: Number(model.indexValue)};
                                data.push(point)
                            }
                           
                        }
                        let heatData = {
                            max: 10,
                            data: data
                        };
                        let heatLayer = this.$mapUtil.heatmapLayer(this.$mapUtil.lMap,heatData);
                        this.$mapUtil.addTemLayer(layerId,heatLayer);
                    }else{
                        this.$message.error("该时段无相关数据！");
                    }
                    this.$parent.setDataList(layerId,list);
                })
            },
            getWaterData(layerId,stime,etime){
                this.$mapUtil.removeTemLayer(layerId);
                let body = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "match":"contain",
                            "field":"startDate",
                            "value":stime
                        },
                        {
                            "operator":"AND",
                            "match":"contain",
                            "field":"endDate",
                            "value":etime
                        }
                    ]
                };
                this.$axios({
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f73768e6501737b05a40800c2?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    let list = res.data.data;
                    if(list.length>0){
                        let data = [];
                        for(let model of list) {
                            if( model.latitude!="null"&&model.longitude!="null"){
                                let point = {lat: model.latitude, lng: model.longitude, count: Number(model.indexValue)};
                                data.push(point)
                            }
                        }
                        let heatData = {
                            max: 10,
                            data: data
                        };
                        let heatLayer = this.$mapUtil.heatmapLayer(this.$mapUtil.lMap,heatData);
                        this.$mapUtil.addTemLayer(layerId,heatLayer);
                    }
                    this.$parent.setDataList(layerId,list);
                })
            },
            getAirData(layerId,stime,etime){
                this.$mapUtil.removeTemLayer(layerId);
                let body = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "match":"contain",
                            "field":"startDate",
                            "value":stime
                        },
                        {
                            "operator":"AND",
                            "match":"contain",
                            "field":"endDate",
                            "value":etime
                        }
                    ]
                };
                this.$axios({
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f73768e6501737b053f3a00bf?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    let list = res.data.data;
                    if(list.length>0){
                        let data = [];
                        for(let model of list) {
                            if( model.latitude!="null"&&model.longitude!="null"){
                                let point = {lat: model.latitude, lng: model.longitude, count: Number(model.indexValue)};
                                data.push(point)
                            }
                        }
                        let heatData = {
                            max: 10,
                            data: data
                        };
                        let heatLayer = this.$mapUtil.heatmapLayer(this.$mapUtil.lMap,heatData);
                        this.$mapUtil.addTemLayer(layerId,heatLayer);
                    }
                    this.$parent.setDataList(layerId,list);
                })
            },
            getMineTime(id){
                console.log(id);
            },
            validNullStr(str){
                if(str!=null&&str!="null"){
                    return str;
                }
                return "-";
            },
            valideDate(){//添加简单软件授权协议
                let _date = new Date().getTime();
                if(_date>=1609430399000){
                    return false;
                }
                return true;
            }
        }
    }
</script>

<style scoped>

    .layerDiv {
        position: absolute;
        top: 130px;
        right: 10px;
        width: 250px;
        height: auto;
        background-color: rgba(15, 35, 54, 0.83);
        z-index: 1090;
        border-radius: 5px;
    }
    .etitle{
        height: 31px;
        text-align: left;
        color: #fff;
        font-size: 14px;
        line-height: 31px;
        padding-left: 15px;
        background: rgba(194, 228, 242, 0.1);
        border-radius: 4px 4px 0px 0px;
    }
    .layerList {
        padding: 5px;
    }
    .layerTitle {
        height: 28px;
        line-height: 28px;
        color: #03E9EB;
        font-size: 13px;
        text-align: left;
        padding: 0 15px;
        
    }
    .laRec {
        display: inline-block;
        width: 3px;
        height: 15px;
        background: #03E9EB;
        vertical-align: middle;
        margin-right: 3px;
    }
    .layerList ul {
        margin: 0;
        padding: 0;
    }
    .layerList ul li{
        text-align: left;
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        list-style: none;
    }
    .layerList ul li>img{
        width: 15px;
        margin: 0 5px;
        vertical-align: middle;
    }
    .layerList ul li>span{
        font-size: 13px;
        color:#fff;
        vertical-align: middle;
    }
    .layerList >>>.el-switch{
       float:right;
       margin-top:3px;
    }
    .layerList >>>.el-switch__core {
        margin: 0;
        display: inline-block;
        position: relative;
        width: 30px;
        height: 15px;
        border: 1px solid #DCDFE6;
        outline: none;
        border-radius: 10px;
        box-sizing: border-box;
        background: #DCDFE6;
        cursor: pointer;
        transition: border-color .3s, background-color .3s;
        vertical-align: middle;
    }
    .layerList >>>.el-switch__core:after {
        content: "";
        position: absolute;
        top: 1px;
        left: 1px;
        border-radius: 100%;
        transition: all .3s;
        width: 12px;
        height: 12px;
        background-color: #fff;
    }

    .layerList >>>.el-switch.is-checked .el-switch__core:after {
        content: "";
        position: absolute;
        top: 1px;
        left: 32px;
        border-radius: 100%;
        transition: all .3s;
        width: 12px;
        height: 12px;
        background-color: #fff;
    }

</style>