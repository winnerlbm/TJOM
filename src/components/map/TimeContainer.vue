<template>
    <div class="dataTimeDiv" v-show="showResult" v-loading="loading" element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="etitle">
            <span>{{validNullStr(showName)}}</span>
            <img src="../../assets/image/back.png"  @click="hideData">
            
        </div>
        <div class="containers" >
            <div class="detailDiv" v-if="showType=='factory'">
                <div class="baseDiv">
                    <div class="company_name text-ell">{{showObj.companyName}}</div>
                    <div class="company_type"><img class="faicon" src="@/assets/image/fa/fa-type.png"/>行业类别：{{showObj.industryType}}</div>
                    <p  class="describe text-ell"><img class="faicon" src="@/assets/image/fa/fa-code.png"/>统一社会信用代码：{{showObj.uscCode}}</p>
                    <p  class="describe text-ell"><img class="faicon" src="@/assets/image/fa/fa-lic.png"/>排污许可证号：{{showObj.permitLicence}}</p>
                    <p  class="describe text-ell"><img class="faicon" src="@/assets/image/fa/fa-law.png"/>法人代表：{{showObj.corpPerson}}</p>
                    <p  class="describe text-ell"><img class="faicon" src="@/assets/image/fa/fa-user.png"/>联系人：{{showObj.linkman}}</p>
                    <p  class="describe text-ell"><img class="faicon" src="@/assets/image/fa/fa-tel.png"/>联系电话：{{showObj.telephone}}</p>
                    <p  class="describe text-ell"><img class="faicon" src="@/assets/image/fa/fa-addr.png"/>地址：{{showObj.operationAddress}}</p>
                    <p  class="describe text-ell"><img class="faicon" src="@/assets/image/fa/fa-post.png"/>邮编：{{showObj.postCode}}</p>
                </div>
                <div class="dataConts">
                    <el-collapse v-model="activeNames" accordion>
                        <el-collapse-item v-if="wgList.length>0" :title="'废水排污口('+wgList.length+')'" name="wg" class="leftBox">
                            <div v-for="(item,key) in wgList" class="container"  @click="zoomToMap(item,'wg')" :key="key">
                                <div class="source">
                                    <div class="content">
                                        <div class="company_name text-ell">{{item.portName}}</div>
                                        <div class="company_type">所属企业：{{item.companyName}}</div>
                                        <p  class="describe text-ell">排口地址：{{item.portAddress}}</p>
                                        <p  class="describe text-ell">排污许可证号：{{item.permitLicence}}</p>
                                        <!--button  type="button" class="el-button el-button--success"   @click="zoomToMap(item,'wg')"><span>详情</span></button-->
                                    </div>
                                </div>
                            </div>
                            <div class="nodata" v-if="wgList.length==0">
                                <span>未查询到相关数据</span>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item v-if="wwList.length>0" :title="'废气排污口('+wwList.length+')'" name="ww" class="leftBox">
                            <div v-for="(item,key) in wwList" class="container"  @click="zoomToMap(item,'ww')" :key="key">
                                <div class="source">
                                    <div class="content">
                                        <div class="company_name text-ell">{{item.portName}}</div>
                                        <div class="company_type">所属企业：{{item.companyName}}</div>
                                        <p  class="describe text-ell">排口地址：{{item.portAddress}}</p>
                                        <p  class="describe text-ell">排污许可证号：{{item.permitLicence}}</p>
                                        <!--button  type="button" class="el-button el-button--success"   @click="zoomToMap(item,'ww')"><span>详情</span></button-->
                                    </div>
                                </div>
                            </div>
                            <div class="nodata" v-if="wwList.length==0">
                                <span>未查询到相关数据</span>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item v-if="xzcfList.length>0" :title="'行政处罚('+xzcfList.length+')'" name="xzcf" class="leftBox">
                            <div v-for="(item,key) in xzcfList" class="container" :key="key" >
                                <div class="source">
                                    <div class="content">
                                        <div class="company_name text-ell">{{item.caseReason}}</div>
                                        <p  class="describe text-ell">案件来源：{{item.caseSourceName}}</p>
                                        <p  class="describe text-ell">立案时间：{{item.filingTime}}</p>
                                        <p  class="describe text-ell">案件状态：{{item.currentNode}}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="nodata" v-if="xzcfList.length==0">
                                <span>未查询到相关数据</span>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item v-if="xfList.length>0" :title="'环境信访('+xfList.length+')'" name="xf" class="leftBox">
                            <div v-for="(item,key) in xfList" class="container" :key="key">
                                <div class="source">
                                    <div class="content">
                                        <div class="company_name text-ell">{{item.companyName}}</div>

                                        <p  class="describe text-ell">案件来源：{{item.sourceName}}</p>
                                        <p  class="describe text-ell">创建时间：{{item.createTime}}</p>
                                        <p  class="describe text-ell">案件状态：{{item.currentNode}}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="nodata" v-if="xfList.length==0">
                                <span>未查询到相关数据</span>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
            <div class="detailDiv" v-if="showType=='mineprop'">
                <div class="baseDiv">
                    <div class="company_name text-ell">{{showObj.enterpriseName}}</div>
                    <div class="company_type">行业类别：{{showObj.industryType}}</div>
                    <p  class="describe text-ell">排污许可证号：{{showObj.permitLicence}}</p>
                </div>
                <div class="dataConts">
                    <div v-for="(item,key) in lineList" class="container" :key="key"   @click="showMineline(item,'mineprop')">
                        <div class="source">
                            <div class="content">
                                <div class="company_name text-ell">{{item.productLineName}}</div>
                                <div class="company_type">所属企业：{{item.enterpriseName}}</div>
                                <p  class="describe text-ell">地址：{{item.address}}</p>
                                <p  class="describe text-ell">排污许可证号：{{item.permitLicence}}</p>
                               <!-- <button  type="button" class="el-button el-button&#45;&#45;success"   @click="showMineline(item,'mineprop')"><span>详情</span></button>-->
                            </div>
                        </div>
                    </div>
                    <div class="nodata" v-if="lineList.length==0">
                        <span>未查询到相关数据</span>
                    </div>
                </div>
            </div>
            <div class="detailDiv" v-if="showType=='mineline'">
                <div class="baseDiv">
                    <div class="company_name text-ell">{{showObj.productLineName}}</div>
                    <div class="company_type">所属企业：{{showObj.enterpriseName}}</div>
                    <p  class="describe text-ell">排污许可证号：{{showObj.permitLicence}}</p>
                </div>
                <div class="dataConts">
                    <div v-for="(item,key) in propList" class="container" :key="key"    @click="showMineline(item,'mineprop')">
                        <div class="source">
                            <div class="content">
                                <div class="company_name text-ell">{{item.deviceName}}</div>
                                <div class="company_type">所属企业：{{showObj.enterpriseName}}</div>
                                <p  class="describe text-ell">地址：{{showObj.address}}</p>
                                <!--<button  type="button" class="el-button el-button&#45;&#45;success"   @click="showMineline(item,'mineprop')"><span>详情</span></button>-->
                            </div>
                        </div>
                    </div>
                    <div class="nodata" v-if="propList.length==0">
                        <span>未查询到相关数据</span>
                    </div>
                </div>
            </div>
            <div class="detailDiv" v-if="showType=='ww'">
                <div :class="currentCls">
                    <div class="eleft">
                        <div class="company_name text-ell">{{showObj.portName}}</div>
                        <div class="company_type">所属企业：{{showObj.companyName}}</div>
                        <p  class="describe text-ell">排口地址：{{showObj.portAddress}}</p>
                    </div>
                    <div class="eright">
                        <div class="indexName">{{newData.indexName}}</div>
                        <div class="indexVal">{{newData.indexVal==null?'-':parseFloat(newData.indexVal).toFixed(3)}}</div>
                        <div class="indexTime">{{newData.indexTime}}</div>
                    </div>
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
                                        @change="changeWryQuery('ww')"
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
                                <el-select v-model="queryWryTimeType" @change="changeWryQuery('ww')" placeholder="请选择">
                                    <el-option
                                            v-for="item in queryWryOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="iptw-60 mgr-8">
                                <el-select v-model="queryWryIndex"  @change="changeWryQuery('ww')" placeholder="请选择">
                                    <el-option
                                            v-for="item in queryWryIndexOptions"
                                            :key="item.columnCode"
                                            :label="item.pollutantName"
                                            :value="item.columnCode">
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
                                    <span class="ename">监测状态</span>
                                    <span class="eval">监测值</span>
                                    <span class="etime">监测时间</span>
                                </li>
                            </ul>
                            <ul class="dataList">
                                <li v-for="(item,key) in resultList" :key="key" >
                                    <span class="ename">{{item.status}}</span>
                                    <span class="eval">{{item.value==null?'-':parseFloat(item.value).toFixed(3)}}</span>
                                    <span class="etime">{{item.recordTime}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="echarts" v-show="showIndex==2">
                            <div id="linewwchart">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="detailDiv" v-if="showType=='wg'">
                <div :class="currentCls">
                    <div class="eleft">
                        <div class="company_name text-ell">{{showObj.portName}}</div>
                        <div class="company_type">所属企业：{{showObj.companyName}}</div>
                        <p  class="describe text-ell">排口地址：{{showObj.portAddress}}</p>
                    </div>
                    <div class="eright">
                        <div class="indexName">{{newData.indexName}}</div>
                        <div class="indexVal">{{newData.indexVal==null?'-':parseFloat(newData.indexVal).toFixed(3)}}</div>
                        <div class="indexTime">{{newData.indexTime}}</div>
                    </div>
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
                                        @change="changeWryQuery('wg')"
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
                                <el-select v-model="queryWryTimeType" @change="changeWryQuery('wg')" placeholder="请选择">
                                    <el-option
                                            v-for="item in queryWryOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="iptw-60 mgr-8">
                                <el-select v-model="queryWryIndex"  @change="changeWryQuery('wg')" placeholder="请选择">
                                    <el-option
                                            v-for="item in queryWryIndexOptions"
                                            :key="item.columnCode"
                                            :label="item.pollutantName"
                                            :value="item.columnCode">
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
                                    <span class="ename">监测状态</span>
                                    <span class="eval">监测值</span>
                                    <span class="etime">监测时间</span>
                                </li>
                            </ul>
                            <ul class="dataList">
                                <li v-for="(item,key) in resultList" :key="key" >
                                    <span class="ename">{{item.status}}</span>
                                    <span class="eval">{{item.value==null?'-':parseFloat(item.value).toFixed(3)}}</span>
                                    <span class="etime">{{item.recordTime}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="echarts" v-show="showIndex==2">
                            <div id="linewgchart">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="detailDiv" v-if="showType=='sttp'">
                <div :class="currentCls">
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
                                    <span class="ename">监测状态</span>
                                    <span class="eval">监测值</span>
                                    <span class="etime">监测时间</span>
                                </li>
                            </ul>
                            <ul class="dataList">
                                <li v-for="(item,key) in resultList" :key="key" >
                                    <span class="ename">{{item.status}}</span>
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
            <div class="detailDiv" v-if="showType=='air'">
                <div :class="currentCls">
                    <div class="eleft">
                        <div class="company_name text-ell">{{showObj.pointName}}</div>
                        <div class="company_type">测站类型：{{showObj.manageLevelName}}</div>
                        <p  class="describe text-ell">测站地址：{{showObj.address}}</p>
                    </div>
                    <div class="eright">
                        <div class="indexName">{{newData.indexName}}</div>
                        <div class="indexVal">{{newData.indexVal==null?'-':parseFloat(newData.indexVal).toFixed(3)}}</div>
                        <div class="indexTime">{{newData.indexTime}}</div>
                    </div>
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
                                        @change="changeAirQuery"
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
                                <el-select v-model="queryAirTimeType" @change="changeAirQuery" placeholder="请选择">
                                    <el-option
                                            v-for="item in queryAirOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="iptw-60 mgr-8">
                                <el-select v-model="queryAirIndex"  @change="changeAirQuery" placeholder="请选择">
                                    <el-option
                                            v-for="item in queryAirIndexOptions"
                                            :key="item.columnCode"
                                            :label="item.name"
                                            :value="item.columnCode">
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
                                    <span class="ename">空气质量</span>
                                    <span class="eval">监测值</span>
                                    <span class="etime">监测时间</span>
                                </li>
                            </ul>
                            <ul class="dataList">
                                <li v-for="(item,key) in resultList" :key="key" >
                                    <span class="ename">{{item.status}}</span>
                                    <span class="eval">{{item.value==null?'-':parseFloat(item.value).toFixed(3)}}</span>
                                    <span class="etime">{{item.recordTime}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="echarts" v-show="showIndex==2">
                            <div id="lineairchart">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="detailDiv" v-if="showType=='mine'">
                <div class="baseDiv">
                    <div class="company_name text-ell">{{showObj.enterpriseName}}</div>
                    <div class="company_type">企业地址：{{showObj.address}}</div>
                    <p  class="describe text-ell">排污许可证号：{{showObj.permitLicence}}</p>
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
                                        @change="changeMineQuery"
                                        value-format="yyyy-MM-dd"
                                        range-separator=""
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        :picker-options="pickerOptions">
                                </el-date-picker>
                            </div>
                        </div>
                        <div class="queryCont">
                            <div class="iptw-80 mgr-8">
                                <el-select v-model="queryFacMineIndex"  @change="changeFacMineQuery()" placeholder="请选择">
                                    <el-option
                                            v-for="item in queryFacMineOptions"
                                            :key="item.productLineNo"
                                            :label="item.productLineName"
                                            :value="item.productLineNo">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="iptw-80 mgr-8">
                                <el-select v-model="queryLineIndex"  @change="changeMineQuery()" placeholder="请选择">
                                    <el-option
                                            v-for="item in queryLineOptions"
                                            :key="item.deviceId"
                                            :label="item.deviceName"
                                            :value="item.deviceId">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="queryCont">
                            <div class="iptw-80 mgr-8">
                                <el-select v-model="queryMineTimeType" @change="changeMineQuery" placeholder="请选择">
                                    <el-option
                                            v-for="item in queryMineOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>

                            <div class="iptw-80 mgr-8">
                                <el-select v-model="showIndex"   @change="changeMineShowCont" placeholder="请选择">
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
                    <div class="timeDatas" v-show="queryMineTimeType=='1'">
                        <div class="tables" v-show="showIndex==1">
                            <ul class="ulTitle">
                                <li>
                                    <span class="ename">序号</span>
                                    <span class="eval">监测值</span>
                                    <span class="etime">监测时间</span>
                                </li>
                            </ul>
                            <ul class="dataList">
                                <li v-for="(item,key) in resultList" :key="key" >
                                    <span class="ename">{{key}}</span>
                                    <span class="eval">{{item.dataValue==null?'-':parseFloat(item.dataValue).toFixed(3)}}</span>
                                    <span class="etime">{{item.dataTime}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="echarts" v-show="showIndex==2">
                            <div id="lineminechart">

                            </div>
                        </div>
                    </div>
                    <div class="timeDatas" v-show="queryMineTimeType!='1'">
                        <div class="tables" v-show="showIndex==1">
                            <ul class="ulTitle">
                                <li>
                                    <span class="eval">最大值</span>
                                    <span class="eval">最小值</span>
                                    <span class="eval">平均值</span>
                                    <span class="etime">监测时间</span>
                                </li>
                            </ul>
                            <ul class="dataList">
                                <li v-for="(item,key) in resultList" :key="key" >
                                    <span class="eval2">{{item.maxValue==null?'-':parseFloat(item.maxValue).toFixed(2)}}</span>
                                    <span class="eval2">{{item.minValue==null?'-':parseFloat(item.minValue).toFixed(2)}}</span>
                                    <span class="eval2">{{item.avgValue==null?'-':parseFloat(item.avgValue).toFixed(2)}}</span>
                                    <span class="etime">{{item.dataTime}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="echarts" v-show="showIndex==2">
                            <div id="linedaychart">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="detailDiv" v-if="showType=='xzcf'">
                <!--div class="baseDiv">
                    <div class="company_name text-ell">{{showObj.companyName}}</div>
                    <p  class="describe text-ell">排污许可证号：{{showObj.permitLicence}}</p>
                </div-->
                <div class="dataConts">
                    <div v-for="(item,key) in xzcfList" class="container" :key="key" >
                        <div class="source">
                            <div class="content">
                                <div class="company_name text-ell">案由：{{item.caseReason}}</div>
                                <p  class="describe text-ell">案件来源：{{item.caseSourceName}}</p>
                                <p  class="describe text-ell">立案时间：{{item.filingTime}}</p>
                                <p  class="describe text-ell">案件状态：{{item.currentNode}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="nodata" v-if="xzcfList.length==0">
                        <span>未查询到相关数据</span>
                    </div>
                </div>
            </div>
            <div class="detailDiv" v-if="showType=='hjxf'">
                <!--div class="baseDiv">
                    <div class="company_name text-ell">{{showObj.companyName}}</div>
                    <p  class="describe text-ell">排污许可证号：{{showObj.permitLicence}}</p>
                </div-->
                <div class="dataConts">
                    <div v-for="(item,key) in xfList" class="container" :key="key">
                        <div class="source">
                            <div class="content">
                                <div class="company_name text-ell">编号名称：{{item.petitionNoName}}</div>
                                <p  class="describe text-ell">案件分类：{{item.classifyName}}</p>
                                <p  class="describe text-ell">案件来源：{{item.sourceName}}</p>
                                <p  class="describe text-ell">创建时间：{{item.createTime}}</p>
                                <p  class="describe text-ell">案件状态：{{item.currentNode}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="nodata" v-if="xfList.length==0">
                        <span>未查询到相关数据</span>
                    </div>
                </div>
            </div>
            <div class="detailDiv" v-if="showType=='cbxq'">
                <!--div class="baseDiv">
                    <div class="company_name text-ell">{{showObj.companyName}}</div>
                    <p  class="describe text-ell">排污许可证号：{{showObj.permitLicence}}</p>
                </div-->
                <div class="dataConts">
                    <div v-for="(item,key) in cbList" class="container" :key="key">
                        <div class="source">
                            <div class="content">
                                <div class="company_name text-ell">排口名称：{{item.nodeName}}</div>
                                <p  class="describe">超标详情：{{item.alarmInfo}}</p>
                                <p  class="describe text-ell">报警代码：{{item.code}}</p>
                                <p  class="describe text-ell">报警时间：{{item.alarmTime}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="nodata" v-if="cbList.length==0">
                        <span>未查询到相关数据</span>
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
                backParent:false,//是否返回上级
                loading:false,
                newData:{},
                showName:"",
                currentCls:"baseDiv",
                formatStr:"mm月dd日",
                activeNames:"",
                activeMineNames:"mineline",
                activeMineLineNames:"mineprop",
                lineList:[],
                propList:[],
                showObj:{},
                searchVal:"",
                showType:"",
                resultList:[],
                wgList:[],
                wwList:[],
                xfList:[],
                xzcfList:[],
                cbList:[],
                queryTimeType:"1",
                queryOptions: [{
                    value: '1',
                    label: '分钟'
                }, {
                    value: '2',
                    label: '小时'
                }],
                queryWryTimeType:"3",
                queryWryOptions: [{
                    value: '1',
                    label: '分钟'
                }, {
                    value: '2',
                    label: '小时'
                }, {
                    value: '3',
                    label: '天'
                }],
                queryMineTimeType:"3",
                queryMineOptions: [{
                    value: '1',
                    label: '分钟'
                }, {
                    value: '2',
                    label: '小时'
                }, {
                    value: '3',
                    label: '天'
                }],
                queryAirTimeType:"3",
                queryAirOptions: [{
                    value: '1',
                    label: '分钟'
                }, {
                    value: '2',
                    label: '小时'
                }, {
                    value: '3',
                    label: '天'
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
                queryWryIndex:'',
                queryWryIndexOptions:[],
                queryLineOptions:[],
                queryLineIndex:'',
                queryFacMineIndex:'',
                queryFacMineOptions:[],
                queryAirIndex:'',
                queryAirIndexOptions:[],
                chartDOM:"linechart"
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
                if(this.backParent){
                    this.showType = "factory";
                }else{
                    this.showResult = false;
                    this.$parent.setDataShow();
                }
                this.backParent = false;
            },
            setShowObj(obj,type){
                this.showObj = obj;
                this.showResult = true;
                this.showType = type;
                this.resultList = [];
                this.currentCls = "baseDiv";
                this.newData = {};
                if(type == "factory"){
                    this.showName = obj.companyName;
                    this.queryFactoryData(obj.companyName);
                    this.queryFactoryXZData(obj.companyName);
                }else if(type == "wryFac"){
                    this.showName = obj.companyName;
                    this.queryFactoryData(obj.companyName);
                    this.queryFactoryXZData(obj.companyName);
                }else if(type == "mine"){
                    this.showName = obj.enterpriseName;
                    this.queryMineData(obj.enterpriseNo);
                    this.chartDOM = "lineminechart";
                }else if(type == "ww"){//废水
                    this.showName = obj.portName;
                    this.chartDOM = "linewwchart";
                    this.getWrgIndexOptions(obj.id,type);
                }else if(type == "wg"){//废气
                    this.showName = obj.portName;
                    this.chartDOM = "linewgchart";
                    this.getWrgIndexOptions(obj.id,type);
                }else if(type == "sttp"){
                    this.showName = obj.stationName;
                    this.chartDOM = "linechart";
                    this.changeStationQuery();
                }else if(type == "air"){
                    this.showName = obj.pointName;
                    this.chartDOM = "lineairchart";
                    this.getAirIndexOptions(obj.id);
                }else if(type == "mineline"){
                    this.showName = obj.productLineName;
                    this.queryLineData(obj.productLineNo);
                    this.chartDOM = "lineminechart";
                }else if(type == "mineprop"){
                    this.showName = obj.productLineName;
                    this.chartDOM = "lineminechart";
                    this.queryLineData(obj.productLineNo);
                }else if(type == "xzcf"){
                    this.showName = obj.companyName;
                    this.queryXzcf(obj.permitLicence);
                }else if(type == "hjxf"){
                    this.showName = obj.companyName;
                    this.queryHjxf(obj.permitLicence);
                }else if(type == "cbxq"){
                     this.showName = obj.companyName;
                }
            },
            queryFactoryData(companyname){
                let body = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "field":"companyName",
                            "match":"equal",
                            "value":companyname,
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
                    this.wwList = list;
                    if(list.length>0){
                        this.activeNames = "ww";
                    }
                });
                this.$axios({
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f73768e6501737696cc1e0021?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    let list = res.data.data.list;
                    this.wgList = list;
                    if(list.length>0){
                        this.activeNames = "wg";
                    }
                });

            },
            queryFactoryXZData(companyname){
                let xzcfbody = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "field":"companyName",
                            "match":"equal",
                            "value":companyname,
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
                        "field": "filingTime",
                        "order": "DESC"
                    }
                };

                this.$axios({
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f738f38bf017390247cbf035d?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: xzcfbody,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    let list = res.data.data.list;
                    this.xzcfList = list;
                    if(list.length>0){
                        this.activeNames = "xzcf";
                    }
                });

                let xfbody = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "field":"companyName",
                            "match":"equal",
                            "value":companyname,
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
                        "field": "createTime",
                        "order": "DESC"
                    }
                };

                this.$axios({
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f738f38bf01739024196c035a?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: xfbody,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    let list = res.data.data.list;
                    this.xfList = list;
                    if(list.length>0){
                        this.activeNames = "xf";
                    }
                });
            },
            queryMineData(enterpriseNo){
                let body = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "field":"T_Knt_ProductLine.enterpriseNo",
                            "match":"equal",
                            "value":enterpriseNo,
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
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f73768e6501737afbac58009f?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    let list = res.data.data.list;
                    if(list.length>0){
                        this.queryFacMineOptions = list;
                        this.queryFacMineIndex = list[0].productLineNo;
                        this.queryLineData(list[0].productLineNo);
                    }else{
                        this.$message.error("未查询到企业生产线数据");
                    }
                });
            },
            changeFacMineQuery(){
                this.queryLineData(this.queryFacMineIndex);
            },
            queryLineData(productLineNo){
                let body = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "field":"productLineNo",
                            "match":"equal",
                            "value":productLineNo,
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
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f73768e6501737b00ab1000b0?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    let list = res.data.data.list;
                    if(list.length>0){
                        this.queryLineOptions = list;
                        this.queryLineIndex = list[0].deviceId;
                        this.changeMineQuery()
                    }else{
                        this.$message.error("未查询到企业生产线设备数据");
                    }
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
                this.loading = true;
                this.$axios({
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f73768e65017376b7df800042?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    this.loading = false;
                    let list = res.data.data.list;
                    if(list.length == 0){
                        this.$message.error("未查询到相关数据！");
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
                        list[i].status = this.getLevel(list[i].level);
                    }
                    this.currentCls = this.getLevelCls(list[0].level);
                    this.resultList = list;
                    this.changeShowCont();
                })
            },
            getLevel(level){
                if(level==1){
                    return "优";
                }else if(level == 2){
                    return "良";
                }else if(level == 3){
                    return "轻度污染";
                }else if(level == 4){
                    return "中度污染";
                }else if(level == 5){
                    return "重度污染";
                }else if(level == 6){
                    return "严重污染";
                }else{
                    return "-";
                }
            },
            getLevelCls(level){
                if(level==1){
                    return "sucDiv";
                }else if(level == 2){
                    return "goodDiv";
                }else if(level == 3){
                    return "warnDiv";
                }else if(level == 4){
                    return "errDiv";
                }else if(level == 5){
                    return "errDiv";
                }else if(level == 6){
                    return "errDiv";
                }else{
                    return "baseDiv";
                }
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
                this.loading = true;
                this.$axios({
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f73768e65017376b73fcf003f?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    this.loading = false;
                    let list = res.data.data.list;

                    if(list.length == 0){
                        this.$message.error("未查询到相关数据！");
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
                        list[i].status = this.getIndexStatus(list[i][this.queryIndex+"_FLAG"]);
                        list[i].value = list[i][this.queryIndex];
                    }
                    this.currentCls = this.getIndexCls(list[0][this.queryIndex+"_FLAG"]);
                    this.resultList = list;
                    this.changeShowCont("linechart");
                })
            },
            changeStationQuery(){
                if(this.queryTimeType == 2){
                    this.formatStr = "hh时ff时";
                    this.searchSttpHour(this.showObj.stationId,this.stime,this.queryIndex);
                }else{
                    this.formatStr = "dd日hh时";
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
                        let dtime = this.$appUtil.formatDate(this.formatStr,new Date(list[i].recordTime));
                        xdata.push(dtime);
                        let yda = list[i].value==null?0:parseFloat(list[i].value).toFixed(3);
                        ydata.push(yda);
                    }
                    chartObj.xdata = xdata;
                    chartObj.ydata = ydata;
                    this.createLintChart(chartObj);
                }
            },
            createLintChart(chartObj){
                let lineChart = this.$charts.init(document.getElementById(this.chartDOM));
                lineChart.resize();
                lineChart.clear();
                lineChart.setOption({
                    color: ['#51B1E6', '#51B1E6'],
                    title: {
                        text: '监测数据变化趋势',
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
            },
            getWrgIndexOptions(nodeId,type){
                let body = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "field":"nodeId",
                            "match":"equal",
                            "value":nodeId,//查询因子
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
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f73768e650173769bb3c40024?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    let list = res.data.data.list;
                    if(list.length>0){
                        this.queryWryIndexOptions = list;
                        this.queryWryIndex = list[0].columnCode;
                        this.changeWryQuery(type);
                    }else{
                        this.$message.error("未查询到该排口监测因子！");
                    }
                });
            },
            changeWryQuery(type){
                if(type == "ww"){
                    this.searchWwData(this.showObj.id,this.stime,this.queryWryTimeType);
                }else if(type == "wg"){
                    this.searchWgData(this.showObj.id,this.stime,this.queryWryTimeType);
                }
            },
            searchWgData(stationId,stime,type){
                let apiUk = "";
                let filed = "";
                if(type == 1){
                    apiUk = "2c9a818f73768e65017376b526a50036";
                    filed = "T_Poms_GasOutlet.id";
                    this.formatStr = "hh时ff分";
                }else if(type == 2){
                    apiUk = "2c9a818f73768e65017376b3ad710030";
                    filed = "T_Poms_GasOutlet.id";
                    this.formatStr = "dd日hh时";
                }else{
                    apiUk = "2c9a818f73768e65017376b4935d0033";
                    filed = "T_Poms_GasOutlet.id";
                    this.formatStr = "MM月dd日";
                }
                let body = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "field":filed,
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
                this.loading = true;
                this.$axios({
                    url: appCfg.map.gisApiUrl+"api/share/data/"+apiUk+"?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    this.loading = false;
                    if(res.data.code== "200"){
                        let list = res.data.data.list;
                        if(list.length == 0){
                            this.$message.error("未查询到相关数据！");
                            return;
                        }
                        let obj = {};
                        obj = this.queryWryIndexOptions.find((item)=>{
                            return item.columnCode === this.queryWryIndex;
                        });
                        let itemName =  obj.pollutantName;
                        this.resultList = [];
                        for(let i=0;i<list.length;i++){
                            list[i].itemName = itemName;
                            list[i].status = this.getIndexStatus(list[i][this.queryWryIndex+"_FLAG"]);
                            list[i].value = list[i][this.queryWryIndex];
                            list[i].recordTime = this.$appUtil.formatDate("yyyy-MM-dd HH:ff:ss",new Date(list[i].recordTime))
                        }
                        this.currentCls = this.getIndexCls(list[0][this.queryWryIndex+"_FLAG"]);
                        this.newData = {
                            indexName:itemName,
                            indexVal:list[0][this.queryWryIndex],
                            indexTime:list[0].recordTime
                        };
                        this.resultList = list;
                        this.changeShowCont();
                    }
                })
            },
            searchWwData(stationId,stime,type){
                let apiUk = "";
                let filed = "";
                if(type == 1){
                    apiUk = "2c9a818f73768e65017376b2f8a9002d";
                    filed = "T_Poms_WaterOutlet.id";
                    this.formatStr = "hh时ff分";
                }else if(type == 2){
                    apiUk = "2c9a818f73768e65017376b1e8cc0027";
                    filed = "T_Poms_WaterOutlet.id";
                    this.formatStr = "dd日hh时";
                }else{
                    apiUk = "2c9a818f73768e65017376b268ae002a";
                    filed = "T_Poms_WaterOutlet.id";
                    this.formatStr = "MM月dd日";
                }
                let body = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "field":filed,
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
                this.loading = true;
                this.$axios({
                    url: appCfg.map.gisApiUrl+"api/share/data/"+apiUk+"?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    this.loading = false;
                    if(res.data.code== "200"){
                        let list = res.data.data.list;
                        this.resultList = [];
                        if(list.length == 0){
                            this.$message.error("未查询到相关数据！");
                            return;
                        }
                        let obj = {};
                        obj = this.queryWryIndexOptions.find((item)=>{
                            return item.columnCode === this.queryWryIndex;
                        });
                        let itemName =  obj.pollutantName;
                        for(let i=0;i<list.length;i++){
                            list[i].itemName = itemName;
                            list[i].status = this.getIndexStatus(list[i][this.queryWryIndex+"_FLAG"]);
                            list[i].value = list[i][this.queryWryIndex];
                        }
                        this.currentCls = this.getIndexCls(list[0][this.queryWryIndex+"_FLAG"]);
                        this.resultList = list;
                        this.newData = {
                            indexName:itemName,
                            indexVal:list[0][this.queryWryIndex],
                            indexTime:list[0].recordTime
                        };
                        this.changeShowCont();
                    }
                })
            },
            getAirIndexOptions(nodeId,type){
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
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f73768e65017376ba12a0004b?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    let list = res.data.data.list;
                    if(list.length>0){
                        for(let i=0;i<list.length;i++){
                            list[i].columnCode = "F_"+list[i].columnCode;
                        }
                        this.queryAirIndexOptions = list;

                        this.queryAirIndex = list[0].columnCode;
                        this.changeAirQuery();
                    }else{
                        this.$message.error("未查询到该排口监测因子！");
                    }
                });
            },
            changeAirQuery(){
                this.searchAirData(this.showObj.id,this.stime,this.queryAirTimeType);
            },
            searchAirData(stationId,stime,type){
                let apiUk = "";
                let filed = "";
                if(type == 1){
                    apiUk = "2c9a818f73768e65017376bb0e13004e";
                    filed = "T_Aqms_Min.nodeId";
                    this.formatStr = "hh时ff分";
                }else if(type == 2){
                    apiUk = "2c9a818f73768e65017376bd2fd50054";
                    filed = "T_Aqms_Hour.nodeId";
                    this.formatStr = "dd日hh时";
                }else{
                    apiUk = "2c9a818f73768e65017376bb95470051";
                    filed = "T_Aqms_Day.nodeId";
                    this.formatStr = "MM月dd日";
                }
                let body = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "field":filed,
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
                this.loading = true;
                this.$axios({
                    url: appCfg.map.gisApiUrl+"api/share/data/"+apiUk+"?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    this.loading = false;
                    if(res.data.code== "200"){
                        let list = res.data.data.list;
                        if(list.length == 0){
                            this.$message.error("未查询到相关数据！");
                            return;
                        }
                        let obj = {};
                        obj = this.queryAirIndexOptions.find((item)=>{
                            return item.columnCode === this.queryAirIndex;
                        });
                        let itemName =  obj.name;
                        this.resultList = [];
                        for(let i=0;i<list.length;i++){
                            list[i].itemName = itemName;
                            list[i].status = this.getAirStatus(list[i][this.queryAirIndex+"_FLAG"]);
                            list[i].value = list[i][this.queryAirIndex];
                            list[i].recordTime = this.$appUtil.formatDate("yyyy-MM-dd HH:ff:ss",new Date(list[i].recordTime))
                        }
                        this.currentCls = this.getAirCls(list[0][this.queryAirIndex+"_FLAG"]);
                        this.newData = {
                            indexName:itemName,
                            indexVal:list[0][this.queryAirIndex],
                            indexTime:list[0].recordTime
                        };
                        this.resultList = list;
                        this.changeShowCont();
                    }
                })
            },
            getAirStatus(indexVal){
                if(null==indexVal){
                    return "-";
                }else if(indexVal.substring(1,3).indexOf("00")>=0){
                    return "正常";
                }else if(indexVal.substring(1,3).indexOf("01")>=0){
                    return "修约有效";
                }else if(indexVal.substring(1,3).indexOf("02")>=0){
                    return "倒挂";
                }else if(indexVal.substring(1,3).indexOf("09")>=0){
                    return "补录";
                }else if(indexVal.substring(1,3).indexOf("10")>=0){
                    return "离群";
                }else if(indexVal.substring(1,3).indexOf("14")>=0){
                    return "有效数据不足";
                }else if(indexVal.substring(1,3).indexOf("16")>=0){
                    return "连续数";
                }else if(indexVal.substring(1,3).indexOf("17")>=0){
                    return "低于下限";
                }else if(indexVal.substring(1,3).indexOf("18")>=0){
                    return "超出上限";
                }else if(indexVal.substring(1,3).indexOf("19")>=0){
                    return "修约空白";
                }else if(indexVal.substring(1,3).indexOf("20")>=0){
                    return "无效";
                }else{
                    return "无效";
                }
            },
            getAirCls(indexVal){
                if(null==indexVal){
                    return "baseDiv";
                }else if(indexVal.substring(1,3).indexOf("00")>=0){
                    return "sucDiv";
                }else if(indexVal.substring(1,3).indexOf("01")>=0){
                    return "sucDiv";
                }else if(indexVal.substring(1,3).indexOf("02")>=0){
                    return "warnDiv";
                }else if(indexVal.substring(1,3).indexOf("09")>=0){
                    return "warnDiv";
                }else if(indexVal.substring(1,3).indexOf("10")>=0){
                    return "warnDiv";
                }else if(indexVal.substring(1,3).indexOf("14")>=0){
                    return "warnDiv";
                }else if(indexVal.substring(1,3).indexOf("16")>=0){
                    return "sucDiv";
                }else if(indexVal.substring(1,3).indexOf("17")>=0){
                    return "warnDiv";
                }else if(indexVal.substring(1,3).indexOf("18")>=0){
                    return "errDiv";
                }else if(indexVal.substring(1,3).indexOf("19")>=0){
                    return "errDiv";
                }else if(indexVal.substring(1,3).indexOf("20")>=0){
                    return "errDiv";
                }else {
                    return "errDiv";
                }
            },
            getIndexStatus(indexVal){
                if(null==indexVal){
                    return "-";
                }else if(indexVal.indexOf("ZC")>=0){
                    return "正常";
                }else if(indexVal.indexOf("YC")>=0){
                    return "异常";
                }else if(indexVal.indexOf("CB")>=0){
                    return "超标";
                }else if(indexVal.indexOf("DX")>=0){
                    return "断线";
                }else if(indexVal.indexOf("TY")>=0){
                    return "停用";
                }
            },
            getIndexCls(indexVal){
                if(null==indexVal){
                    return "baseDiv";
                }else if(indexVal.indexOf("ZC")>=0){
                    return "sucDiv";
                }else if(indexVal.indexOf("YC")>=0){
                    return "errDiv";
                }else if(indexVal.indexOf("CB")>=0){
                    return "warnDiv";
                }else if(indexVal.indexOf("DX")>=0){
                    return "errDiv";
                }else if(indexVal.indexOf("TY")>=0){
                    return "warnDiv";
                }
            },
            zoomToMap(item,type){
                if(item.latitude&&item.longitude){
                    this.$mapUtil.lMap.flyTo([item.latitude, item.longitude], 16,{ animate:false});
                    let layerGroup = this.$mapUtil.getTempLayer(type);
                    layerGroup.eachLayer(function (layer){
                        if (layer.id === item.id){
                            layer.openPopup();
                        }
                    });
                }
                this.setShowObj(item,type);
                this.backParent = true;
            },
            createLineHtml(model){
                let html = [];
                html.push('<div class="popuDiv"><span>生产线：</span>'+model.productLineName+'</div>');
                html.push('<div class="popuDiv"><span>公司名称：</span>'+model.enterpriseName+'</div>');
                html.push('<div class="popuDiv"><span>地址：</span>'+model.address+'</div>');
                html.push('<div class="popuDiv"><span>排污许可证：</span>'+model.permitLicence+'</div>');
                html.push('<div class="poputools">');
                html.push('<button onclick="getMineTime('+JSON.stringify(model).replace(/"/g, '&quot;')+',\'mineline\')">详情</button>');
                html.push('</div>');
                return html.join('');
            },
            showMineline(item,type){
                this.setShowObj(item,type);
            },
            changeMineQuery(){
                if(this.queryMineTimeType == "1"){
                    this.formatStr = "hh时ff分";
                    this.searchMineData(this.queryLineIndex,this.stime);
                }else{
                    this.searchDayAndHour(this.queryLineIndex,this.stime)
                }
            },
            searchMineData(id,stime){
                let body = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "field":"deviceId",
                            "match":"equal",
                            "value":id
                        },
                        {
                            "operator":"AND",
                            "match":"range",
                            "field":"dataTime",
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
                        "field": "dataTime",
                        "order": "DESC"
                    }
                };
                this.loading = true;
                this.$axios({
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f73768e6501737b02822e00b6?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    this.loading = false;
                    let list = res.data.data.list;
                    if(list.length == 0){
                        this.$message.error("未查询到相关数据！");
                        return;
                    }
                    this.resultList = list;
                    this.changeMineShowCont("lineminechart");
                })
            },
            searchDayAndHour(id,stime){
                if(this.queryMineTimeType==2){
                    this.formatStr = "dd日hh时";
                }else{
                    this.formatStr = "MM月dd日";
                }
                let body = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "field":"deviceId",
                            "match":"equal",
                            "value":id
                        },
                        {
                            "operator":"AND",
                            "field":"timeType",
                            "match":"equal",
                            "value":this.queryMineTimeType
                        },

                        {
                            "operator":"AND",
                            "match":"range",
                            "field":"dataTime",
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
                        "field": "dataTime",
                        "order": "DESC"
                    }
                };
                this.loading = true;
                this.$axios({
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f73768e6501737b019dfc00b3?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    this.loading = false;
                    let list = res.data.data.list;
                    if(list.length == 0){
                        this.$message.error("未查询到相关数据！");
                        return;
                    }
                    this.resultList = list;
                    this.changeMineShowCont();
                })
            },
            changeMineShowCont(){
                if(this.showIndex == 2&&this.queryMineTimeType=="1"){
                    let list = this.resultList;
                    let xdata = [];
                    let ydata = [];
                    let chartObj = {};
                    for(let i=0;i<list.length;i++){
                        let dtime = this.$appUtil.formatDate(this.formatStr,new Date(list[i].dataTime))
                        xdata.push(dtime);
                        let yda = list[i].dataValue==null?0:parseFloat(list[i].dataValue).toFixed(3);
                        ydata.push(yda);
                    }
                    chartObj.xdata = xdata;
                    chartObj.ydata = ydata;
                    this.chartDOM = "lineminechart";
                    this.createLintChart(chartObj);
                }else if(this.showIndex == 2&&this.queryMineTimeType!="1"){
                    let list = this.resultList;
                    let xdata = [];
                    let ydata = [];
                    let maxData = [];
                    let minData = [];
                    let chartObj = {};
                    for(let i=0;i<list.length;i++){
                        let dtime = this.$appUtil.formatDate(this.formatStr,new Date(list[i].dataTime))
                        xdata.push(dtime);
                        let max = list[i].maxValue==null?0:parseFloat(list[i].maxValue).toFixed(3);
                        let min = list[i].minValue==null?0:parseFloat(list[i].minValue).toFixed(3);
                        let avg = list[i].avgValue==null?0:parseFloat(list[i].avgValue).toFixed(3);
                        ydata.push(avg);
                        maxData.push(max);
                        minData.push(min);
                    }
                    chartObj.xdata = xdata;
                    chartObj.ydata = ydata;
                    chartObj.maxData = maxData;
                    chartObj.minData = minData;
                    this.chartDOM = "linedaychart";
                    this.createAvgLintChart(chartObj);
                }
            },
            createAvgLintChart(chartObj){
                let lineChart = this.$charts.init(document.getElementById(this.chartDOM));
                lineChart.resize();
                lineChart.clear();
                lineChart.setOption({
                    color: ['#51B1E6', '#9BA527', '#A52727'],
                    title: {
                        text: '',
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
                    legend: {
                        right: '10',
                        top: '5',
                        itemWidth: 15,
                        itemHeight: 8,
                        textStyle: {
                            fontSize: '9',
                            color: '#FFF'
                        },
                        data:['最大值','最小值','平均值']
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
                            name:'最大值',
                            type:'line',
                            data:chartObj.maxData
                        },
                        {
                            name:'最小值',
                            type:'line',
                            data:chartObj.minData
                        },
                        {
                            name:'平均值',
                            type:'line',
                            data:chartObj.ydata
                        }
                    ]
                });
            },
            queryXzcf(permitLicence){
                let xzcfbody = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "field":"permitLicence",
                            "match":"equal",
                            "value":permitLicence,
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
                        "field": "filingTime",
                        "order": "DESC"
                    }
                };

                this.$axios({
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f738f38bf017390247cbf035d?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: xzcfbody,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    let list = res.data.data.list;
                    this.xzcfList = list;
                });
            },
            queryHjxf(permitLicence){
                let xfbody = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "field":"permitLicence",
                            "match":"equal",
                            "value":permitLicence,
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
                        "field": "createTime",
                        "order": "DESC"
                    }
                };

                this.$axios({
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f738f38bf01739024196c035a?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: xfbody,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    let list = res.data.data.list;
                    this.xfList = list;
                });
            },
            queryCBdata(item,stime,etime){
                this.showName = item.companyName;
                this.showObj = item;
                this.showResult = true;
                this.showType = "cbxq";
                let xfbody = {
                    "conditions":[
                        {
                            "operator":"AND",
                            "field":"nodeId",
                            "match":"equal",
                            "value":item.outletId,
                            "maxValue":"",
                            "minValue":""
                        },
                        {
                            "operator":"AND",
                            "match":"range",
                            "field":"alarmTime",
                            "value":"",
                            "maxValue":etime,
                            "minValue":stime
                        }

                    ],
                    "page":{
                        "pageable": false,
                        "currentPage": 1,
                        "pageSize": 10
                    },
                    "sort":{
                        "field": "createTime",
                        "order": "DESC"
                    }
                };

                this.$axios({
                    url: appCfg.map.gisApiUrl+"api/share/data/2c9a818f746c8ba001746d5fad980127?userKey="+appCfg.map.userKey,
                    method: "post",
                    data: xfbody,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    let list = res.data.data.list;
                    this.cbList = list;
                });
            },
            drawMapEchart(){
                let cMark1 = L.marker([110.66,40.77],
                        {icon:L.divIcon({
                            className:'leaflet-echart-icon',
                            iconSize:[160,160],
                            html:'<div id="cm1" style="width:160px;height:160px;position:relative;background-color:transparent;">asd</div>'
                        })}).addTo(map);


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
    .dataTimeDiv {
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
    .etitle span {
        display: inline-block;
        max-width: 85%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .etitle i {
        float: right;
        margin-top: 8px;
        font-size: 16px;
        cursor: pointer;
    }
    .etitle img {
        float: right;
        margin-top: 5px;
        width: 15px;
        cursor: pointer;
    }
    .dataConts {
        height:auto;
    }
    .timeDatas{
        height: auto;
        overflow: auto;
        overflow-x: hidden;
    }


    .baseDiv {
        cursor: pointer;
        padding: 10px 10px;
        margin: 0;
        -webkit-box-shadow: inset 0 -1px 0 0 hsla(0,0%,98%,.2);
        box-shadow: inset 0 -1px 0 0 hsla(0,0%,98%,.2);
        background-color: rgba(3, 169, 244, 0.29);
        position: relative;
        box-shadow: 0px 1px 10px #087dce inset;
        background-size: 2px 16px, 16px 2px, 2px 16px, 16px 2px;
        margin: 5px;
    }

    .sucDiv {
        cursor: pointer;
        padding: 10px 10px;
        margin: 0;
        -webkit-box-shadow: inset 0 -1px 0 0 hsla(0,0%,98%,.2);
        box-shadow: inset 0 -1px 0 0 hsla(0,0%,98%,.2);
        background-color: rgba(0, 150, 25, 0.58);
        position: relative;
        box-shadow: 0px 1px 10px #087dce inset;
        background-size: 2px 16px, 16px 2px, 2px 16px, 16px 2px;
        margin: 5px;
    }
    .warnDiv {
        cursor: pointer;
        padding: 10px 10px;
        margin: 0;
        -webkit-box-shadow: inset 0 -1px 0 0 hsla(0,0%,98%,.2);
        box-shadow: inset 0 -1px 0 0 hsla(0,0%,98%,.2);
        background-color: rgba(176, 174, 10,0.57);
        position: relative;
        box-shadow: 0px 1px 10px #087dce inset;
        background-size: 2px 16px, 16px 2px, 2px 16px, 16px 2px;
        margin: 5px;
    }
    .goodDiv {
        cursor: pointer;
        padding: 10px 10px;
        margin: 0;
        -webkit-box-shadow: inset 0 -1px 0 0 hsla(0,0%,98%,.2);
        box-shadow: inset 0 -1px 0 0 hsla(0,0%,98%,.2);
        background-color: rgba(14, 255, 127,0.57);
        position: relative;
        box-shadow: 0px 1px 10px #087dce inset;
        background-size: 2px 16px, 16px 2px, 2px 16px, 16px 2px;
        margin: 5px;
    }
    .errDiv {
        cursor: pointer;
        padding: 10px 10px;
        margin: 0;
        -webkit-box-shadow: inset 0 -1px 0 0 hsla(0,0%,98%,.2);
        box-shadow: inset 0 -1px 0 0 hsla(0,0%,98%,.2);
        background-color: rgba(255, 0, 0,0.57);
        position: relative;
        box-shadow: 0px 1px 10px #087dce inset;
        background-size: 2px 16px, 16px 2px, 2px 16px, 16px 2px;
        margin: 5px;
    }
    .eleft {
        width: 200px;
    }
    .eright {
        width: 100px;
        float: right;
        position: absolute;
        top: 10px;
        right: 0;
    }
    .indexName {
        font-size: 13px;
    }
    .indexVal {
        font-size: 17px;
        margin: 5px;
    }
    .indexTime {
        font-size: 12px;
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
    .baseDiv .company_address, .baseDiv .company_type,.company_type{
        min-height: 22px;
        line-height: 22px;
        font-size: 12px;
        color: hsla(0,0%,98%,.9);
        text-align: left;
    }
    .describe {
        color: hsla(0,0%,98%,.9);
        font-size: 12px;
        line-height: 22px;
        min-height: 22px;
        text-align: left;
        margin: 0;
    }
    .content {
        text-align: right;
    }
    .el-button {
        font-weight: 300;
        height: 20px;
        padding: 0;
        min-width: 62px;
        border-radius: 1px;
        font-size: 12px;
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
    .containers {
        height: calc(100% - 35px);
        overflow: auto;
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
    .queryCont {
        display: flex;
        padding: 5px 15px;
    }
    .detailDiv {
        height: auto;
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
    .iptw-80 .el-select, .iptw-80 .el-select>.el-input {
        width: 130px;
    }
    .mgr-8 {
        margin-right: 5px;
    }
    .itime {
        width: 100%;
        margin: 2px 0;
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
    .timeDatas li .eval2{
        min-width: 17%;
        width: auto;
    }
    .timeDatas li .etime {
        width: 120px !important;
    }
    #linechart,#linewwchart,#linewgchart ,#lineairchart,#lineminechart ,#linedaychart{
        width: 300px;
        height: 260px;
    }
    .nodata {
        font-size: 14px;
        padding: 5px;
        color: #ef1313;
        font-weight: 600;
    }
</style>