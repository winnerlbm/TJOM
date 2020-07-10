<template>
    <div class="layerDiv">
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
    import facMarker from "../../assets/image/map/factory.png";
    import wryMarker from "../../assets/image/map/wry.png";
    import sttpMarker from "../../assets/image/map/sttp.png";
    export default {
        name: "layerContainer",
        data(){
            return {
                factoryList:[
                  //  {type:"wry",name:"污染源",checked:false,image:require("../../assets/image/icon/wry.png")},
                    {type:"factory",name:"工况信息",checked:false,image:require("../../assets/image/icon/gkxx.png")},
                    {type:"ww",name:"废气排污口",checked:false,image:require("../../assets/image/icon/wry.png")},
                    {type:"wg",name:"废水排污口",checked:false,image:require("../../assets/image/icon/wry.png")},
                    /*{type:"gk",name:"入河海污口",checked:false,image:require("../../assets/image/icon/wry.png")},
                    {type:"gk",name:"污水处理设施",checked:false,image:require("../../assets/image/icon/wry.png")}*/
                ],
                moniList:[
                    {type:"sttp_normal",name:"常规监测站",checked:false,image:require("../../assets/image/icon/cgz.png")},
                    {type:"sttp_yd",name:"移动监测站(小时)",checked:false,image:require("../../assets/image/icon/ydz.png")},
                    {type:"sttp_wz",name:"微站",checked:false,image:require("../../assets/image/icon/wz.png")}
                ],
                airList:[
                    {type:"sttp_gk",name:"国控站点",checked:false,image:require("../../assets/image/icon/gkz.png")},
                    {type:"sttp_sk",name:"省(区)控站点(小时)",checked:false,image:require("../../assets/image/icon/skz.png")}
                ],
                statisList:[
                    {type:"hjxf",name:"环境信访热力图",checked:false,image:require("../../assets/image/icon/rlt_1.png")},
                    {type:"xzcf",name:"行政处罚热力图",checked:false,image:require("../../assets/image/icon/rlt_2.png")},
                    /*{type:"gk",name:"在线监测热力图",checked:false,image:require("../../assets/image/icon/rlt_1.png")}*/
                ]
            }
        },
        props:{
            map : Object
        },
        mounted(){
            console.log(appCfg.map.gisApiUrl);
        },
        methods: {
            setFactory(val,item){
                if(val){
                    if(item.type == "factory"){
                        this.getFactory(item.type);
                    }else if(item.type == "sttp_yd"||item.type == "sttp_wz"||item.type == "sttp_gk"||item.type == "sttp_sk"){
                        this.getSttp(item.type);
                    }else if(item.type == "wry"){
                        this.getWry(item.type);
                    }else if(item.type == "ww"||item.type == "wg"){
                        this.getPwk(item.type);
                    }else if(item.type == "sttp_normal"){
                        this.getNormalSttp(item.type);
                    }
                }else{
                    this.$mapUtil.removeTemLayer(item.type);
                }
            },
            setHeatMap(val,item){
                if(val){
                    if(item.type == "xzcf"){
                        this.getXzcfData(item.type);
                    }else if(item.type == "hjxf"){
                        this.getHjxfData(item.type);
                    }
                }else{
                    this.$mapUtil.removeTemLayer(item.type);
                }
            },
            getFactory(layerId){
                this.$axios({
                    url: appCfg.map.gisApiUrl+"api/gis/company",
                    method: "get",
                    params: {}
                }).then(res => {
                    let list = res.data.data;
                    let markers = [];
                    let facLayer = L.markerClusterGroup();
                    for(let model of list) {
                        let lant = model.latDegree+"°"+model.latMinute+"′"+model.latSecond+"″";
                        let lgtt = model.lngDegree+"°"+model.lngMinute+"′"+model.lngSecond+"″";
                        model.longitude = this.DegreeConvertBack(lgtt);
                        model.latitude = this.DegreeConvertBack(lant);
                        let marker = this.$mapUtil.createPointMarker(model,facMarker);
                        let html = this.createHtml(model);
                        marker.bindPopup(html);
                        facLayer.addLayer(marker);
                    }

                    this.$mapUtil.lMap.addLayer(facLayer);
                    this.$mapUtil.addTemLayer(layerId,facLayer);
                })
            },
            getWry(layerId){
                this.$axios({
                    url: "./data/wry.json",
                    method: "get",
                    params: {}
                }).then(res => {
                    let list = res.data.data;
                    let markers = [];
                    for(let model of list) {
                        let marker = this.$mapUtil.createPointMarker(model,wryMarker);
                        let html = this.createWryHtml(model);
                        marker.bindPopup(html);
                        markers.push(marker);
                    }
                    let facLayer = L.layerGroup(markers);
                    this.$mapUtil.lMap.addLayer(facLayer);
                    this.$mapUtil.addTemLayer(layerId,facLayer);
                })
            },
            getPwk(layerId){
                this.$axios({
                    url: appCfg.map.gisApiUrl+"api/city/outlet",
                    method: "get",
                    params: {monitorType:layerId}
                }).then(res => {
                    let list = res.data.data;
                    let markers = [];
                    for(let model of list) {
                        let marker = this.$mapUtil.createPointMarker(model,wryMarker);
                        let html = this.createWryHtml(model);
                        marker.bindPopup(html);
                        markers.push(marker);
                    }
                    let facLayer = L.layerGroup(markers);
                    this.$mapUtil.lMap.addLayer(facLayer);
                    this.$mapUtil.addTemLayer(layerId,facLayer);
                })
            },
            getSttp(layerId){
                let url = "./data/"+layerId+".json";
                this.$axios({
                    url: url,
                    method: "get",
                    params: {}
                }).then(res => {
                    let list = res.data.data;
                    let markers = [];
                    for(let model of list) {
                        let marker = this.$mapUtil.createPointMarkerByLgnt(model,sttpMarker);
                        let html = this.createSttpHtml(model);
                        marker.bindPopup(html);
                        markers.push(marker);
                    }
                    let facLayer = L.layerGroup(markers);
                    this.$mapUtil.lMap.addLayer(facLayer);
                    this.$mapUtil.addTemLayer(layerId,facLayer);
                })
            },
            getNormalSttp(layerId){
                this.$axios({
                    url: appCfg.map.gisApiUrl+"api/gis/station",
                    method: "get",
                    params: {}
                }).then(res => {
                    let list = res.data.data;
                    let markers = [];
                    for(let model of list) {
                        let marker = this.$mapUtil.createPointMarkerByLgnt(model,sttpMarker);
                        let html = this.createSttpHtml(model);
                        marker.bindPopup(html);
                        markers.push(marker);
                    }
                    let facLayer = L.layerGroup(markers);
                    this.$mapUtil.lMap.addLayer(facLayer);
                    this.$mapUtil.addTemLayer(layerId,facLayer);
                })
            },
            DegreeConvertBack(value){ ///<summary>度分秒转换成为度</summary>
                let du = value.split("°")[0];
                let fen = value.split("°")[1].split("′")[0];
                let miao = value.split("°")[1].split("′")[1].split('″')[0];
                return Math.abs(du) + (Math.abs(fen)/60 + Math.abs(miao)/3600);
            },
            createHtml(model){
                let html = [];
                html.push('<div class="popuDiv"><span>企业名称：</span>'+model.companyName+'</div>');
                html.push('<div class="popuDiv"><span>企业地址：</span>'+model.operationAddress+'</div>');
                html.push('<div class="popuDiv"><span>企业类型：</span>'+model.industryType+'</div>');
                html.push('<div class="popuDiv"><span>排污许可证号：</span>'+model.permitLicence+'</div>');
                return html.join('');
            },
            createSttpHtml(model){
                let html = [];
                html.push('<div class="popuDiv"><span>站点名称：</span>'+model.stationName+'</div>');
                html.push('<div class="popuDiv"><span>站点类型：</span>'+this.getStationTypeNm(model.stationType)+'</div>');
                html.push('<div class="popuDiv"><span>监测参数：</span>'+model.param+'</div>');
                return html.join('');
            },
            createWryHtml(model){
                let html = [];
                html.push('<div class="popuDiv"><span>排污口名称：</span>'+model.portName+'</div>');
                html.push('<div class="popuDiv"><span>排污许可证：</span>'+model.permitLicence+'</div>');
                html.push('<div class="popuDiv"><span>排污口类型：</span>废水排污口</div>');
                html.push('<div class="popuDiv"><span>监测参数：</span>'+model.monitorType+'</div>');
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
            getXzcfData(layerId){
                this.$axios({
                    url: "./data/xzcf.json",
                    method: "get",
                    params: {}
                }).then(res => {
                    let list = res.data.data;

                    let data = [];
                    for(let model of list) {
                       let point = {lat: model.lat, lng: model.lng, count: Number(model.indexValue)};
                       data.push(point)
                    }
                    let heatData = {
                        max: 10,
                        data: data
                    };
                    let heatLayer = this.$mapUtil.heatmapLayer(this.$mapUtil.lMap,heatData);
                    this.$mapUtil.addTemLayer(layerId,heatLayer);
                })
            },
            getHjxfData(layerId){
                this.$axios({
                    url: "./data/hjxf.json",
                    method: "get",
                    params: {}
                }).then(res => {
                    let list = res.data.data;

                    let data = [];
                    for(let model of list) {
                        let point = {lat: model.lat, lng: model.lng, count: Number(model.indexValue)};
                        data.push(point)
                    }
                    let heatData = {
                        max: 10,
                        data: data
                    };
                    let heatLayer = this.$mapUtil.heatmapLayer(this.$mapUtil.lMap,heatData);
                    this.$mapUtil.addTemLayer(layerId,heatLayer);
                })
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
        background-color: rgba(0, 0, 0, 0.49);
        z-index: 990;
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