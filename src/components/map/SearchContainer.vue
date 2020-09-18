<template>
    <div class="searchDiv" v-show="showSearch">
        <div class="inputDiv" >
            <input type="text"  placeholder="请输入查询关键字" v-model="searchVal"  @keyup.enter="searchData">
            <img src="../../assets/image/menu/switch.png" v-show="hideShow==false"  @click="showRoutePlan" alt="" class="switch">
            <img src="../../assets/image/menu/delete.png" v-show="hideShow"  @click="hideData" alt="" class="switch">
            <button class="searchBtn" @click="searchData"><img  class="switch" src="../../assets/image/menu/search.png" alt="" ></button>
        </div>
        <div class="resultDiv" v-show="showResult == true">
            <div class="resultTitle">
                <span>废水排放重点企业</span>
                <img class="plusImg" src="../../assets/image/menu/plus.png" alt="">
                <ul>
                    <li v-for="(item,key) in factoryList" :key="key">
                        <span>{{key}}</span>
                        <span>{{item.companyName}}</span>
                    </li>
                </ul>
            </div>
            <div class="resultTitle">
                <span>废气排放重点企业</span>
                <img class="plusImg" src="../../assets/image/menu/plus.png" alt="">
            </div>
            <div class="resultTitle">
                <span>废水排放重点企业</span>
                <img class="plusImg" src="../../assets/image/menu/plus.png" alt="">
            </div>


        </div>
    </div>
</template>

<script>
    import appCfg from "@config/AppCfg"
    export default {
        name: "searchContainer",
        data(){
            return{
                showResult:false,
                hideShow:false,
                showSearch:true,
                searchVal:"",
                factoryList:[]
            }
        },
        methods:{
            searchData(){
                if(this.searchVal==""){
                    this.$message("请输入查询关键字");
                    return;
                }
                this.hideShow = true;
                this.removeNextData();
                let queryAll = true;
                let facList = this.$parent.getFacLayerList();
                for(let i=0;i<facList.length;i++){
                    if(facList[i].checked){
                        queryAll = false;
                        if(facList[i].type == "factory"){
                            this.searchFactory("factory");
                        }else if(facList[i].type == "mine"){
                            this.getMineData("mine");
                        }else if(facList[i].type == "wg"){
                            this.getWry("wg");
                        }else if(facList[i].type == "ww"){
                            this.getPwk("ww");
                        }else if(facList[i].type == "wryFac"){
                            this.getWryFac("wryFac");
                        }
                    }
                }

                let airList = this.$parent.getAirLayerList();
                for(let j=0;j<airList.length;j++){
                    if(airList[j].checked){
                        queryAll = false;
                        if(airList[j].type == "sttp_normal"){
                            this.getNormalSttp("sttp_normal");
                        }else if(airList[j].type == "sttp_wz"){
                            this.getWzSttp("sttp_wz");
                        }else if(airList[j].type == "sttp_gk"){
                            this.getCsttp("sttp_gk",1);
                        }else if(airList[j].type == "sttp_sk"){
                            this.getCsttp("sttp_sk",2);
                        }else{
                            this.getSttpAll("sttp_all");
                        }
                    }
                }
                if(queryAll){
                    this.getMineData("mine");
                   // this.getWry("wg");
                   // this.getPwk("ww");
                    this.searchFactory("factory");
                    this.getNormalSttp("sttp_normal");
                    this.getWzSttp("sttp_wz");
                    this.getCsttp("sttp_gk",1);
                    this.getCsttp("sttp_sk",2);
                    this.getSttpAll("sttp_all");
                    this.getWryFac("wryFac");
                }
                this.showResult = false;
            },
            removeNextData(){
                this.$mapUtil.removeTemLayer("factory");
                this.$mapUtil.removeTemLayer("mine");
                this.$mapUtil.removeTemLayer("wg");
                this.$mapUtil.removeTemLayer("ww");
                this.$mapUtil.removeTemLayer("sttp_normal");
                this.$mapUtil.removeTemLayer("sttp_wz");
                this.$mapUtil.removeTemLayer("sttp_gk");
                this.$mapUtil.removeTemLayer("sttp_sk");
                this.$mapUtil.removeTemLayer("sttp_all");
                this.$mapUtil.removeTemLayer("wryFac");
            },
            hideData(){
                this.searchVal = "";
                this.removeNextData();
                this.$parent.removeDataList("factory");
                this.$parent.removeDataList("mine");
                this.$parent.removeDataList("wryFac");
                this.$parent.removeDataList("wg");
                this.$parent.removeDataList("ww");
                this.$parent.removeDataList("sttp_all");
                this.$parent.removeDataList("sttp_normal");
                this.$parent.removeDataList("sttp_wz");
                this.$parent.removeDataList("sttp_gk");
                this.$parent.removeDataList("sttp_sk");
                this.$parent.clearRoute();
                this.hideShow = false;
            },
            showRoutePlan(){
                this.showSearch = false;
                this.$parent.openRoute();
                this.$parent.hideTimeData();
                this.removeNextData();
                this.$parent.removeDataList("factory");
                this.$parent.removeDataList("mine");
                this.$parent.removeDataList("wryFac");
                this.$parent.removeDataList("wg");
                this.$parent.removeDataList("ww");
                this.$parent.removeDataList("sttp_all");
                this.$parent.removeDataList("sttp_normal");
                this.$parent.removeDataList("sttp_wz");
                this.$parent.removeDataList("sttp_gk");
                this.$parent.removeDataList("sttp_sk");
            },
            showSearchDiv(){
                this.showSearch = true;
            },
            searchFactory(layerId){
                let wzIcon = require("../../assets/image/map/factory.png");
                let body = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "field":"companyName",
                            "match":"contain",
                            "value":this.searchVal,
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
                    let list = res.data.data.list;
                    let facLayer = L.markerClusterGroup();
                    for(let model of list) {
                      //  model.longitude =  this.DegreeConvertBack(model.lngDegree,model.lngMinute,model.lngSecond);
                      //  model.latitude = this.DegreeConvertBack(model.latDegree,model.latMinute,model.latSecond);
                        let marker = this.$mapUtil.createPointMarker(model,wzIcon);
                        if(marker){
                            marker.id = model.dataId;
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
            getWryFac(layerId){
                let wzIcon = require("../../assets/image/map/wryFac.png");
                let body = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "field":"companyName",
                            "match":"contain",
                            "value":this.searchVal,
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
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f746c8ba001746d602ebd013d?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    let list = res.data.data.list;
                    let facLayer = L.markerClusterGroup();
                    for(let model of list) {
                        //model.longitude =  this.DegreeConvertBack(model.lngDegree,model.lngMinute,model.lngSecond);
                        //model.latitude = this.DegreeConvertBack(model.latDegree,model.latMinute,model.latSecond);
                        let marker = this.$mapUtil.createPointMarker(model,wzIcon);
                        if(marker){
                            marker.id = model.dataId;
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
                let wzIcon = require("../../assets/image/map/mine.png");
                let body = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "field":"enterpriseName",
                            "match":"contain",
                            "value":this.searchVal,
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
                let wzIcon = require("../../assets/image/map/wry_water.png");
                let body = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "field":"portName",
                            "match":"contain",
                            "value":this.searchVal,
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
                let wzIcon = require("../../assets/image/map/wry_air.png");
                let body = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "field":"portName",
                            "match":"contain",
                            "value":this.searchVal,
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
                        },
                        {
                            "operator":"AND",
                            "field":"pointName",
                            "match":"contain",
                            "value":this.searchVal,
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
                   /* if(list.length == 0){
                        this.$message.error("未查询到相关数据！");
                        return;
                    }*/
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
                        },
                        {
                            "operator":"AND",
                            "field":"stationName",
                            "match":"contain",
                            "value":this.searchVal,
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
                        if(marker){
                            marker.id = model.stationId;
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
                        },
                        {
                            "operator":"AND",
                            "field":"stationName",
                            "match":"contain",
                            "value":this.searchVal,
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
                        if(marker){
                            marker.id = model.stationId;
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
                        {
                            "operator":"AND",
                            "field":"pointName",
                            "match":"contain",
                            "value":this.searchVal,
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
            getStationTypeNm(type){
                if(type == 1){
                    return "常规空气质量监测点";
                }else if(type == 2){
                    return "传感器监测点";
                }else {
                    return "其它";
                }
            },
            doSomething(event){}
        }
    }
</script>

<style scoped>
    .searchDiv {
        position: absolute;
        top: 80px;
        left: 10px;
        width: auto;
        z-index: 990;
        border-radius: 5px;
    }
    .inputDiv {
       /* height: 40px;
        line-height: 40px;
        background-color: #fff;
        width: auto;
        border-radius: 3px;
        text-align: left;
        padding-left: 15px;
        border: 1px solid #3286fe;*/
        height: 40px;
        line-height: 40px;
        background-color: rgba(0, 34, 68, 0.83);
        width: auto;
        border-radius: 3px;
        text-align: left;
        padding-left: 15px;
        border: 1px solid #154081;
    }
    .inputDiv input {
        /*border: none;
        height: 30px;
        line-height: 30px;
        width: 195px;
        border-right: 1px solid #eee;
        outline: none;*/
        border: none;
        height: 30px;
        line-height: 30px;
        width: 195px;
        border-right: 1px solid #154081;
        outline: none;
        background: transparent;
        color: #fff;
    }
    .switch {
        vertical-align: middle;
        width: 16px;
        margin: 0 11px;
        cursor: pointer;
    }
    .searchBtn {
        /*background-color: #3286fe;
        border: none;
        height: 41px;
        line-height: 40px;
        border-radius: 0 3px 3px 0;
        cursor: pointer;
        outline: none;*/
        background-color: #154081;
        border: none;
        height: 41px;
        line-height: 40px;
        border-radius: 0 3px 3px 0;
        cursor: pointer;
        outline: none;
    }
    .searchBtn img {
        width: 20px;
    }

    .resultDiv {
        height: 600px;
        width: 300px;
        background-color: rgba(0, 0, 0, 0.54);
        margin-top: 5px;
        border-radius:3px ;
    }
    .resultTitle {
        background-color: #11223F;
        color: #fff;
        text-align: left;
        height: 28px;
        line-height: 28px;
        font-size: 13px;
        padding: 0 15px;
        /*display: flex;
        justify-content: space-between;*/
        margin-bottom: 3px;
    }
    .plusImg {
        display: block;
        width: 13px;
        height: 13px;
        margin-top: 7px;
        float: right;
    }
    input::-webkit-input-placeholder{
        font-size: 12px;
        color: #fff;
    }
    input::-moz-placeholder{   /* Mozilla Firefox 19+ */
        font-size: 12px;
        color: #fff;
    }
    input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
        font-size: 12px;
        color: #fff;
    }
    input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
        font-size: 12px;
        color: #fff;
    }
</style>