<template>
    <div class="dataConDiv" v-show="showConts">
        <div class="etitle">
            <span>基础数据信息</span>
           <!-- <i class="el-icon-close" @click="hideData"></i>-->
        </div>
        <div class="apiDatas">
            <el-collapse v-model="activeNames" accordion>
                <el-collapse-item title="在线监控企业数据" name="factory" class="leftBox" v-show="facShow">
                    <div v-for="(item,key) in factoryList" class="container" :key="key"  @mouseenter="showMapPoint(item)" @mouseleave="clearMap()">
                        <div class="source">
                            <div class="content">
                                <div class="company_name text-ell">{{item.companyName}}</div>
                                <div class="company_type">行业类别：{{item.industryType}}</div>
                                <p  class="describe text-ell">{{item.divisionProvince}}{{item.divisionArea}}</p>
                                <p  class="describe text-ell">{{item.operationAddress}}</p>
                                <p  class="describe text-ell">排污许可证号：{{item.permitLicence}}</p>
                                <!--<button  type="button" class="el-button el-button&#45;&#45;primary"><span>污染源</span></button>-->
                                <button  type="button" class="el-button el-button--success" @click="zoomToMap(item,'factory')"><span>详情</span></button>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="工况监测企业数据" name="mine" class="leftBox" v-show="mineShow"  >
                    <div v-for="(item,key) in mineList" class="container" :key="key" @mouseenter="showMinePoint(item)" @mouseleave="clearMap()">
                        <div class="source">
                            <div class="content">
                                <div class="company_name text-ell">{{item.enterpriseName}}</div>
                                <div class="company_type">行业类别：{{item.industryType}}</div>
                                <p  class="describe text-ell">{{item.address}}</p>
                                <p  class="describe text-ell">排污许可证号：{{item.permitLicence}}</p>
                                <button  type="button" class="el-button el-button--success"  @click="zoomToMap(item,'mine')"><span>详情</span></button>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="废水排污口数据" name="wg" class="leftBox" v-show="wgShow">
                    <div v-for="(item,key) in wgList" class="container" :key="key"  @mouseenter="showWgPoint(item)" @mouseleave="clearMap()">
                        <div class="source">
                            <div class="content">
                                <div class="company_name text-ell">{{item.portName}}</div>
                                <div class="company_type">所属企业：{{item.companyName}}</div>
                                <p  class="describe text-ell">排口地址：{{item.portAddress}}</p>
                                <p  class="describe text-ell">排污许可证号：{{item.permitLicence}}</p>
                                <button  type="button" class="el-button el-button--success"  @click="zoomToMap(item,'wg')"><span>详情</span></button>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="废气排污口数据" name="ww" class="leftBox" v-show="wwShow">
                    <div v-for="(item,key) in wwList" class="container" :key="key"  @mouseenter="showWwPoint(item)" @mouseleave="clearMap()">
                        <div class="source">
                            <div class="content">
                                <div class="company_name text-ell">{{item.portName}}</div>
                                <div class="company_type">所属企业：{{item.companyName}}</div>
                                <p  class="describe text-ell">排口地址：{{item.portAddress}}</p>
                                <p  class="describe text-ell">排污许可证号：{{item.permitLicence}}</p>
                                <button  type="button" class="el-button el-button--success"  @click="zoomToMap(item,'ww')"><span>详情</span></button>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="常规监测站数据" name="sttp_normal" class="leftBox" v-show="normalShow">
                    <div v-for="(item,key) in normalList" class="container" :key="key"  @mouseenter="showNormalPoint(item)" @mouseleave="clearMap()">
                        <div class="source">
                            <div class="content">
                                <div class="company_name text-ell">{{item.stationName}}</div>
                                <div class="company_type">测站类型：{{item.stationType=='1'?'常规监测站':'传感器监测站'}}</div>
                                <p  class="describe text-ell">测站地址：{{item.portAddress}}</p>
                                <button  type="button" class="el-button el-button--success"  @click="zoomToMap(item,'sttp_normal')"><span>详情</span></button>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="微站数据" name="sttp_wz" class="leftBox" v-show="wzShow">
                    <div v-for="(item,key) in wzList" class="container" :key="key"  @mouseenter="showWzPoint(item)" @mouseleave="clearMap()">
                        <div class="source">
                            <div class="content">
                                <div class="company_name text-ell">{{item.stationName}}</div>
                                <div class="company_type">测站类型：{{item.stationType=='1'?'常规监测站':'传感器监测站'}}</div>
                                <p  class="describe text-ell">测站地址：{{item.portAddress}}</p>
                                <button  type="button" class="el-button el-button--success"  @click="zoomToMap(item,'sttp_wz')"><span>详情</span></button>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
    export default {
        name: "data-container",
        data(){
            return{
                showConts:false,
                searchVal:"",
                resultList:[],
                activeNames: '',
                factoryList:[],
                mineList:[],
                wwList:[],
                wgList:[],
                normalList:[],
                wzList:[],
                facShow:false,
                mineShow:false,
                wwShow:false,
                wgShow:false,
                normalShow:false,
                wzShow:false,
                temLayer:null
            }
        },
        mounted(){

        },
        methods:{
            initDraw(){
                this.temLayer = L.layerGroup();
                this.$mapUtil.lMap.addLayer(this.temLayer);
            },
            showData() {
                this.showConts = true;
            },
            hideData(){
                this.showConts = false;
            },
            showMapPoint(item){
                let wzIcon = require("../../assets/image/map/map_fac.png");
                this.temLayer.clearLayers();
                let model = {};
                model.longitude =  this.DegreeConvertBack(item.lngDegree,item.lngMinute,item.lngSecond);
                model.latitude = this.DegreeConvertBack(item.latDegree,item.latMinute,item.latSecond);
                let marker = this.$mapUtil.createPointMarker(model,wzIcon);

                this.temLayer.addLayer(marker);
                marker.bindTooltip(item.companyName,{
                    direction:'top',
                    offset:[7,-10]
                }).openTooltip();
            },
            showMinePoint(item){
                let wzIcon = require("../../assets/image/map/map_gk.png");
                this.temLayer.clearLayers();
                let marker = this.$mapUtil.createPointMarker(item,wzIcon);
                this.temLayer.addLayer(marker);
                marker.bindTooltip(item.enterpriseName,{
                    direction:'top',
                    offset:[7,-10]
                }).openTooltip();
            },
            showWwPoint(item){
                let wzIcon = require("../../assets/image/map/map_water.png");
                this.temLayer.clearLayers();
                let marker = this.$mapUtil.createPointMarker(item,wzIcon);
                this.temLayer.addLayer(marker);
                marker.bindTooltip(item.portName,{
                    direction:'top',
                    offset:[7,-10]
                }).openTooltip();
            },
            showWgPoint(item){
                let wzIcon = require("../../assets/image/map/map_water.png");
                this.temLayer.clearLayers();
                let marker = this.$mapUtil.createPointMarker(item,wzIcon);
                this.temLayer.addLayer(marker);
                marker.bindTooltip(item.portName,{
                    direction:'top',
                    offset:[7,-10]
                }).openTooltip();
            },
            showNormalPoint(item){
                let wzIcon = require("../../assets/image/map/fac.png");
                this.temLayer.clearLayers();
                let marker = this.$mapUtil.createPointMarkerByLgnt(item,wzIcon);
                this.temLayer.addLayer(marker);
                marker.bindTooltip(item.stationName,{
                    direction:'top',
                    offset:[7,-10]
                }).openTooltip();
            },
            showWzPoint(item){
                let wzIcon = require("../../assets/image/map/map_wz2.png");
                this.temLayer.clearLayers();
                let marker = this.$mapUtil.createPointMarkerByLgnt(item,wzIcon);
                this.temLayer.addLayer(marker);
                marker.bindTooltip(item.stationName,{
                    direction:'top',
                    offset:[7,-10]
                }).openTooltip();
            },

            clearMap(){
                this.temLayer.clearLayers();
            },
            DegreeConvertBack(deg,min,sec){ ///<summary>度分秒转换成为度</summary>
                return Math.abs(deg) + (Math.abs(min)/60 + Math.abs(sec)/3600);
            },
            zoomToMap(item,type){
                let model = {};
                if(type == "factory"){
                    model.longitude =  this.DegreeConvertBack(item.lngDegree,item.lngMinute,item.lngSecond);
                    model.latitude = this.DegreeConvertBack(item.latDegree,item.latMinute,item.latSecond);
                    this.$mapUtil.lMap.flyTo([model.latitude,model.longitude],16,{animate:false});
                    let layerGroup = this.$mapUtil.getTempLayer(type);
                    layerGroup.eachLayer(function (layer){
                        if (layer.id === item.dataId){
                            layer.openPopup();
                        }
                    });
                }else if(type == "mine") {
                    this.$mapUtil.lMap.flyTo([item.latitude, item.longitude], 16,{ animate:false});
                    let layerGroup = this.$mapUtil.getTempLayer(type);
                    layerGroup.eachLayer(function (layer){
                        if (layer.id === item.enterpriseNo){
                            layer.openPopup();
                        }
                    });
                }else if(type == "sttp_normal"||type == "sttp_wz") {
                    this.$mapUtil.lMap.flyTo([item.lat, item.lng], 16,{ animate:false});
                    let layerGroup = this.$mapUtil.getTempLayer(type);
                    layerGroup.eachLayer(function (layer){
                        if (layer.id === item.stationId){
                            layer.openPopup();
                        }
                    });
                    type = "sttp";
                }
                this.$parent.setDetailData(item,type);

            },
            setDataList(type,list){
                this.activeNames = type;
                if(type=="factory"){
                    this.factoryList = list;
                    this.facShow = true;
                }else if(type == "mine"){
                    this.mineList = list;
                    this.mineShow = true;
                }else if(type == "ww"){
                    this.wwList = list;
                    this.wwShow = true;
                }else if(type == "wg"){
                    this.wgList = list;
                    this.wgShow = true;
                }else if(type == "sttp_normal"){
                    this.normalList = list;
                    this.normalShow = true;
                }else if(type == "sttp_wz"){
                    this.wzList = list;
                    this.wzShow = true;
                }
                if(!this.showConts){
                    this.showConts = true;
                }
            },
            removeDataList(type){
                //this.activeNames = '';
                if(type=="factory"){
                    this.factoryList = [];
                    this.facShow = false;
                }else if(type == "mine"){
                    this.mineList = [];
                    this.mineShow = false;
                }else if(type == "ww"){
                    this.wwList = [];
                    this.wwShow = false;
                }else if(type == "wg"){
                    this.wgList = [];
                    this.wgShow = false;
                }else if(type == "sttp_normal"){
                    this.normalList = [];
                    this.normalShow = false;
                }else if(type == "sttp_wz"){
                    this.wzList = [];
                    this.wzShow = false;
                }
                if(!this.mineShow&&!this.facShow&&!this.wwShow&&!this.wgShow&&!this.normalShow&&!this.wzShow){
                    this.showConts = false;
                }
            }
        }
    }
</script>

<style scoped>
    .dataConDiv {
        position: absolute;
        top: 125px;
        left: 10px;
        width: 300px;
        z-index: 9999;
        border-radius: 3px;
        background-color: rgba(0, 0, 0, 0.72);
        color: #fff;
        height: calc(100% - 140px);
    }
    .etitle {
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        text-align: left;
        border-bottom: 1px solid #102856;
        font-size: 14px;
    }
    .etitle i {
        float: right;
        margin-top: 8px;
        font-size: 16px;
        cursor: pointer;
    }
    .apiDatas{
        height: calc(100% - 35px);
        overflow: auto;
    }
    .leftBox >>>.el-collapse-item__header {
        display: -webkit-box;
        display: -ms-flexbox;
        -js-display: flex;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        height: 32px;
        line-height: 32px;
        color: #fff;
        font-size: 14px;
        font-weight: 400;
        background-color: rgba(0,0,0,.1);
        border-bottom: 0;
        -webkit-box-shadow: inset 0 -1px 0 0 hsla(0,0%,98%,.1);
        box-shadow: inset 0 -1px 0 0 hsla(0,0%,98%,.1);
        -webkit-box-flex: 1;
        -ms-flex-positive: 1;
        flex-grow: 1;
        padding: 0 12px;
    }
    .leftBox >>>.el-collapse-item__wrap {
        will-change: height;
        background-color: transparent !important;
        overflow: hidden;
        box-sizing: border-box;
        color: #fff;
        border-bottom: 1px solid #022849;
    }
    .leftBox >>>.el-collapse-item__content {
        padding-bottom: 5px;
        font-size: 13px;
        color: #ffffff;
        line-height: 1.769230769230769;
    }
    .el-collapse {
        border-top: 1.5px solid #3286fe;
        border-bottom: 0px solid #EBEEF5;
    }
    .container {
        cursor: pointer;
        padding: 10px 20px;
        margin: 0;
        -webkit-box-shadow: inset 0 -1px 0 0 hsla(0,0%,98%,.2);
        box-shadow: inset 0 -1px 0 0 hsla(0,0%,98%,.2);
    }
    .container:hover {
        background-color: rgba(255, 255, 255, 0.17);
    }
    .source {
        display: -webkit-box;
        display: -ms-flexbox;
        -js-display: flex;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
    }
    .source .content {
        width: calc(100% - 0px);
        text-align: left;
    }
    .source .content .company_name {
        height: 22px;
        line-height: 22px;
        font-size: 14px;
        color: #fff;
        text-align: left;
    }
    .text-ell {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .source .content .company_address, .source .content .company_type{
        min-height: 22px;
        line-height: 22px;
        font-size: 12px;
        color: hsla(0,0%,98%,.6);
        text-align: left;
    }
    .describe {
        color: hsla(0,0%,98%,.6);
        font-size: 12px;
        line-height: 22px;
        min-height: 22px;
        text-align: left;
        margin: 0;
    }
    .el-button {
        font-weight: 300;
        height: 20px;
        padding: 0;
        min-width: 62px;
        border-radius: 1px;
        font-size: 12px;
    }
</style>