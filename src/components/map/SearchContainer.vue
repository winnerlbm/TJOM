<template>
    <div class="searchDiv">
        <div class="inputDiv">
            <input type="text" placeholder="请输入查询关键字" v-model="searchVal">
            <img src="../../assets/image/menu/delete.png" @click="hideData" alt="" class="switch">
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
                this.removeNextData();
                this.getMineData("mine");
                this.getWry("wg");
                this.getPwk("ww");
                this.searchFactory("factory");
                this.showResult = false;
            },
            removeNextData(){
                this.$mapUtil.removeTemLayer("factory");
                this.$mapUtil.removeTemLayer("mine");
                this.$mapUtil.removeTemLayer("wg");
                this.$mapUtil.removeTemLayer("ww");
            },
            hideData(){
                this.searchVal = "";
                this.removeNextData();
                this.$parent.removeDataList("factory");
                this.$parent.removeDataList("mine");
                this.$parent.removeDataList("wg");
                this.$parent.removeDataList("ww");
            },
            searchFactory(layerId){
                let wzIcon = require("../../assets/image/map/map_fac.png");
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
                let wzIcon = require("../../assets/image/map/map_water.png");
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
                let wzIcon = require("../../assets/image/map/map_water.png");
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
        height: 40px;
        line-height: 40px;
        background-color: #fff;
        width: auto;
        border-radius: 3px;
        text-align: left;
        padding-left: 15px;
    }
    .inputDiv input {
        border: none;
        height: 30px;
        line-height: 30px;
        width: 240px;
        border-right: 1px solid #eee;
        outline: none;
    }
    .switch {
        vertical-align: middle;
        height: 18px;
        margin: 0 15px;
    }
    .searchBtn {
        background-color: #3286fe;
        border: none;
        height: 40px;
        line-height: 40px;
        border-radius: 0 3px 3px 0;
        cursor: pointer;
    }
    .searchBtn img {

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
</style>