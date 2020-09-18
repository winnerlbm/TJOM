<template>
    <div class="markerDiv">
        <div class="markerTitle">
            点位
        </div>
        <div class="markerList">
            <ul>
                <li v-for="(item,key) in pointList" :key="key" @click="drawPoint(item)"   @click.stop="doSomething($event)" :class="{'active':item.cls==selCls}" >
                    <img :src="item.image" alt="">
                </li>
            </ul>
        </div>
        <div class="markerTitle">
            线路
        </div>
        <div class="markerList">
            <ul>
                <li v-for="(item,key) in lineList" :key="key" @click="drawLines(item)"   @click.stop="doSomething($event)" :class="{'active':item.cls==selCls}" >
                    <img :src="item.image" alt="">
                </li>
            </ul>
        </div>
        <div class="markerTitle">
            区域
        </div>
        <div class="markerList">
            <ul>
                <li v-for="(item,key) in polyList" :key="key" @click="drawPolygon(item)"   @click.stop="doSomething($event)" :class="{'active':item.cls==selCls}" >
                    <img :src="item.image" alt="">
                </li>
            </ul>
        </div>
        <div class="markerTitle">
            工具
        </div>
        <div class="markerList">
            <ul>
                <li v-for="(item,key) in toolList" :key="key" @click="drawTool(item)"   @click.stop="doSomething($event)" :class="{'active':item.cls==selCls}" >
                    <img :src="item.image" alt="" :title="item.color">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "marker-container",
        data(){
            return {
                selCls:"",
                pointIcon:null,
                pointList:[
                    {type:"point",image:require("../../assets/image/marker/local_blue.png"),cls:"local_1"},
                    {type:"point",image:require("../../assets/image/marker/local_yellow.png"),cls:"local_2"},
                    {type:"point",image:require("../../assets/image/marker/local_eb.png"),cls:"local_3"},
                    {type:"point",image:require("../../assets/image/marker/local_ered.png"),cls:"local_4"},
                    {type:"point",image:require("../../assets/image/marker/local_gray.png"),cls:"local_5"},
                    {type:"point",image:require("../../assets/image/marker/local_green.png"),cls:"local_6"},
                    {type:"point",image:require("../../assets/image/marker/flag_blue.png"),cls:"flag_1"},
                    {type:"point",image:require("../../assets/image/marker/flag_yellow.png"),cls:"flag_2"},
                    {type:"point",image:require("../../assets/image/marker/flag_eb.png"),cls:"flag_3"},
                    {type:"point",image:require("../../assets/image/marker/flag_ered.png"),cls:"flag_4"},
                    {type:"point",image:require("../../assets/image/marker/flag_gray.png"),cls:"flag_5"},
                    {type:"point",image:require("../../assets/image/marker/flag_green.png"),cls:"flag_6"},
                    {type:"point",image:require("../../assets/image/marker/point_blue.png"),cls:"point_1"},
                    {type:"point",image:require("../../assets/image/marker/point_yellow.png"),cls:"point_2"},
                    {type:"point",image:require("../../assets/image/marker/point_eb.png"),cls:"point_3"},
                    {type:"point",image:require("../../assets/image/marker/point_ered.png"),cls:"point_4"},
                    {type:"point",image:require("../../assets/image/marker/point_gray.png"),cls:"point_5"},
                    {type:"point",image:require("../../assets/image/marker/point_green.png"),cls:"point_6"}
                ],
                lineList:[
                    {type:"lines",image:require("../../assets/image/marker/line_blue.png"),cls:"line_1",color:"#5986FF"},
                    {type:"lines",image:require("../../assets/image/marker/line_yellow.png"),cls:"line_2",color:"#FFBB63"},
                    {type:"lines",image:require("../../assets/image/marker/line_eb.png"),cls:"line_3",color:"#84A2D4"},
                    {type:"lines",image:require("../../assets/image/marker/line_ered.png"),cls:"line_4",color:"#ED747D"},
                    {type:"lines",image:require("../../assets/image/marker/line_gray.png"),cls:"line_5",color:"#A08E84"},
                    {type:"lines",image:require("../../assets/image/marker/line_green.png"),cls:"line_6",color:"#6EAC79"},
                ],
                polyList:[
                    {type:"polygon",image:require("../../assets/image/marker/polygon_blue.png"),cls:"polygon_1",color:"#5986FF"},
                    {type:"polygon",image:require("../../assets/image/marker/polygon_yellow.png"),cls:"polygon_2",color:"#FFBB63"},
                    {type:"polygon",image:require("../../assets/image/marker/polygon_eb.png"),cls:"polygon_3",color:"#84A2D4"},
                    {type:"polygon",image:require("../../assets/image/marker/polygon_ered.png"),cls:"polygon_4",color:"#ED747D"},
                    {type:"polygon",image:require("../../assets/image/marker/polygon_gray.png"),cls:"polygon_5",color:"#A08E84"},
                    {type:"polygon",image:require("../../assets/image/marker/polygon_green.png"),cls:"polygon_6",color:"#6EAC79"},
                    {type:"circle",image:require("../../assets/image/marker/circle_blue.png"),cls:"circle_1",color:"#5986FF"},
                    {type:"circle",image:require("../../assets/image/marker/circle_yellow.png"),cls:"circle_2",color:"#FFBB63"},
                    {type:"circle",image:require("../../assets/image/marker/circle_eb.png"),cls:"circle_3",color:"#84A2D4"},
                    {type:"circle",image:require("../../assets/image/marker/circle_ered.png"),cls:"circle_4",color:"#ED747D"},
                    {type:"circle",image:require("../../assets/image/marker/circle_gray.png"),cls:"circle_5",color:"#A08E84"},
                    {type:"circle",image:require("../../assets/image/marker/circle_green.png"),cls:"circle_6",color:"#6EAC79"},
                    {type:"rectangle",image:require("../../assets/image/marker/rec_blue.png"),cls:"rectangle_1",color:"#5986FF"},
                    {type:"rectangle",image:require("../../assets/image/marker/rec_yellow.png"),cls:"rectangle_2",color:"#FFBB63"},
                    {type:"rectangle",image:require("../../assets/image/marker/rec_eb.png"),cls:"rectangle_3",color:"#84A2D4"},
                    {type:"rectangle",image:require("../../assets/image/marker/rec_ered.png"),cls:"rectangle_4",color:"#ED747D"},
                    {type:"rectangle",image:require("../../assets/image/marker/rec_gray.png"),cls:"rectangle_5",color:"#A08E84"},
                    {type:"rectangle",image:require("../../assets/image/marker/rec_green.png"),cls:"rectangle_6",color:"#6EAC79"}
                ],
                toolList:[
                    {type:"delete",image:require("../../assets/image/marker/delete.png"),cls:"delete",color:"删除"},
                    {type:"clear",image:require("../../assets/image/marker/clear.png"),cls:"clear",color:"清空"},
                    {type:"edit",image:require("../../assets/image/marker/edit.png"),cls:"edit",color:"编辑"},
                    {type:"submit",image:require("../../assets/image/marker/submit.png"),cls:"submit",color:"完成"}
                ],
                markControl:null,
                lineStyle:null,
                featureGroup:null,
                editTool:null,
                deleteTool:null
            }
        },
        methods:{
            drawPoint(item){
                this.selCls = item.cls;
                this.pointIcon = L.icon({
                    iconUrl: item.image ,
                    iconSize: [20, 20],
                    iconAnchor: [10, 20],
                    popupAnchor: [0, 0],
                    shadowSize: [68, 95],
                    shadowAnchor: [22, 94]
                });
                //new L.Draw.Marker(this.$mapUtil.lMap ,this.markControl.options.marker).enable();
                this.$parent.enableDrawOption("marker");
            },
            drawLines(item){
                this.selCls = item.cls;
                this.lineStyle = {color:item.color};

                this.$parent.enableDrawOption("line");
                //new L.Draw.Polyline(this.$mapUtil.lMap,this.markControl.options.polyline).enable();
            },
            drawPolygon(item){
                this.selCls = item.cls;
                this.lineStyle = {color:item.color};
                if(item.type=="polygon"){
                   // new L.Draw.Polygon(this.$mapUtil.lMap,this.markControl.options.polygon).enable();
                    this.$parent.enableDrawOption("polygon");
                }else if(item.type == "circle"){
                  //  new L.Draw.Circle(this.$mapUtil.lMap,this.markControl.options.circle).enable();
                    this.$parent.enableDrawOption("circle");
                }else if(item.type == "rectangle"){
                   // new L.Draw.Rectangle(this.$mapUtil.lMap,this.markControl.options.rectangle).enable();
                    this.$parent.enableDrawOption("rectangle");
                }

            },
            drawTool(item){
                this.$parent.drawTool(item);
             /* if(item.type == "delete"){
                  if(!this.deleteTool) {
                      this.deleteTool = new L.EditToolbar.Delete(this.$mapUtil.lMap, {featureGroup: this.featureGroup});
                  }
                  this.deleteTool.enable();
              }else if(item.type == "clear"){
                  this.featureGroup.clearLayers();
              }else if(item.type == "edit"){
                  if(!this.editTool){
                      this.editTool = new L.EditToolbar.Edit(this.$mapUtil.lMap,{featureGroup: this.featureGroup});
                  }
                  this.editTool.enable();
              }else {
                  if(this.editTool){
                      this.editTool.disable();
                  }
                  if(this.deleteTool){
                      this.deleteTool.disable();
                  }
              }*/
            },
            initDraw(){
                this.featureGroup = new L.FeatureGroup();
                this.$mapUtil.lMap.addLayer(this.featureGroup);
                this.markControl = new L.Control.Draw({
                    edit: {
                        featureGroup: this.featureGroup
                    }
                });
                let _self = this;
                this.$mapUtil.lMap.on(L.Draw.Event.CREATED, function (event) {
                    let layer = event.layer;
                    if(event.layerType == "marker"){
                        layer.setIcon(_self.pointIcon);
                    }else{
                        layer.setStyle(_self.lineStyle);
                    }
                    _self.featureGroup.addLayer(layer);
                });
            },
            doSomething(e){

            }
        },
        mounted(){

        },
    }
</script>

<style scoped>
    .markerDiv {
        position: absolute;
        top: 130px;
        right: 180px;
        width: 200px;
        height: auto;
        background-color: rgba(0, 34, 68, 0.83);
        z-index: 990;
        border-radius: 5px;
    }
    .markerList {
        padding:10px;
    }
    .markerTitle {
        height: 28px;
        line-height: 28px;
        color: #fff;
        font-size: 13px;
        text-align: left;
        padding: 0 15px;
        background-color: rgba(27, 40, 86, 0.86);
    }
    .markerList ul {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        padding: 0;
        margin: 0;
    }
    .markerList ul li {
        padding: 5px;
    }
    .markerList ul li.active,.markerList ul li:hover {
        background-color: rgba(63, 81, 181, 0.31);
        border-radius: 3px;
    }
    .markerList ul li img {
        height: 20px;
        vertical-align: middle;
        width: 20px;
    }
</style>