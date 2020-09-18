<template>
    <div class="routeDiv" v-loading="loading" v-show="showRoute" element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="routeSelect" v-show="roteSelectShow">
            <div class="routTitle">
                <span>路径规划</span>
                <i class="el-icon-close" @click="hidePRoute"></i>
            </div>
            <div v-for="(item,key) in pointsHtml" class="points">
                <span>{{item.spanText}}</span>
                <input type="text" v-model="item.inputVal" :placeholder="item.holder" @input="changeItem(item,key)">
                <div class="tools">
                    <img src="../../assets/image/route/clearIpt.png" @click="clearInput(item,key)" v-if="item.clear" alt="">
                    <img src="../../assets/image/route/delRoute.png" @click="delRoute(item,key)" v-if="item.del" alt="">
                    <img src="../../assets/image/route/addRoute.png" @click="addRoute(item,key)" v-if="item.add" alt="">
                </div>
            </div>
            <div class="butns">
                <button @click="roteAnylysis()">开始分析</button>
            </div>
        </div>
        <div class="routeResult"  v-show="roteResultShow">
            <div class="routTitle">
                <span>最佳路径</span>
                <img style="float: right;width: 15px;margin-top: 6px;cursor: pointer" src="../../assets/image/back.png"  @click="hideRoute">
            </div>
            <div class="routes">
                <div class="origin">
                    <img src="../../assets/image/route/start.png" alt="">
                    <span>{{startFac}}</span>
                </div>
                <ul class="routeStep">
                    <li v-for="(item,key) in routeSteps" @click="zoomLine(key)">
                        <span :class="['navtrans-navlist-icon',getCls(item)]"></span>
                        <div class="navtrans-navlist-list-content">{{item.action}},{{item.instruction}}</div>  
                    </li>
                </ul>
                <div class="origin">
                    <img src="../../assets/image/route/end.png" alt="">
                    <span>{{endFac}}</span>
                </div>
            </div>
        </div>
        <div class="facNmDiv" :style="{'top': curr_top + 'px'}" v-show="facShow">
            <ul>
                <li v-for="(item,key) in facList" @click="selectFac(item)">

                    <span>{{item.companyName}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "route-container",
        data(){
            return{
                roteSelectShow:true,
                roteResultShow:false,
                pointsHtml:[
                    {spanText:"起",langs:[],inputVal:"",clear:false,add:true,del:false,holder:"请输入起点"},
                   /* {spanText:"经",langs:[],inputVal:"",clear:false,add:true,del:true,holder:"请输入途径点"},*/
                    {spanText:"终",langs:[],inputVal:"",clear:false,add:false,del:false,holder:"请输入终点"},
                ],
                facList:[],
                curr_top:40,
                currKey:0,
                facShow:false,
                startFac:"",
                endFac:"",
                routeSteps:[],
                loading:false,
                showRoute:false,
                tempLayer:null
            }
        },
        methods:{
            showPRoute(){
                this.showRoute = true;
                this.pointsHtml = [
                    {spanText:"起",langs:[],inputVal:"",clear:false,add:true,del:false,holder:"请输入起点"},
                    /*{spanText:"经",langs:[],inputVal:"",clear:false,add:true,del:true,holder:"请输入途径点"},*/
                    {spanText:"终",langs:[],inputVal:"",clear:false,add:false,del:false,holder:"请输入终点"},
                ];
                this.tempLayer = L.layerGroup();
                this.$mapUtil.lMap.addLayer(this.tempLayer);
            },
            hidePRoute(){
                this.showRoute = false;
                this.roteSelectShow = true;
                this.roteResultShow = false;
                this.$parent.showSearchDiv();
                this.$mapUtil.removeTemLayer("routeLayer");
                if(this.$mapUtil.lMap.hasLayer(this.tempLayer)){
                    this.tempLayer.clearLayers();
                }
            },
            hideRoute(){
                this.roteSelectShow = true;
                this.roteResultShow = false;
                this.$mapUtil.removeTemLayer("routeLayer");
                if(this.$mapUtil.lMap.hasLayer(this.tempLayer)){
                    this.tempLayer.clearLayers();
                }
                
            },
            clearInput(item,key){
                item.inputVal = "";
                item.clear = false;
            },
            delRoute(item,key){
                this.pointsHtml.splice(key,1);
            },
            addRoute(item,key){
                if(this.pointsHtml.length>=10){
                    this.$message.error("最多添加10个企业点！");
                }else{
                    let newitem = {spanText:"经",langs:[],inputVal:"",clear:false,add:true,del:true,holder:"请输入途径点"};
                    this.pointsHtml.splice(key+1, 0, newitem);
                }
            },
            changeItem(item,key){
                this.curr_top = (key+1)*40 + 30;
                this.currKey = key;
                this.facShow = true;
                item.clear = true;
                this.facList = this.$parent.getFactoryByNm(item.inputVal);
            },
            selectFac(item){
                if(item.latitude==null||item.longitude==null){
                    this.$message.error("该企业无有效坐标！");
                    return;
                }
                this.facShow = false;
                this.pointsHtml[this.currKey].inputVal = item.companyName;
                this.pointsHtml[this.currKey].langs = [item.longitude,item.latitude];
                let rIcon = null;
                if(this.currKey == 0){
                    rIcon = require("../../assets/image/route/startP.png");
                }else if(this.currKey == (this.pointsHtml.length-1)){
                    rIcon = require("../../assets/image/route/endP.png");
                }else{
                    rIcon = require("../../assets/image/route/routP.png");
                }
                let langs = this.pointsHtml[this.currKey].langs;
                let rmarker = this.$mapUtil.createMarkerByLgnt(langs,rIcon);
                this.tempLayer.addLayer(rmarker);
                this.$mapUtil.lMap.flyTo([langs[1],langs[0]],10,{animate:false});

            },
            roteAnylysis(){
                
                this.startFac = this.pointsHtml[0].inputVal;
                this.endFac = this.pointsHtml[this.pointsHtml.length-1].inputVal;
                if(this.startFac == ""){
                    this.$message.error("请输入起点位置！");
                    return;
                }
                if(this.endFac == ""){
                    this.$message.error("请输入终点位置！");
                    return;
                }
                this.loading = true;
                let origin =  this.pointsHtml[0].langs.join(",");
                let desion = this.pointsHtml[this.pointsHtml.length-1].langs.join(",");
                let waypoints = [];
                for(let i=1;i<this.pointsHtml.length-1;i++){
                    if(this.pointsHtml[i].langs.length>0){
                        waypoints.push(this.pointsHtml[i].langs.join(","))
                    }
                }
                let routUrl = "https://restapi.amap.com/v3/direction/driving?key=a70dd2281ae385bd7d90cb7cf0475092&origin="+origin+"&destination="+desion+"&originid=&destinationid=&extensions=all&strategy=0&waypoints="+waypoints.join(";")+"&avoidpolygons=&avoidroad=";

                this.$axios.get(routUrl)
                    .then(res=>{
                        this.loading = false;
                        if(res.data.infocode == "10000"){
                            let route = res.data.route;
                            this.routeSteps =  route.paths[0].steps;
                            this.roteSelectShow = false;
                            this.roteResultShow = true;
                            this.setRouteMap();
                        }else{
                            this.$message.error("路径规划失败,请检查参数设置！")
                        }
                    });

            },
            setRouteMap(){
                let layerId = "routeLayer";
                let markers = [];

                let sIcon = require("../../assets/image/route/startP.png");
                let eIcon = require("../../assets/image/route/endP.png");
                let rIcon = require("../../assets/image/route/routP.png");
                /*let smodel = this.pointsHtml[0];
                
                smodel.longitude = smodel.langs[0];
                smodel.latitude = smodel.langs[1];
                smodel.id = "start_1";
                let emodel = this.pointsHtml[this.pointsHtml.length-1];
                emodel.longitude = emodel.langs[0];
                emodel.latitude = emodel.langs[1];
                emodel.id = "end_1";
                let smarker = this.$mapUtil.createPointMarker(smodel,sIcon);
                let emarker = this.$mapUtil.createPointMarker(emodel,eIcon);*/
                let _icon = null;
                for(let j=0;j<this.pointsHtml.length;j++){
                    if(j==0){
                        _icon = sIcon;
                    }else if(j == this.pointsHtml.length-1){
                        _icon = eIcon;
                    }else{
                        _icon = rIcon;
                    }
                    if(this.pointsHtml[j].langs.length>0){
                        let rmarker = this.$mapUtil.createMarkerByLgnt(this.pointsHtml[j].langs,_icon);
                        markers.push(rmarker);
                    }
                    
                }

                //markers.push(smarker);
                //markers.push(emarker);
                for(let i=0;i<this.routeSteps.length;i++){
                   // let line = this.routeSteps[i].polyline;
                    let tmcs = this.routeSteps[i].tmcs;
                    for(let k=0;k<tmcs.length;k++){
                        let line = tmcs[k].polyline;
                        
                        let lines = line.split(";");
                        let latlngs = [];
                        for(let j=0;j<lines.length;j++){
                            let arr = lines[j].split(",");
                            latlngs.push([arr[1],arr[0]])
                        }
                        let cols = this.getColor(tmcs[k].status);
                        let polyline = L.polyline(latlngs, {color: cols,weight:5});
                        polyline.id = "routeLine_"+i;
                        markers.push(polyline);
                    }
                    
                }
                let routeLayer = L.featureGroup(markers);
                this.$mapUtil.lMap.addLayer(routeLayer);
                this.$mapUtil.addTemLayer(layerId,routeLayer);
                this.$mapUtil.lMap.fitBounds(routeLayer.getBounds());
            },
            zoomLine(key){
                let layerGroup = this.$mapUtil.getTempLayer("routeLayer");
                let routeId = "routeLine_"+key;
                let _self = this;
                layerGroup.eachLayer(function (layer){
                    if (layer.id === routeId){
                        _self.$mapUtil.lMap.fitBounds(layer.getBounds());
                    }
                });
            },
            getCls(item){
                if(item.action == "直行"){
                    return "s-1";
                }else if(item.action == "向右前方行驶"){
                    return "s-2";
                }else if(item.action == "右转"){
                    return "s-3";
                }else if(item.action == "靠右"){
                    return "s-2";
                }else if(item.action == "靠左"){
                    return "s-7";
                }else if(item.action == "左转"){
                    return "s-9";
                }else if(item.action == "向左前方行驶"){
                    return "s-8";
                }else if(item.action == "靠左前方行驶"){
                    return "s-9";
                }else if(item.action == "靠右前方行驶"){
                    return "s-10";
                }else if(item.action == "左转调头"){
                    return "s-11";
                }else{
                    return "s-1";
                }
            },
            getColor(status){
                if(status == "未知"){
                    return "#00bd01";
                }else if(status == "畅通"){
                    return "#00bd01";
                }else if(status == "缓行"){
                    return "#FEAC01";
                }else if(status == "拥堵"){
                    return "#F31C0E";
                }else if(status == "严重拥堵"){
                    return "#F31C0E";
                }
            }
        }
    }
</script>

<style scoped>
    .routeDiv {
        position: absolute;
        top: 80px;
        left: 10px;
        width: 310px;
        z-index: 999;
        border-radius: 3px;
        background-color: rgba(15, 43, 108, 0.83);
        color: #fff;
        height: auto;
        max-height: calc(100% - 185px);
    }
    .routTitle {
        background-color: transparent;
        height: 34px;
        line-height: 35px;
        text-align: left;
        padding: 0 10px;
        font-size: 14px;
        color: #fff;
        border-radius: 3px 3px 0 0;
        border-bottom: 1.5px solid #283ba4;
    }
    .routTitle i {
        float: right;
        font-size: 18px;
        margin-top: 9px;
        cursor: pointer;
    }
    .points {
        border-bottom: 1px solid #3F51B5;
        height: 29px;
        line-height: 30px;
        text-align: left;
        padding: 5px 10px 5px 15px;
        position: relative;
    }
    .points span {
        font-size: 14px;
        vertical-align: middle;
        margin-right: 10px;
    }
    .points input {
        border: none;
        vertical-align: middle;
        width: 70%;
        height: 25px;
        line-height: 25px;
        outline: none;
        color:#fff;
        background-color: transparent;
    }
    .tools {
        position: absolute;
        top: 10px;
        right: 5px;
    }
    .tools img {
        cursor: pointer;
        width: 15px;
        margin: 0 1px;
    }
    .facNmDiv {
        position: absolute;
        top: 10px;
        background-color: #fff;
        max-height: 400px;
        width: calc(100% - 2px);
        border: 1px solid #eee;
        min-height: 100px;
        overflow: auto;
        color: #000;
    }

    .facNmDiv ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .facNmDiv ul li {
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        text-align: left;
        padding: 0 15px;
        font-size: 13px;
        overflow: hidden;
    }
    .facNmDiv ul li:hover {
        background-color: #eee;
    }


    .butns button {
        background-color: transparent;
        border: none;
        color: #fff;
        width: 100%;
        padding: 7px;
        cursor: pointer;
        outline:none;
    }

    .routeResult {
        height: 500px;
        overflow: auto;
    }
    .routes {
        height: calc(100% - 36px);
        overflow: auto;
        background-color: #fff;
        color: #000;
    }
    .stitle {
        height: 30px;
        line-height: 30px;
        background-color: #2196f3;
        color: #fff;
        text-align: left;
        padding: 0 10px 0 15px;
        font-size:14px;
    }

    .origin {
        text-align: left;
        height: 30px;
        line-height: 30px;
        padding: 5px 15px;
        border-bottom: 1px solid #eee;
        overflow: hidden;
        font-size:14px;
    }
    .origin img {
        width: 10px;
        margin-right: 5px;
    }
    .routeStep {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .routeStep li {
        height: auto;
        line-height: 28px;
        cursor: pointer;
        text-align: left;
        padding: 5px 15px;
        font-size: 13px;
        overflow: hidden;
        border-bottom: 1px solid #eee;
    }
    .routeStep li:hover {
        background-color: #eee;
    }

    .navtrans-navlist-icon {
        float: left;
        width: 18px;
        height: 16px;
        background: url("../../assets/image/route/nav-icon.png") no-repeat 0 0;
        margin-top: 5px;
        margin-right: 5px;
    }
    .navtrans-navlist-list-content {
        overflow: hidden;
    }
    .navtrans-navlist-icon.s- {

    }
    .navtrans-navlist-icon.s-1 {
        background-position: 0 0;
    }
    .navtrans-navlist-icon.s-2 {
        background-position: -18px 0;
    }
    .navtrans-navlist-icon.s-3 {
        background-position: -36px 0;
    }
    .navtrans-navlist-icon.s-7 {
        background-position: 0 -16px;
    }
    .navtrans-navlist-icon.s-8 {
        background-position: -18px -16px;
    }
    .navtrans-navlist-icon.s-9 {
        background-position: -36px -16px;
    }
    .navtrans-navlist-icon.s-10 {
        background-position: -54px -16px;
    }
    .navtrans-navlist-icon.s-11 {
        background-position: -72px -16px;
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