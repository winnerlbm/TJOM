<template>
    <div class="dataTimeDiv" v-show="showResult">
        <div class="etitle">
            <span>{{showName}}</span>
            <i class="el-icon-close" @click="hideData"></i>
        </div>
        <div class="containers">
            <div class="detailDiv" v-if="showType=='factory'">
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
            <div class="detailDiv" v-if="showType=='mine'">
                <div class="baseDiv">
                    <div class="company_name text-ell">{{showObj.enterpriseName}}</div>
                    <div class="company_type">行业类别：{{showObj.industryType}}</div>
                    <p  class="describe text-ell">排污许可证号：{{showObj.permitLicence}}</p>
                </div>
                <div class="dataConts">

                </div>
            </div>
            <div class="detailDiv" v-if="showType=='ww'">
                <div class="baseDiv">
                    <div class="company_name text-ell">{{showObj.enterpriseName}}</div>
                    <div class="company_type">行业类别：{{showObj.industryType}}</div>
                    <p  class="describe text-ell">排污许可证号：{{showObj.permitLicence}}</p>
                </div>
                <div class="dataConts">

                </div>
            </div>
            <div class="detailDiv" v-if="showType=='wg'">
                <div class="baseDiv">
                    <div class="company_name text-ell">{{showObj.enterpriseName}}</div>
                    <div class="company_type">行业类别：{{showObj.industryType}}</div>
                    <p  class="describe text-ell">排污许可证号：{{showObj.permitLicence}}</p>
                </div>
                <div class="dataConts">

                </div>
            </div>
            <div class="detailDiv" v-if="showType=='sttp'">
                <div class="baseDiv">
                    <div class="company_name text-ell">{{showObj.stationName}}</div>
                    <div class="company_type">测站类型：{{showObj.stationType=='1'?'常规监测站':'传感器监测站'}}</div>
                    <p  class="describe text-ell">测站地址：{{showObj.address}}</p>
                </div>
                <div class="dataConts">
                    <div class="queryDiv">
                        <div class="queryTitle">数据查询</div>
                        <div class="queryCont">
                            <div class="itime">
                                <el-date-picker
                                        v-model="stime"
                                        type="daterange"
                                        align="right"
                                        unlink-panels
                                        @change="changeStationQuery"
                                        value-format="yyyy-MM-dd"
                                        range-separator=""
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        :picker-options="pickerOptions">
                                </el-date-picker>
                            </div>
                        </div>
                        <div class="queryCont">
                            <div class="iptw-60 mgr-8">
                                <el-select v-model="queryTimeType" @change="changeStationQuery" placeholder="请选择">
                                    <el-option
                                            v-for="item in queryOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="iptw-60 mgr-8">
                                <el-select v-model="queryIndex"  @change="changeStationQuery" placeholder="请选择">
                                    <el-option
                                            v-for="item in queryIndexOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="iptw-60 mgr-8">
                                <el-select v-model="showIndex"   @change="changeShowCont" placeholder="请选择">
                                    <el-option
                                            v-for="item in showIndexOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="timeDatas">
                        <div class="tables" v-show="showIndex==1">
                            <ul class="ulTitle">
                                <li>
                                    <span class="ename">监测因子</span>
                                    <span class="eval">监测值</span>
                                    <span class="etime">监测时间</span>
                                </li>
                            </ul>
                            <ul class="dataList">
                                <li v-for="(item,key) in resultList" :key="key" >
                                    <span class="ename">{{item.itemName}}</span>
                                    <span class="eval">{{item.value==null?'-':parseFloat(item.value).toFixed(3)}}</span>
                                    <span class="etime">{{item.recordTime}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="echarts" v-show="showIndex==2">
                            <div id="linechart">

                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
                showType:"",
                resultList:[],
                wgList:[],
                wwList:[],
                xfList:[],
                xxcfList:[],
                queryTimeType:"1",
                queryOptions: [{
                    value: '1',
                    label: '分钟'
                }, {
                    value: '2',
                    label: '小时'
                }],
                showIndex:"2",
                showIndexOptions: [{
                    value: '1',
                    label: '数据表'
                }, {
                    value: '2',
                    label: '拆线图'
                }],
                queryIndex:"AQI",
                queryIndexOptions: [{
                    value: 'AQI',
                    label: 'AQI'
                },{
                    value: 'PM10',
                    label: 'PM10'
                },{
                    value: 'SO2',
                    label: '二氧化硫'
                },{
                    value: 'NO2',
                    label: '二氧化氮'
                },{
                    value: 'O3',
                    label: '臭氧'
                },{
                    value: 'CO',
                    label: '一氧化碳'
                },{
                    value: 'VOC',
                    label: '挥发性有机化合物'
                },{
                    value: 'TSP',
                    label: '总悬浮颗粒物'
                },{
                    value: 'H2S',
                    label: '硫化氢'
                },{
                    value: 'NH3',
                    label: '氨气'
                }],
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                stime:[this.initETime(7),this.initSTime()],
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
            initSTime(){
                const end = new Date();
                return this.$appUtil.formatDate("yyyy-MM-dd",end);
            },
            initETime(day){
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * day);
                return this.$appUtil.formatDate("yyyy-MM-dd",start);
            },
            hideData(){
                this.showResult = false;
                this.$parent.setDataShow();
            },
            setShowObj(obj,type){
                this.showObj = obj;
                this.showResult = true;
                this.showType = type;
                if(type == "factory"){
                    this.showName = obj.companyName;
                    this.queryFactoryData(obj.dataId);
                }else if(type == "mine"){
                    this.showName = obj.enterpriseName;
                }else if(type == "ww"){
                    this.showName = obj.portName;
                }else if(type == "wg"){
                    this.showName = obj.portName;
                }else if(type == "sttp"){
                    this.showName = obj.stationName;
                    this.changeStationQuery();
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
            searchSttpHour(stationId,stime,column){
                let body = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "field":"stationId",
                            "match":"equal",
                            "value":stationId
                        },
                        {
                            "operator":"AND",
                            "match":"range",
                            "field":"recordTime",
                            "value":"",
                            "maxValue":stime[1],
                            "minValue":stime[0]
                        },
                        {
                            "operator":"AND",
                            "match":"equal",
                            "field":"itemName",
                            "value":column
                        }
                    ],
                    "page":{
                        "pageable": false,
                        "currentPage": 1,
                        "pageSize": 10
                    },
                    "sort":{
                        "field": "recordTime",
                        "order": "DESC"
                    }
                };
                this.$loadUtil.showLoading();
                this.$axios({
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f73768e65017376b7df800042?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    this.$loadUtil.hideLoading();
                    let list = res.data.data.list;
                    if(list.length == 0){
                        this.$message("未查询到相关数据！");
                        return;
                    }
                    let obj = {};
                    obj = this.queryIndexOptions.find((item)=>{
                        return item.value === this.queryIndex;
                    });
                    let itemName =  obj.label;
                    this.resultList = [];
                    for(let i=0;i<list.length;i++){
                        list[i].itemName = itemName;
                    }
                    this.resultList = list;
                    this.changeShowCont();
                })
            },
            searchSttpMine(stationId,stime,column){
                let body = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "field":"stationId",
                            "match":"equal",
                            "value":stationId
                        },
                        {
                            "operator":"AND",
                            "match":"range",
                            "field":"recordTime",
                            "value":"",
                            "maxValue":stime[1],
                            "minValue":stime[0]
                        }
                    ],
                    "page":{
                        "pageable": false,
                        "currentPage": 1,
                        "pageSize": 10
                    },
                    "sort":{
                        "field": "recordTime",
                        "order": "DESC"
                    }
                };
                this.$loadUtil.showLoading();
                this.$axios({
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f73768e65017376b73fcf003f?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    this.$loadUtil.hideLoading();
                    let list = res.data.data.list;

                    if(list.length == 0){
                        this.$message("未查询到相关数据！");
                        return;
                    }
                    let obj = {};
                    obj = this.queryIndexOptions.find((item)=>{
                        return item.value === this.queryIndex;
                    });
                    let itemName =  obj.label;
                    this.resultList = [];
                    for(let i=0;i<list.length;i++){
                        list[i].itemName = itemName;
                        list[i].value = list[i][this.queryIndex];
                    }
                    this.resultList = list;
                    this.changeShowCont();
                })
            },
            changeStationQuery(){
                if(this.queryTimeType == 2){
                    this.searchSttpHour(this.showObj.stationId,this.stime,this.queryIndex);
                }else{
                    this.searchSttpMine(this.showObj.stationId,this.stime,this.queryIndex);
                }
            },
            changeShowCont(){
                if(this.showIndex == 2){
                    let list = this.resultList;
                    let xdata = [];
                    let ydata = [];
                    let chartObj = {};
                    for(let i=0;i<list.length;i++){
                        xdata.push(list[i].recordTime);
                        let yda = list[i].value==null?0:parseFloat(list[i].value).toFixed(3);
                        ydata.push(yda);
                    }
                    chartObj.xdata = xdata;
                    chartObj.ydata = ydata;
                    this.createLintChart(chartObj);
                }
            },
            createLintChart(chartObj){
                let lineChart = this.$charts.init(document.getElementById('linechart'));
                lineChart.clear();
                lineChart.setOption({
                    color: ['#51B1E6', '#51B1E6'],
                    title: {
                        text: '监测因子变化趋势',
                        top: '2',
                        left: '10',
                        textStyle: {
                            fontSize: '13',
                            color: '#F1EAEC'
                        }
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {
                            type : 'shadow'
                        }
                    },
                    grid: {
                        left: '2%',
                        right: '2%',
                        top: '20%',
                        bottom: '2%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            axisLabel: {
                                rotate: '0',
                                textStyle: {
                                    color:'#ffffff'
                                }
                            },
                            name: '',
                            axisLine: {
                                lineStyle:{
                                    color:'#ffffff',
                                    width: '1'
                                },
                            },
                            nameLocation: 'end',
                            nameTextStyle: {
                                color: '#ffffff'
                            },
                            data : chartObj.xdata
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            splitLine: {
                                lineStyle: {
                                    color: '#ffffff',
                                }
                            },
                            axisLabel: {
                                textStyle: {
                                    color:'#ffffff'
                                }
                            },
                        }
                    ],
                    series : [
                        {
                            name:'监测值',
                            type:'line',
                            data:chartObj.ydata
                        }
                    ]
                });
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
        z-index: 999;
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
    .dataConts {
        height:calc(100% - 100px);
    }
    .timeDatas{
        height: calc(100% - 75px);
        overflow: auto;
        overflow-x: hidden;
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
    .containers {
        height: calc(100% - 35px);
        overflow: auto;
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
    .queryCont {
        display: flex;
        padding: 0 15px;
    }
    .detailDiv {
        height: 100%;
    }
    .queryTitle {
        height: 25px;
        line-height: 25px;
        text-align: left;
        padding-left: 15px;
        font-size: 13px;
        color: #ccc;
    }
    .iptw-60 .el-select, .iptw-60 .el-select>.el-input {
        width: 86px;
    }

    .mgr-8 {
        margin-right: 5px;
    }
    .itime {
        width: 100%;
        margin: 8px 0;
    }
    .queryCont >>>.el-input__inner {
        color: #fff;
        background-color: hsla(0,0%,98%,.2);
        border-radius: 14px;
        border: 0;
        height: 24px;
        font-size: 13px;
        width: 100%;
    }
    .queryCont >>>.el-input__icon, .queryCont >>>.el-range-separator {
        display: -webkit-box;
        display: -ms-flexbox;
        -js-display: flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        color: #fff;
    }
    .queryCont >>>.el-range-input {
        background: transparent;
        color: #fff;
    }

    .timeDatas li {
        display: flex;
        height: 25px;
        line-height: 25px;
        padding: 0 10px;
        width: 100%;
    }
    .ulTitle,.dataList {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .ulTitle {
        border-bottom: 1.5px solid #17244d;
        padding: 2px;
        background-color: #2b3136;
        margin-top: 10px;
        display: flex;
    }
    .timeDatas li span {
        display: inline-block;
        width: 25%;
    }

    .timeDatas li .ename{
        min-width: 30%;
        overflow: hidden;
    }
    .timeDatas li .eval{
        min-width: 20%;
        width: auto;
    }
    .timeDatas li .etime {
        width: 120px !important;
    }
    #linechart {
        width: 100%;
        height: 260px;
    }
</style>