<template>
    <div class="dataTimeDiv" v-show="showResult">
        <div class="etitle">
            <span>实时监测数据</span>
            <i class="el-icon-close" @click="hideData"></i>
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
                searchVal:"",
                resultList:[]
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
</style>