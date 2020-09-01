<template>
    <div class="layerDiv" v-loading="loading">
        <div class="etitle" v-show="false">
            <i class="el-icon-s-operation" style="margin-right:5px"></i> 业务数据图层
        </div>
        <div class="layerTitle">
            企业数据
        </div>
        <div class="layerList">
            <ul>
                <li v-for="(item,key) in factoryList" :key="key" >
                    <el-checkbox style="vertical-align: middle" v-model="item.checked" @change="setFactory($event,item)"></el-checkbox>
                    <img :src="item.image" alt="">
                    <span>{{item.name}}</span>
                </li>
            </ul>
        </div>
        <div class="layerTitle">
            监测站点
        </div>
        <div class="layerList">
            <ul>
                <li v-for="(item,key) in moniList" :key="key" >
                    <el-checkbox style="vertical-align: middle" v-model="item.checked" @change="setFactory($event,item)"></el-checkbox>
                    <img :src="item.image" alt="">
                    <span>{{item.name}}</span>
                </li>
            </ul>
        </div>
        <div class="layerTitle">
            空气质量数据监测站
        </div>
        <div class="layerList">
            <ul>
                <li v-for="(item,key) in airList" :key="key" >
                    <el-checkbox style="vertical-align: middle" v-model="item.checked" @change="setFactory($event,item)"></el-checkbox>
                    <img :src="item.image" alt="">
                    <span>{{item.name}}</span>
                </li>
            </ul>
        </div>
        <div class="layerTitle">
            热力图
        </div>
        <div class="layerList">
            <ul>
                <li v-for="(item,key) in statisList" :key="key" >
                    <el-checkbox style="vertical-align: middle" v-model="item.checked" @change="setHeatMap($event,item)"></el-checkbox>
                    <img :src="item.image" alt="">
                    <span>{{item.name}}</span>
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
                    {type:"factory",name:"所有企业信息",checked:false,image:require("../../assets/image/icon/gkxx.png")},
                    {type:"wryFac",name:"在线监控企业信息",checked:false,image:require("../../assets/image/icon/gkxx.png")},
                    {type:"mine",name:"工况监控企业信息",checked:false,image:require("../../assets/image/icon/gkxx.png")},
                    {type:"wg",name:"废气排污口",checked:false,image:require("../../assets/image/icon/wry.png")},
                    {type:"ww",name:"废水排污口",checked:false,image:require("../../assets/image/icon/wry.png")}
                ],
                moniList:[
                    {type:"sttp_normal",name:"常规监测站",checked:false,image:require("../../assets/image/icon/cgz.png")},
                   // {type:"sttp_yd",name:"移动监测站",checked:false,image:require("../../assets/image/icon/ydz.png")},
                    {type:"sttp_wz",name:"微站",checked:false,image:require("../../assets/image/icon/wz.png")}
                ],
                airList:[
                    {type:"sttp_all",name:"空气质量监测站点",checked:false,image:require("../../assets/image/icon/gkz.png")},
                    {type:"sttp_gk",name:"国控站点",checked:false,image:require("../../assets/image/icon/gkz.png")},
                    {type:"sttp_sk",name:"省(区)控站点",checked:false,image:require("../../assets/image/icon/skz.png")}
                ],
                statisList:[
                    {type:"hjxf",name:"环境信访热力图",checked:false,image:require("../../assets/image/icon/rlt_1.png")},
                    {type:"xzcf",name:"行政处罚热力图",checked:false,image:require("../../assets/image/icon/rlt_2.png")},
                    {type:"fqpk",name:"废气排口超标热力图",checked:false,image:require("../../assets/image/icon/rlt_1.png")},
                    {type:"fspk",name:"废水排口超标热力图",checked:false,image:require("../../assets/image/icon/rlt_1.png")}
                ],
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
        },
        methods: {
            initSTime(){
                const end = new Date();
                return this.$appUtil.formatDate("yyyy-MM-dd",end);
            },
            initETime(day){
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * day);
                return this.$appUtil.formatDate("yyyy-MM-dd",start);
            },
            setFactory(val,item){
                if(val){
                    if(item.type == "factory"){
                        this.getFactory(item.type);
                    }else if(item.type == "sttp_yd"){
                        this.getSttp(item.type);
                    }else if(item.type == "wry"){
                        this.getWry(item.type);
                    }else if(item.type == "wg"){
                        this.getWry(item.type);
                    }else if(item.type == "sttp_normal"){
                        this.getNormalSttp(item.type);
                    }else if(item.type == "sttp_wz"){
                        this.getWzSttp(item.type);
                    }else if(item.type == "mine"){
                        this.getMineData(item.type);
                    }else if(item.type == "sttp_all"){
                        this.getSttpAll(item.type);
                    }else if(item.type == "sttp_gk"){
                        this.getCsttp(item.type,1);
                    }else if(item.type == "sttp_sk"){
                        this.getCsttp(item.type,2);
                    }else if(item.type == "ww"){
                        this.getPwk(item.type);
                    }
                }else{
                    this.$mapUtil.removeTemLayer(item.type);
                    this.$parent.removeDataList(item.type);
                }
            },
            setHeatMap(val,item){
                if(val){
                    let stime = this.initETime(365);
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
                this.loading = true;
                let wzIcon = require("../../assets/image/map/map_fac.png");
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
                    this.loading = false;
                    let list = res.data.data.list;
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
                    this.$parent.setDataList(layerId,list);
                })
            },
            getMineData(layerId){
                let wzIcon = require("../../assets/image/map/map_gk.png");
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
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f73768e6501737affb75b00ad?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {

                    let list = res.data.data.list;
                    let facLayer = L.markerClusterGroup();
                    for(let model of list) {
                        let marker = this.$mapUtil.createPointMarker(model,wzIcon);
                        marker.id = model.enterpriseNo;
                        if(marker){
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
                let wzIcon = require("../../assets/image/map/map_water.png");
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
                    let list = res.data.data.list;
                    let markers = [];
                    for(let model of list) {
                        let marker = this.$mapUtil.createPointMarker(model,wzIcon);
                        if(marker){
                            marker.id = model.id;
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
                let wzIcon = require("../../assets/image/map/map_water.png");
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
                    let markers = [];
                    for(let model of list) {
                        let marker = this.$mapUtil.createPointMarker(model,wzIcon);
                        if(marker){
                            marker.id = model.id;
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
                let wzIcon = require("../../assets/image/map/sttp_gk.png");
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
                    if(list.length == 0){
                        this.$message.error("未查询到相关数据！");
                        return;
                    }
                    let markers = [];
                    for(let model of list) {
                        let marker = this.$mapUtil.createPointMarker(model,wzIcon);
                        if(marker){
                            marker.id = model.id;
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
                let wzIcon = require("../../assets/image/map/fac.png");
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
                    let markers = [];
                    for(let model of list) {
                        let marker = this.$mapUtil.createPointMarkerByLgnt(model,wzIcon);
                        marker.id = model.stationId;
                        if(marker){
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
                let wzIcon = require("../../assets/image/map/map_wz2.png");
                let body = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "field":"stationType",
                            "match":"equal",
                            "value":"2",//微通站
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
                    let markers = [];
                    for(let model of list) {
                        let marker = this.$mapUtil.createPointMarkerByLgnt(model,wzIcon);
                        marker.id = model.stationId;
                        if(marker){
                            marker.id = model.id;
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
                let wzIcon = require("../../assets/image/map/map_air.png");
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
                    let markers = [];
                    for(let model of list) {
                        let marker = this.$mapUtil.createPointMarker(model,wzIcon);
                        if(marker){
                            marker.id = model.id;
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
            createMineHtml(model){
                let html = [];
                html.push('<div class="popuDiv"><span>企业名称：</span>'+model.enterpriseName+'</div>');
                html.push('<div class="popuDiv"><span>企业地址：</span>'+model.address+'</div>');
                html.push('<div class="popuDiv"><span>排污许可证号：</span>'+model.permitLicence+'</div>');
                html.push('<div class="poputools">');
                html.push('<button onclick="getMineTime('+JSON.stringify(model).replace(/"/g, '&quot;')+',\'mine\')">详情</button>');
                html.push('</div>');
                return html.join('');
            },
            createSttpHtml(model){
                let html = [];
                html.push('<div class="popuDiv"><span>站点名称：</span>'+model.stationName+'</div>');
                html.push('<div class="popuDiv"><span>站点类型：</span>'+this.getStationTypeNm(model.stationType)+'</div>');
                html.push('<div class="popuDiv"><span>监测参数：</span>'+model.param+'</div>');
               /* html.push('<div class="poputools">');
                html.push('<button onclick="getMineTime(\''+model.stationId+'\',\'stpmine\')">分钟数据</button>');
                html.push('<button onclick="getMineTime(\''+model.stationId+'\',\'stphour\')">小时数据</button>');
                html.push('</div>');*/
                html.push('<div class="poputools">');
                html.push('<button onclick="getMineTime('+JSON.stringify(model).replace(/"/g, '&quot;')+',\'sttp\')">详情</button>');
                html.push('</div>');
                return html.join('');
            },
            createPwkHtml(model){
                let html = [];
                html.push('<div class="popuDiv"><span>排口名称：</span>'+model.portName+'</div>');
                html.push('<div class="popuDiv"><span>公司名称：</span>'+model.companyName+'</div>');
                html.push('<div class="popuDiv"><span>使用状态：</span>'+model.useStatusName+'</div>');
                html.push('<div class="popuDiv"><span>排污许可证：</span>'+model.permitLicence+'</div>');
                html.push('<div class="poputools">');
                html.push('<button onclick="getMineTime('+JSON.stringify(model).replace(/"/g, '&quot;')+',\'ww\')">详情</button>');
                html.push('</div>');
                return html.join('');
            },
            createGSttpHtml(model){
                let html = [];
                html.push('<div class="popuDiv"><span>站点名称：</span>'+model.pointName+'</div>');
                html.push('<div class="popuDiv"><span>站点类型：</span>'+model.manageLevelName+'</div>');
                html.push('<div class="popuDiv"><span>站点编码：</span>'+model.pointCode+'</div>');
                html.push('<div class="popuDiv"><span>站点地址：</span>'+model.address+'</div>');
                html.push('<div class="poputools">');
                html.push('<button onclick="getMineTime('+JSON.stringify(model).replace(/"/g, '&quot;')+',\'air\')">详情</button>');
                html.push('</div>');
                return html.join('');
            },
            createWryHtml(model){
                let html = [];
                html.push('<div class="popuDiv"><span>排污口名称：</span>'+model.portName+'</div>');
                html.push('<div class="popuDiv"><span>公司名称：</span>'+model.companyName+'</div>');
                html.push('<div class="popuDiv"><span>排污许可证：</span>'+model.permitLicence+'</div>');
                html.push('<div class="popuDiv"><span>排污口类型：</span>废水排污口</div>');
                html.push('<div class="poputools">');
                html.push('<button onclick="getMineTime('+JSON.stringify(model).replace(/"/g, '&quot;')+',\'wg\')">详情</button>');
                html.push('</div>');
                return html.join('');
            },
            getStationTypeNm(type){
                if(type == 1){
                    return "常规空气质量监测点";
                }else if(type == 2){
                    return "传感器监测点";
                }else {
                    return "其它";
                }
            },
            getXzcfData(layerId,stime,etime){
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
                            model.lng =  this.DegreeConvertBack(model.lngDegree,model.lngMinute,model.lngSecond);
                            model.lat = this.DegreeConvertBack(model.latDegree,model.latMinute,model.latSecond);
                            let point = {lat: model.lat, lng: model.lng, count: Number(model.indexValue)};
                            data.push(point)
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
                            model.lng =  this.DegreeConvertBack(model.lngDegree,model.lngMinute,model.lngSecond);
                            model.lat = this.DegreeConvertBack(model.latDegree,model.latMinute,model.latSecond);
                            let point = {lat: model.lat, lng: model.lng, count: Number(model.indexValue)};
                            data.push(point)
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
        background-color: rgba(0, 0, 0, 0.89);
        z-index: 1090;
        border-radius: 5px;
    }
    .etitle{
        height: 25px;
        text-align: left;
        color: #fff;
        font-size: 13px;
        line-height: 25px;
        padding-left: 15px;
        border-bottom: 2px solid #0c4f9e;
    }
    .layerList {
        padding: 5px;
    }
    .layerTitle {
        height: 28px;
        line-height: 28px;
        color: #fff;
        font-size: 13px;
        text-align: left;
        padding: 0 15px;
        background-color: rgba(27, 40, 86, 0.86);
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
</style>