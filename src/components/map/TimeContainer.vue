<template>
    <div class="dataTimeDiv" v-show="showResult">
        <div class="etitle">
            <span>{{showName}}</span>
            <i class="el-icon-close" @click="hideData"></i>
        </div>
        <div class="containers">
            <div class="detailDiv">
                <div class="baseDiv">
                    <div class="company_name text-ell">{{showObj.companyName}}</div>
                    <div class="company_type">行业类别：{{showObj.industryType}}</div>
                    <p  class="describe text-ell">行政区：{{showObj.divisionProvince}}{{showObj.divisionArea}}</p>
                    <p  class="describe text-ell">地址：{{showObj.operationAddress}}</p>
                    <p  class="describe text-ell">排污许可证号：{{showObj.permitLicence}}</p>
                </div>
                <div class="dataConts">
                    <el-collapse v-model="activeNames" accordion>
                        <el-collapse-item title="废水排污口" name="wg" class="leftBox">
                            <div v-for="(item,key) in wgList" class="container" :key="key"  @mouseenter="showWgPoint(item)" @mouseleave="clearMap()">
                                <div class="source">
                                    <div class="content">
                                        <div class="company_name text-ell">{{item.portName}}</div>
                                        <div class="company_type">所属企业：{{item.companyName}}</div>
                                        <p  class="describe text-ell">排口地址：{{item.portAddress}}</p>
                                        <p  class="describe text-ell">排污许可证号：{{item.permitLicence}}</p>
                                        <button  type="button" class="el-button el-button--success"><span>详情</span></button>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="废气排污口" name="ww" class="leftBox">
                            <div v-for="(item,key) in wwList" class="container" :key="key"  @mouseenter="showWwPoint(item)" @mouseleave="clearMap()">
                                <div class="source">
                                    <div class="content">
                                        <div class="company_name text-ell">{{item.portName}}</div>
                                        <div class="company_type">所属企业：{{item.companyName}}</div>
                                        <p  class="describe text-ell">排口地址：{{item.portAddress}}</p>
                                        <p  class="describe text-ell">排污许可证号：{{item.permitLicence}}</p>
                                        <button  type="button" class="el-button el-button--success"><span>详情</span></button>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="行政处罚" name="xxcf" class="leftBox">
                            <div v-for="(item,key) in xxcfList" class="container" :key="key"  @mouseenter="showWgPoint(item)" @mouseleave="clearMap()">
                                <div class="source">
                                    <div class="content">
                                        <div class="company_name text-ell">{{item.portName}}</div>
                                        <div class="company_type">所属企业：{{item.companyName}}</div>
                                        <p  class="describe text-ell">排口地址：{{item.portAddress}}</p>
                                        <p  class="describe text-ell">排污许可证号：{{item.permitLicence}}</p>
                                        <button  type="button" class="el-button el-button--success"><span>详情</span></button>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="环境信访" name="xf" class="leftBox">
                            <div v-for="(item,key) in xfList" class="container" :key="key"  @mouseenter="showWwPoint(item)" @mouseleave="clearMap()">
                                <div class="source">
                                    <div class="content">
                                        <div class="company_name text-ell">{{item.portName}}</div>
                                        <div class="company_type">所属企业：{{item.companyName}}</div>
                                        <p  class="describe text-ell">排口地址：{{item.portAddress}}</p>
                                        <p  class="describe text-ell">排污许可证号：{{item.permitLicence}}</p>
                                        <button  type="button" class="el-button el-button--success"><span>详情</span></button>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>


        </div>

        <div class="timeDatas">
            <ul>
                <li v-for="(item,key) in resultList" :key="key" >
                    <span>{{item.itemName}}</span>
                    <span>{{item.value}}</span>
                    <span class="recordTime">{{item.recordTime}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import appCfg from "@config/AppCfg"
    export default {
        name: "timeContainer",
        data(){
            return{
                showResult:false,
                showName:"",
                activeNames:"",
                showObj:{},
                searchVal:"",
                resultList:[],
                wgList:[],
                wwList:[],
                xfList:[],
                xxcfList:[]
            }
        },
        methods:{
            searchData(id,type){
                console.log(id,type);
                if(type == "stphour"){//普通站小时数据
                    this.searchSttpHour(id);
                }else if(type == "stpmine"){//普通站分钟数据
                    this.searchSttpMine(id);
                }
                this.showResult = true;
            },
            hideData(){
                this.showResult = false;
                this.$parent.setDataShow();
            },
            setShowObj(obj,type){
                this.showObj = obj;
                this.showResult = true;
                if(type == "factory"){
                    this.showName = obj.companyName;
                    this.queryFactoryData(obj.dataId);
                }else if(type == "mine"){
                    this.showName = obj.enterpriseName;
                }
            },
            queryFactoryData(dataId){
                let body = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "field":"T_Poms_GasOutlet.company",
                            "match":"equal",
                            "value":dataId,//普通站
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
                    this.wwList = list;
                });
                this.$axios({
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f73768e6501737696cc1e0021?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    let list = res.data.data.list;
                    this.wgList = list;
                });
                let xfbody = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "field":"companyId",
                            "match":"equal",
                            "value":dataId,
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
                }
                this.$axios({
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f738f38bf017390247cbf035d?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: xfbody,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    let list = res.data.data.list;
                    this.xxcfList = list;
                });
            },
            searchSttpHour(stationId){
                let body = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "field":"stationId",
                            "match":"equal",
                            "value":stationId,
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
                        "field": "recordTime",
                        "order": "ASC"
                    }
                };
                this.$axios({
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f73768e65017376b7df800042?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {

                    let list = res.data.data.list;
                    this.resultList = list;
                    console.log(list);
                })
            },
            searchSttpMine(stationId){
                let body = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "field":"stationId",
                            "match":"equal",
                            "value":"104746",//stationId,
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
                        "field": "recordTime",
                        "order": "ASC"
                    }
                };
                this.$axios({
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f73768e65017376b73fcf003f?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {

                    let list = res.data.data.list;
                    this.resultList = list;
                    console.log(list);
                })
            }
        }
    }
</script>

<style scoped>
    .dataTimeDiv {
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
        font-size: 13px;
    }
    .etitle i {
        float: right;
        margin-top: 8px;
        font-size: 16px;
        cursor: pointer;
    }
    .timeDatas{
        height: calc(100% - 35px);
        overflow: auto;
    }
    .timeDatas ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .timeDatas ul li {
        display: flex;
        height: 25px;
        line-height: 25px;
        padding: 0 10px;
    }
    .timeDatas ul li span {
        display: inline-block;
        width: 30%;
    }
    .recordTime {
        width: 140px !important;
    }

    .baseDiv {
        cursor: pointer;
        padding: 10px 20px;
        margin: 0;
        -webkit-box-shadow: inset 0 -1px 0 0 hsla(0,0%,98%,.2);
        box-shadow: inset 0 -1px 0 0 hsla(0,0%,98%,.2);
        background-color: rgba(255, 255, 255, 0.17);
    }
    .company_name {
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
    .baseDiv .company_address, .baseDiv .company_type{
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
</style>