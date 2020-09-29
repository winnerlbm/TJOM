<template>
    <div class="dataConDiv" v-show="showConts">
        <div class="etitle">
            <span>数据详情</span>
           <!-- <i class="el-icon-close" @click="hideData"></i>-->
        </div>
        <div class="apiDatas">
            <el-collapse v-model="activeNames" accordion>
                <el-collapse-item :title="'所有企业数据('+factoryList.length+')'" name="factory" class="leftBox" v-show="facShow">
                    <div v-for="(item,key) in factoryList" class="container public" :key="key"  @click="zoomToMap(item,'factory')"  @mouseenter="showMapPoint(item)" @mouseleave="clearMap()">
                        <div class="source">
                            <div class="content">
                                <div class="company_name text-ell">{{item.companyName}}</div>
                                <!--div class="company_type">行业类别：{{item.industryTypeName}}</div>
                                <p  class="describe text-ell">{{item.operationAddress}}</p-->
                                <p  class="describe text-ell">排污许可证号：{{item.permitLicence}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="nodata" v-if="factoryList.length==0">
                       <span>未查询到相关数据</span>
                    </div>
                </el-collapse-item>
                <el-collapse-item :title="'在线监控企业数据('+wryFacList.length+')'" name="wryFac" class="leftBox" v-show="wryFacShow">
                    <div v-for="(item,key) in wryFacList" class="container" :key="key"  @click="zoomToMap(item,'wryFac')"  @mouseenter="showMapPoint(item)" @mouseleave="clearMap()">
                        <div class="source">
                            <div class="content">
                                <div class="company_name text-ell">{{item.companyName}}</div>
                                <!--div class="company_type">行业类别：{{item.industryTypeName}}</div>
                                <p  class="describe text-ell">{{item.operationAddress}}</p-->
                                <p  class="describe text-ell">排污许可证号：{{item.permitLicence}}</p>
                               
                            </div>
                        </div>
                    </div>
                    <div class="nodata" v-if="wryFacList.length==0">
                       <span>未查询到相关数据</span>
                    </div>
                </el-collapse-item>
                <el-collapse-item :title="'环境管理清单数据('+menuList.length+')'" name="menulist" class="leftBox" v-show="menuShow">
                    <div v-for="(item,key) in menuList" class="container" :key="key"  @click="zoomToMap(item,'menulist')"  @mouseenter="showMapPoint(item)" @mouseleave="clearMap()">
                        <div class="source">
                            <div class="content">
                                <div class="company_name text-ell">{{item.companyName}}</div>
                                <div class="company_type" v-if="item.templateName!=null">清单名称：{{item.templateName}}</div>
                                <!--p  class="describe text-ell">{{item.divisionProvince}}{{item.divisionArea}}</p>
                                <p  class="describe text-ell">{{item.operationAddress}}</p-->
                                <p  class="describe text-ell">排污许可证号：{{item.permitLicence}}</p>
                                
                            </div>
                        </div>
                    </div>
                    <div class="nodata" v-if="menuList.length==0">
                        <span>未查询到相关数据</span>
                    </div>
                </el-collapse-item>
                <el-collapse-item :title="'工况监测企业数据('+mineList.length+')'" name="mine" class="leftBox" v-show="mineShow"  >
                    <div v-for="(item,key) in mineList" class="container" :key="key"   @click="zoomToMap(item,'mine')" @mouseenter="showMinePoint(item)" @mouseleave="clearMap()">
                        <div class="source">
                            <div class="content">
                                <div class="company_name text-ell">{{item.enterpriseName}}</div>
                                <!--div class="company_type">行业类别：{{item.industryTypeName}}</div-->
                                <p  class="describe text-ell">地址：{{item.address}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="nodata" v-if="mineList.length==0">
                        <span>未查询到相关数据</span>
                    </div>
                </el-collapse-item>
                <el-collapse-item :title="'废气排污口数据('+wgList.length+')'" name="wg" class="leftBox" v-show="wgShow">
                    <div v-for="(item,key) in wgList" class="container" :key="key"  @click="zoomToMap(item,'wg')"  @mouseenter="showWgPoint(item)" @mouseleave="clearMap()">
                        <div class="source">
                            <div class="content">
                                <div class="company_name text-ell">{{item.portName}}</div>
                                <div class="company_type">所属企业：{{item.companyName}}</div>
                                <p  class="describe text-ell">排口地址：{{item.portAddress}}</p>
                                <p  class="describe text-ell">排污许可证号：{{item.permitLicence}}</p>
                               <!-- <button  type="button" class="el-button el-button&#45;&#45;success"  @click="zoomToMap(item,'wg')"><span>详情</span></button>-->
                            </div>
                        </div>
                    </div>
                    <div class="nodata" v-if="wgList.length==0">
                        <span>未查询到相关数据</span>
                    </div>
                </el-collapse-item>
                <el-collapse-item :title="'废水排污口数据('+wwList.length+')'" name="ww" class="leftBox" v-show="wwShow">
                    <div v-for="(item,key) in wwList" class="container" :key="key"  @click="zoomToMap(item,'ww')"  @mouseenter="showWwPoint(item)" @mouseleave="clearMap()">
                        <div class="source">
                            <div class="content">
                                <div class="company_name text-ell">{{item.portName}}</div>
                                <div class="company_type">所属企业：{{item.companyName}}</div>
                                <p  class="describe text-ell">排口地址：{{item.portAddress}}</p>
                                <p  class="describe text-ell">排污许可证号：{{item.permitLicence}}</p>
                                <!--<button  type="button" class="el-button el-button&#45;&#45;success"  @click="zoomToMap(item,'ww')"><span>详情</span></button>-->
                            </div>
                        </div>
                    </div>
                    <div class="nodata" v-if="wwList.length==0">
                        <span>未查询到相关数据</span>
                    </div>
                </el-collapse-item>
                <el-collapse-item :title="'常规监测站数据('+normalList.length+')'" name="sttp_normal" class="leftBox" v-show="normalShow">
                    <div class="queryCont">
                        <div class="iptw-130 mgr-8">
                            <span>空气质量指标：</span>
                            <el-select v-model="queryNorIndex"  @change="changeStationQuery('sttp_normal')" placeholder="请选择">
                                <el-option
                                        v-for="item in queryIndexOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="tableDiv">
                        <table  class="table table-wrapper" id="editTable">
                          <thead>
                            <tr>
                              <th>排名</th>
                              <th class="tabname">站点</th>
                              <th>{{queryNorIndex}}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr  v-for="(item,key) in normalList"   @click="zoomToMap(item,'sttp_normal')" @mouseenter="showNormalPoint(item)" @mouseleave="clearMap()" >
                              <td class="tabindex">{{key+1}}</td>
                              <td class="tabname">{{item.stationName}}</td>
                              <td class="tabvalue"><span :class=[getLevelCls(item)]>{{item.value}}</span></td>
                            </tr>
                          </tbody>
                        </table>
                    </div>

                    <!--div v-for="(item,key) in normalList" class="container" :key="key" @click="zoomToMap(item,'sttp_normal')"  @mouseenter="showNormalPoint(item)" @mouseleave="clearMap()">
                        <div class="source">
                            <div class="content">
                                <div class="company_name text-ell">{{item.stationName}}</div>
                                <div class="company_type">测站类型：{{item.stationType=='1'?'常规监测站':'传感器监测站'}}</div>
                                <p  class="describe text-ell">测站地址：{{item.portAddress}}</p>
                               
                            </div>
                        </div>
                    </div>
                    <div class="nodata" v-if="normalList.length==0">
                        <span>未查询到相关数据</span>
                    </div-->
                </el-collapse-item>
                <el-collapse-item :title="'微站数据('+wzList.length+')'" name="sttp_wz" class="leftBox" v-show="wzShow">
                    <div class="queryCont">
                        <div class="iptw-130 mgr-8">
                            <span>空气质量指标：</span>
                            <el-select v-model="queryWzIndex"  @change="changeStationQuery('sttp_wz')" placeholder="请选择">
                                <el-option
                                        v-for="item in queryIndexOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="tableDiv">
                        <table  class="table table-wrapper" id="editTable">
                          <thead>
                            <tr>
                              <th>排名</th>
                              <th class="tabname">站点</th>
                              <th>{{queryWzIndex}}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr  v-for="(item,key) in wzList"   @click="zoomToMap(item,'sttp_wz')" @mouseenter="showWzPoint(item)" @mouseleave="clearMap()" >
                              <td class="tabindex">{{key+1}}</td>

                              <td class="tabname" :title="item.pointName">
                                <el-tooltip class="item" effect="dark" :content="item.stationName" placement="top">
                                   <span>{{item.stationName}}</span>
                                </el-tooltip>
                              </td>
                              <td class="tabvalue"><span :class=[getLevelCls(item)]>{{item.value}}</span></td>
                            </tr>
                          </tbody>
                        </table>
                    </div>

                    
                </el-collapse-item>
                <el-collapse-item :title="'空气质量监测站数据('+allList.length+')'" name="sttp_all" class="leftBox" v-show="allShow">
                    <!--div class="queryCont">
                        <div class="iptw-130 mgr-8">
                            <span>空气质量指标：</span>
                            <el-select v-model="querySkIndex"  @change="changeStationQuery('sttp_all')" placeholder="请选择">
                                <el-option
                                        v-for="item in queryIndexOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="tableDiv">
                        <table  class="table table-wrapper" id="editTable">
                          <thead>
                            <tr>
                              <th>排名</th>
                              <th class="tabname">站点</th>
                              <th>{{querySkIndex}}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr  v-for="(item,key) in allList"   @click="zoomToMap(item,'sttp_all')" >
                              <td class="tabindex">{{key+1}}</td>
                              <td class="tabname" :title="item.pointName">
                                <el-tooltip class="item" effect="dark" :content="item.pointName" placement="top">
                                   {{item.pointName}}
                                </el-tooltip>
                              </td>
                              <td class="tabvalue"><span>110</span></td>
                            </tr>
                          </tbody>
                        </table>
                    </div-->
                    <div v-for="(item,key) in allList" class="container" :key="key"  @click="zoomToMap(item,'sttp_all')"  @mouseenter="showGKZPoint(item)" @mouseleave="clearMap()">
                        <div class="source">
                            <div class="content">
                                <div class="company_name text-ell">{{item.pointName}}</div>
                                <div class="company_type">测站类型：{{item.manageLevelName}}</div>
                                <p  class="describe text-ell">测站地址：{{item.address}}</p>
                               
                            </div>
                        </div>
                    </div>
                    <div class="nodata" v-if="allList.length==0">
                        <span>未查询到相关数据</span>
                    </div>
                </el-collapse-item>
                <el-collapse-item :title="'国控监测站数据('+gkList.length+')'" name="sttp_gk" class="leftBox" v-show="gkShow">
                    <div v-for="(item,key) in gkList" class="container" :key="key" @click="zoomToMap(item,'sttp_gk')"  @mouseenter="showGKZPoint(item)" @mouseleave="clearMap()">
                        <div class="source">
                            <div class="content">
                                <div class="company_name text-ell">{{item.pointName}}</div>
                                <div class="company_type">测站类型：{{item.manageLevelName}}</div>
                                <p  class="describe text-ell">测站地址：{{item.address}}</p>
                               <!-- <button  type="button" class="el-button el-button&#45;&#45;success"  @click="zoomToMap(item,'sttp_gk')"><span>详情</span></button>-->
                            </div>
                        </div>
                    </div>
                    <div class="nodata" v-if="gkList.length==0">
                        <span>未查询到相关数据</span>
                    </div>
                </el-collapse-item>
                <el-collapse-item :title="'省控监测站数据('+skList.length+')'" name="sttp_sk" class="leftBox" v-show="skShow">
                    <div v-for="(item,key) in skList" class="container" :key="key"  @click="zoomToMap(item,'sttp_sk')"  @mouseenter="showGKZPoint(item)" @mouseleave="clearMap()">
                        <div class="source">
                            <div class="content">
                                <div class="company_name text-ell">{{item.pointName}}</div>
                                <div class="company_type">测站类型：{{item.manageLevelName}}</div>
                                <p  class="describe text-ell">测站地址：{{item.address}}</p>
                                <!--<button  type="button" class="el-button el-button&#45;&#45;success"  @click="zoomToMap(item,'sttp_sk')"><span>详情</span></button>-->
                            </div>
                        </div>
                    </div>
                    <div class="nodata" v-if="skList.length==0">
                        <span>未查询到相关数据</span>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="环境信访热力图数据" name="hjxf" class="leftBox" v-show="hjxfShow">
                    <div class="queryCont">
                        <div class="itime">
                            <el-date-picker
                                    v-model="stime"
                                    type="datetimerange"
                                    align="right"
                                    unlink-panels
                                    @change="changeHjxfQuery"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    range-separator=""
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    >
                            </el-date-picker>
                        </div>
                    </div>
                    <div v-for="(item,key) in hjxfList" class="container" :key="key"  @click="showHjxf(item)">
                        <div class="source">
                            <div class="content">
                                <div class="company_name text-ell">{{validNullStr(item.companyName)}}</div>
                                <div class="company_type">信访次数：{{item.indexValue}}个</div>
                            </div>
                        </div>
                    </div>
                    <div class="nodata" v-if="hjxfList.length==0">
                        <span>未查询到相关数据</span>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="行政处罚热力图数据" name="xzcf" class="leftBox" v-show="xzcfShow">
                    <div class="queryCont">
                        <div class="itime">
                            <el-date-picker
                                    v-model="stime"
                                    type="datetimerange"
                                    align="right"
                                    unlink-panels
                                    @change="changeXzcfQuery"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    range-separator=""
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                            >
                            </el-date-picker>
                        </div>
                    </div>
                    <div v-for="(item,key) in xzcfList" class="container" :key="key" @click="showXzcf(item)">
                        <div class="source">
                            <div class="content">
                                <div class="company_name text-ell">{{validNullStr(item.companyName)}}</div>
                                <div class="company_type">处罚次数：{{item.indexValue}}个</div>
                            </div>
                        </div>
                    </div>
                    <div class="nodata" v-if="xzcfList.length==0">
                        <span>未查询到相关数据</span>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="废水排口超标热力图数据" name="fspk" class="leftBox" v-show="fspkShow">
                    <div class="queryCont">
                        <div class="itime">
                            <el-date-picker
                                    v-model="stime"
                                    type="datetimerange"
                                    align="right"
                                    unlink-panels
                                    @change="changeFspkQuery"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    range-separator=""
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                            >
                            </el-date-picker>
                        </div>
                    </div>
                    <div v-for="(item,key) in fspkList" class="container" :key="key" @click="queryCB(item)" >
                        <div class="source">
                            <div class="content">
                                <div class="company_name text-ell">排口：{{validNullStr(item.portName)}}</div>
                                <div class="company_name text-ell">企业：{{validNullStr(item.companyName)}}</div>
                                <div class="company_type">超标数量：{{item.indexValue}}个</div>
                            </div>
                        </div>
                    </div>
                    <div class="nodata" v-if="fspkList.length==0">
                        <span>未查询到相关数据</span>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="废气排口超标热力图数据" name="fqpk" class="leftBox" v-show="fqpkShow">
                    <div class="queryCont">
                        <div class="itime">
                            <el-date-picker
                                    v-model="stime"
                                    type="datetimerange"
                                    align="right"
                                    unlink-panels
                                    @change="changeFqpkQuery"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    range-separator=""
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                            >
                            </el-date-picker>
                        </div>
                    </div>
                    <div v-for="(item,key) in fqpkList" class="container" :key="key"  @click="queryCB(item)">
                        <div class="source">
                            <div class="content">
                                <div class="company_name text-ell">排口：{{validNullStr(item.portName)}}</div>
                                <div class="company_name text-ell">企业：{{validNullStr(item.companyName)}}</div>
                                <div class="company_type">超标数量：{{item.indexValue}}个</div>
                            </div>
                        </div>
                    </div>
                    <div class="nodata" v-if="fqpkList.length==0">
                        <span>未查询到相关数据</span>
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
                wryFacList:[],
                menuList:[],
                mineList:[],
                wwList:[],
                wgList:[],
                normalList:[],
                wzList:[],
                gkList:[],
                skList:[],
                allList:[],
                hjxfList:[],
                xzcfList:[],
                fqpkList:[],
                fspkList:[],
                facShow:false,
                wryFacShow:false,
                menuShow:false,
                mineShow:false,
                wwShow:false,
                wgShow:false,
                normalShow:false,
                wzShow:false,
                skShow:false,
                gkShow:false,
                allShow:false,
                hjxfShow:false,
                xzcfShow:false,
                fspkShow:false,
                fqpkShow:false,
                temLayer:null,
                stime:[this.initETime(30),this.initSTime()],
                queryNorIndex:"AQI",
                queryWzIndex:"AQI",
                queryGkIndex:"AQI",
                querySkIndex:"AQI",
                queryIndexOptions: [{
                    value: 'AQI',
                    label: 'AQI'
                },{
                    value: 'PM2_5',
                    label: 'PM2.5'
                },{
                    value: 'PM10',
                    label: 'PM10'
                },{
                    value: 'SO2',
                    label: 'SO2'
                },{
                    value: 'NO2',
                    label: 'NO2'
                },{
                    value: 'O3',
                    label: 'O3'
                },{
                    value: 'CO',
                    label: 'CO'
                }]
            }
        },
        mounted(){

        },
        methods:{
            initSTime(){
                const end = new Date();
                return this.$appUtil.formatDate("yyyy-MM-dd HH:ff:ss",end);
            },
            initETime(day){
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * day);
                return this.$appUtil.formatDate("yyyy-MM-dd HH:ff:ss",start);
            },
            resetTime(){
                this.stime = [this.initETime(30),this.initSTime()];
            },
            initDraw(){
                this.temLayer = L.layerGroup();
                this.$mapUtil.lMap.addLayer(this.temLayer);
            },
            showData() {
                if(!this.mineShow&&!this.facShow&&!this.wwShow&&!this.wgShow&&!this.normalShow&&!this.wzShow&&!this.gkShow&&!this.skShow&&!this.allShow&&!this.hjxfShow&&!this.xzcfShow&&!this.fspkShow&&!this.fqpkShow&&!this.menuShow&&!this.wryFacShow){
                    this.showConts = false;
                }else{
                    this.showConts = true;
                }
            },
            hideData(){
                this.showConts = false;
            },
            showMapPoint(item){
                let wzIcon = require("../../assets/image/map/factory.png");
                this.temLayer.clearLayers();
                let model = item;
               // model.longitude =  this.DegreeConvertBack(item.lngDegree,item.lngMinute,item.lngSecond);
               // model.latitude = this.DegreeConvertBack(item.latDegree,item.latMinute,item.latSecond);
                let marker = this.$mapUtil.createPointMarker(model,wzIcon);
                if(marker) {
                    this.temLayer.addLayer(marker);
                    marker.bindTooltip(item.companyName, {
                        direction: 'top',
                        offset: [7, -10]
                    }).openTooltip();
                }
            },
            showMinePoint(item){
                let wzIcon = require("../../assets/image/map/mine.png");
                this.temLayer.clearLayers();
                let marker = this.$mapUtil.createPointMarker(item,wzIcon);
                if(marker) {
                    this.temLayer.addLayer(marker);
                    marker.bindTooltip(item.enterpriseName, {
                        direction: 'top',
                        offset: [7, -10]
                    }).openTooltip();
                }
            },
            showWwPoint(item){
                let wzIcon = require("../../assets/image/map/wry_water.png");
                this.temLayer.clearLayers();
                let marker = this.$mapUtil.createPointMarker(item,wzIcon);
                if(marker){
                    this.temLayer.addLayer(marker);
                    marker.bindTooltip(item.portName,{
                        direction:'top',
                        offset:[7,-10]
                    }).openTooltip();
                }
            },
            showWgPoint(item){
                let wzIcon = require("../../assets/image/map/wry_air.png");
                this.temLayer.clearLayers();
                let marker = this.$mapUtil.createPointMarker(item,wzIcon);
                if(marker){
                    this.temLayer.addLayer(marker);
                    marker.bindTooltip(item.portName,{
                        direction:'top',
                        offset:[7,-10]
                    }).openTooltip();
                }
            },
            showNormalPoint(item){
                let wzIcon = require("../../assets/image/map/normal.png");
                this.temLayer.clearLayers();
                let marker = this.$mapUtil.createPointMarkerByLgnt(item,wzIcon);
                if(marker) {
                    this.temLayer.addLayer(marker);
                    marker.bindTooltip(item.stationName, {
                        direction: 'top',
                        offset: [7, -10]
                    }).openTooltip();
                }
            },
            showGKZPoint(item){
                let wzIcon = require("../../assets/image/map/sttp_gk.png");
                this.temLayer.clearLayers();
                let marker = this.$mapUtil.createPointMarker(item,wzIcon);
                if(marker) {
                    this.temLayer.addLayer(marker);
                    marker.bindTooltip(item.pointName, {
                        direction: 'top',
                        offset: [7, -10]
                    }).openTooltip();
                }
            },
            showWzPoint(item){
                let wzIcon = require("../../assets/image/map/wz.png");
                this.temLayer.clearLayers();
                let marker = this.$mapUtil.createPointMarkerByLgnt(item,wzIcon);
                if(marker) {
                    this.temLayer.addLayer(marker);
                    marker.bindTooltip(item.stationName, {
                        direction: 'top',
                        offset: [7, -10]
                    }).openTooltip();
                }
            },
            clearMap(){
                this.temLayer.clearLayers();
            },
            DegreeConvertBack(deg,min,sec){ ///<summary>度分秒转换成为度</summary>
                return Math.abs(deg) + (Math.abs(min)/60 + Math.abs(sec)/3600);
            },
            zoomToMap(item,type){
                let model =item;

                if(type == "factory"|| type == "wryFac"||type == "menulist"){
                    if(item.latitude&&item.longitude&&item.latitude!=""&&item.longitude!=""&&item.latitude!="null"&&item.longitude!="null"){
                        this.$mapUtil.lMap.flyTo([model.latitude,model.longitude],16,{animate:false});
                        let layerGroup = this.$mapUtil.getTempLayer(type);
                        layerGroup.eachLayer(function (layer){
                            if (layer.id === item.permitLicence){
                                layer.openPopup();
                            }
                        });
                    }
                    type = "factory";
                }else if(type == "mine") {
                    if(item.latitude&&item.longitude&&item.latitude!=""&&item.longitude!=""&&item.latitude!="null"&&item.longitude!="null"){
                        this.$mapUtil.lMap.flyTo([item.latitude, item.longitude], 16,{ animate:false});
                        let layerGroup = this.$mapUtil.getTempLayer(type);
                        layerGroup.eachLayer(function (layer){
                            if (layer.id === item.permitLicence){
                                layer.openPopup();
                            }
                        });
                    }
                }else if(type == "sttp_normal"||type == "sttp_wz") {
                    if(item.lat&&item.lng){
                        this.$mapUtil.lMap.flyTo([item.lat, item.lng], 16,{ animate:false});
                        let layerGroup = this.$mapUtil.getTempLayer(type);
                        layerGroup.eachLayer(function (layer){
                            if (layer.id === item.stationId){
                                layer.openPopup();
                            }
                        });
                    }
                    type = "sttp";
                }else if(type == "ww"||type == "wg"){
                    if(item.latitude&&item.longitude){
                        this.$mapUtil.lMap.flyTo([item.latitude, item.longitude], 16,{ animate:false});
                        let layerGroup = this.$mapUtil.getTempLayer(type);
                        layerGroup.eachLayer(function (layer){
                            if (layer.id === item.id){
                                layer.openPopup();
                            }
                        });
                    }
                }else if(type == "sttp_gk"||type == "sttp_sk"||type == "sttp_all"){
                    if(item.latitude&&item.longitude){
                        this.$mapUtil.lMap.flyTo([item.latitude, item.longitude], 16,{ animate:false});
                        let layerGroup = this.$mapUtil.getTempLayer(type);
                        layerGroup.eachLayer(function (layer){
                            if (layer.id === item.id){
                                layer.openPopup();
                            }
                        });
                    }
                    type = "air";
                }
                this.$parent.setDetailData(item,type);
            },
            setDataList(type,list){
                this.resetTime();
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
                }else if(type == "sttp_gk"){
                    this.gkList = list;
                    this.gkShow = true;
                }else if(type == "sttp_sk"){
                    this.skList = list;
                    this.skShow = true;
                }else if(type == "sttp_all"){
                    this.allList = list;
                    this.allShow = true;
                }else if(type == "hjxf"){
                    this.hjxfList = list;
                    this.hjxfShow = true;
                }else if(type == "xzcf"){
                    this.xzcfList = list;
                    this.xzcfShow = true;
                }else if(type == "fspk"){
                    this.fspkList = list;
                    this.fspkShow = true;
                }else if(type == "fqpk"){
                    this.fqpkList = list;
                    this.fqpkShow = true;
                }else if(type == "menulist"){
                    this.menuList = list;
                    this.menuShow = true;
                }else if(type == "wryFac"){
                    this.wryFacList = list;
                    this.wryFacShow = true;
                }
                if(!this.showConts){
                    this.showConts = true;
                }
            },
            removeDataList(type){
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
                }else if(type == "sttp_gk"){
                    this.gkList = [];
                    this.gkShow = false;
                }else if(type == "sttp_sk"){
                    this.skList = [];
                    this.skShow = false;
                }else if(type == "sttp_all"){
                    this.allList = [];
                    this.allShow = false;
                }else if(type == "hjxf"){
                    this.hjxfList = [];
                    this.hjxfShow = false;
                }else if(type == "xzcf"){
                    this.xzcfList = [];
                    this.xzcfShow = false;
                }else if(type == "fspk"){
                    this.fspkList = [];
                    this.fspkShow = false;
                }else if(type == "fqpk"){
                    this.fqpkList = [];
                    this.fqpkShow = false;
                }else if(type == "menulist"){
                    this.menuList = [];
                    this.menuShow = false;
                }else if(type == "wryFac"){
                    this.wryFacList = [];
                    this.wryFacShow = false;
                }
                if(!this.mineShow&&!this.facShow&&!this.wwShow&&!this.wgShow&&!this.normalShow&&!this.wzShow&&!this.gkShow&&!this.skShow&&!this.allShow&&!this.hjxfShow&&!this.xzcfShow&&!this.fspkShow&&!this.fqpkShow&&!this.menuShow&&!this.wryFacShow){
                    this.showConts = false;
                }
                if(!this.normalShow&&!this.wzShow&&!this.gkShow&&!this.skShow&&!this.allShow){
                    this.$parent.setAirIndex(false);
                }
            },
            changeHjxfQuery(){
                this.$parent.queryHjxfData("hjxf",this.stime[0],this.stime[1])
            },
            changeXzcfQuery(){
                this.$parent.queryXzcfData("xzcf",this.stime[0],this.stime[1])
            },
            changeFspkQuery(){
                this.$parent.queryFspkData("fspk",this.stime[0],this.stime[1])
            },
            changeFqpkQuery(){
                this.$parent.queryFqpkData("fqpk",this.stime[0],this.stime[1])
            },
            showXzcf(item){
                this.$parent.setDetailData(item,"xzcf",this.stime);
            },
            showHjxf(item){
                this.$parent.setDetailData(item,"hjxf",this.stime);
            },
            queryCB(item){
                this.$parent.queryCBdata(item,this.stime[0],this.stime[1])
            },
            changeStationQuery(type){
                this.$mapUtil.removeTemLayer(type);
                if(type == "sttp_normal"){
                    this.$parent.getSttpData(type,"1",this.queryNorIndex);
                }else if(type == "sttp_wz"){
                    this.$parent.getSttpData(type,"2",this.queryWzIndex);
                }else if(type == "sttp_all"){
                    this.$parent.getSttpData(type,"2",this.queryWzIndex);
                }
            },
            getLevelCls(item){
                return "level_"+item.level;
            },
            validNullStr(str){
                if(str!=null&&str!="null"){
                    return str;
                }
                return "-";
            }
        }
    }
</script>

<style scoped>
    .dataConDiv {
        position: absolute;
        top: 125px;
        left: 10px;
        width: 305px;
        z-index: 999;
        border-radius: 3px;
        background-color: rgba(0, 34, 68, 0.83);
        color: #fff;
        height: calc(100% - 205px);
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
    .apiDatas{
        height: calc(100% - 35px);
        overflow: auto;
    }
    .leftBox >>>.el-collapse {
        border-top: 1.5px solid #3765a7;
        border-bottom: 0px solid #EBEEF5;
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
        font-size: 13px;
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
        border-top: 1.5px solid #27508a;
        border-bottom: 0px solid #EBEEF5;
    }
    .container {
        cursor: pointer;
        padding: 10px 20px;
        margin: 0;
        -webkit-box-shadow: 0px 1px 10px #087dce inset;
        box-shadow: 0px 1px 10px #087dce inset;
        background-size: 2px 16px, 16px 2px, 2px 16px, 16px 2px;
        margin: 5px;
        background-color: rgba(33, 150, 243, 0.15);
    }
    .container:hover {
        background-color: rgba(33, 150, 243, 0.45);
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
        font-size: 13px;
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
        color: #fff;
        text-align: left;
    }
    .describe {
        color: #fff;
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
    .queryCont {
        padding: 5px;
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
    .itime {
        width: 95%;
        text-align: center;
        margin-left: 10px;
    }
    .iptw-130 {
        text-align:left;
        padding:5px 10px;
    }
    .iptw-130 .el-select, .iptw-130 .el-select>.el-input {
        width: 130px;
    }
    .nodata {
        font-size: 14px;
        padding: 5px;
        color: #ef1313;
        font-weight: 600;
    }

    .tableDiv >>>.el-table thead tr {
        background-color: #242630;
    }
    .tableDiv >>>.el-table tbody tr {
        background-color: #000;
        color:#fff;
        cursor: pointer;
        font-size:13px;
        text-align:center;

    }
    .tableDiv >>>.el-table tr:hover {
        background-color: #000;
    }
    .tableDiv >>>.el-table td, .tableDiv >>>.el-table th {
        padding: 3px 0; 
        min-width: 0;
        box-sizing: border-box;
        text-overflow: ellipsis;
        vertical-align: middle;
        position: relative;
        text-align:center;
        border:none;
        color:#fff;
        font-size:13px;
    }
    /******************琛ㄦ牸鍖哄煙*******************/
    .tableDiv {
        height: auto;
        overflow-y: auto;
        border: none;
        padding-top: 5px;
        border-top: none;
    }
    #editTable {
        width: 100%;
    }
    /* Border styles */
    .table-wrapper thead, .table-wrapper tr {
       border-top: none;
       height: 30px;
       cursor:pointer;
    }
    .table-wrapper {
        width: 100%;
        border-collapse: collapse;
    }

    /* Padding and font style */
    .table-wrapper td, .table-wrapper th {
        padding: 5px 10px;
        font-size: 12px;
        text-align: center;
        font-family: Verdana;
        color: #fff;
        border: none !important;
        max-width: 400px;
        white-space: nowrap;
    }
    .table-wrapper th {
        background-color: #00255A;
        height: 20px;
        font-weight: 500;
        color: #fff;
        font-size: 13px;
    }
    .table-wrapper th:first-child {
        border-left: none;
    }
    /* Alternating background colors */
    .table-wrapper tr:nth-child(even) {
        background: transparent;
    }
    .table-wrapper tr:nth-child(odd) {
        background: transparent;
    }
    .tabname{
       max-width: 150px !important;
       overflow: hidden;
    }
    .tabvalue span {
        display: inline-block;
        border-radius: 10px;
        padding: 0px 8px;
        background-color: #FF9902;
        font-size: 12px;
        width: 40px;
    }
    .tabvalue span.level_0{
        background-color: #00E400;
    }
    .tabvalue span.level_1{
        background-color: #00E400;
    }
    .tabvalue span.level_2{
        background-color: #FFF600;
        color:#000;
    }
    .tabvalue span.level_3{
        background-color: #FF5F00;
    }
    .tabvalue span.level_4{
        background-color: #FF0011;
    }
    .tabvalue span.level_5{
        background-color: #9A004C;
    }
    .tabvalue span.level_6{
        background-color: #7E0023;
    }
</style>