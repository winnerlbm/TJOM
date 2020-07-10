<template>
    <div id="hourPlay">
        <div class="hourDiv">
            <div class="play bgdiv" @click="playTime">
                <img :src="playImg" alt="">
            </div>
            <div class="preDiv bgdiv" @click="playPrev">
                <img src="../../assets/image/util/prev.png" alt="" style="margin-left:0;">
            </div>
            <div class="timeDiv">
               <span>{{currentDate}}</span>
                <img src="../../assets/image/util/datatime.png" alt="" @click="dateClick">
                <el-date-picker style="width: 90px;position: absolute;left: 0;opacity: 0;cursor: pointer"
                        v-model="currentDate"
                        type="date"
                        value-format="yyyy-MM-dd" :clearable="clearable"
                        placeholder="选择日期">
                </el-date-picker>
            </div>
            <div class="timeList">
                <div class="timeProgressBox" @click="clickPopup" @mousemove.prevent="hoverPopup" @mouseleave="leavePopup"  ref="timeProgressBox" >
                    <div class="curr-popup" v-show="isShowHoverPopup"  :style="{'left': popu_x + 'px'}"><span>{{text_hour}}</span></div>
                    <div class="dot"  :style="{'left': curr_x + 'px'}"></div>
                </div>
                <ul>
                    <li v-for="item in hours" class="every">
                        <span class="hour">{{item.text}}</span>
                    </li>
                </ul>
            </div>

            <div class="nextDiv bgdiv"  @click="playNext">
                <img src="../../assets/image/util/next.png" alt="">

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "hour-line",
        data(){
            return{
                curr_x:0,
                popu_x:0,
                curr_hour:0,
                boxLeft:200,
                playImg:require("../../assets/image/util/play.png"),
                timer:null,//播放使用
                text_hour:"0:00",
                playAction:"play",
                hour_veg:10,
                isShowHoverPopup:false,
                hours:[
                    {hour:"0",text:"0:00"},
                    {hour:"1",text:"1:00"},
                    {hour:"2",text:"2:00"},
                    {hour:"3",text:"3:00"},
                    {hour:"4",text:"4:00"},
                    {hour:"5",text:"5:00"},
                    {hour:"6",text:"6:00"},
                    {hour:"7",text:"7:00"},
                    {hour:"8",text:"8:00"},
                    {hour:"9",text:"9:00"},
                    {hour:"10",text:"10:00"},
                    {hour:"11",text:"11:00"},
                    {hour:"12",text:"12:00"},
                    {hour:"13",text:"13:00"},
                    {hour:"14",text:"14:00"},
                    {hour:"15",text:"15:00"},
                    {hour:"16",text:"16:00"},
                    {hour:"17",text:"17:00"},
                    {hour:"18",text:"18:00"},
                    {hour:"19",text:"19:00"},
                    {hour:"20",text:"20:00"},
                    {hour:"21",text:"21:00"},
                    {hour:"22",text:"22:00"},
                    {hour:"23",text:"23:00"}
                ],
                speed:2000,//播放速度
                currentDate:"2020-07-09",
                curr_time:{},
                clearable:false
            }
        },
        methods:{
            clickPopup(event){
                let x = event.clientX;
                this.curr_x = x - this.boxLeft - 10;//滑块宽度为10 所以去掉10
               // let width_all = this.$refs.timeProgressBox.clientWidth;
               // this.hour_veg = width_all/24;//每一时刻长度
                this.curr_hour = parseInt(this.curr_x/this.hour_veg);
                console.log(this.curr_hour);
                this.curr_time = {
                    day:this.currentDate,
                    hour:this.curr_hour
                };
                this.$emit('onTimeChange', this.curr_time);
            },
            hoverPopup(event){
                let x = event.clientX;
                this.popu_x = x - this.boxLeft - 20;//提示框宽度为20 所以去掉20
              //  let width_all = this.$refs.timeProgressBox.clientWidth;
              //  this.hour_veg = width_all/24;//每一时刻长度
                let this_hour = parseInt(this.popu_x/this.hour_veg);
                this.text_hour = this_hour + ":00";
                this.isShowHoverPopup = true;
            },
            leavePopup(){
                this.isShowHoverPopup = false;
            },
            playNext(){
                if( this.curr_hour<23){
                    this.curr_hour++;
                }
                this.curr_x =  (this.curr_hour+1)*this.hour_veg - 10 - (this.hour_veg/2);
                this.curr_time = {
                    day:this.currentDate,
                    hour:this.curr_hour
                };
                this.$emit('onTimeChange', this.curr_time);
            },
            playPrev(){
                if( this.curr_hour>0){
                    this.curr_hour--;
                }
                this.curr_x =  (this.curr_hour+1)*this.hour_veg - 10 - (this.hour_veg/2);
                this.curr_time = {
                    day:this.currentDate,
                    hour:this.curr_hour
                };
                this.$emit('onTimeChange', this.curr_time);
            },
            playTime(){
                if(this.playAction === 'play') {
                    this.playAction = 'pause';
                    this.playImg = require("../../assets/image/util/stop.png");
                    this.startPlay();
                } else {
                    this.playAction = 'play';
                    this.playImg = require("../../assets/image/util/play.png");
                    this.stopPlay();
                }
            },
            startPlay(){
                let _self = this;
                this.timer = setInterval(function(){
                    if( _self.curr_hour<23){
                        _self.curr_hour++;
                        _self.curr_x =  (_self.curr_hour+1)*_self.hour_veg - 10 - (_self.hour_veg/2);
                        _self.curr_time = {
                            day:_self.currentDate,
                            hour:_self.curr_hour
                        };
                        _self.$emit('onTimeChange', _self.curr_time);
                    }else{
                        _self.stopPlay();
                    }
                },this.speed);
            },
            stopPlay(){
                clearInterval(this.timer);
            },
            calcWidth(){
                let width_all = this.$refs.timeProgressBox.clientWidth;
                this.hour_veg = width_all/24;//每一时刻长度
                this.curr_x = (this.hour_veg/2) - 10;
                console.log(width_all);
            },
            dateClick(){

            }
        },
        mounted(){
            this.$nextTick(function () {
                this.calcWidth();
            });
            let _this = this;
            window.onresize = ()=>{
                //调用methods中的事件
                _this.calcWidth();
            }
        }

    }
</script>

<style scoped>
    ul,li {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    #hourPlay {
        width: 100%;
        height: 80px;
        background-color: rgba(34, 46, 51, 0.25);
        display: flex;
        border-radius: 2px;
        box-shadow:0 4px 6px 0 rgba(24,32,37,1);
        position: absolute;
        bottom: 0;
        z-index: 999;
    }
    .hourDiv{
        width: 100%;
        height: 100%;
        display: flex;
    }
    .bgdiv {
        width: 40px;
        height: 40px;
        text-align: center;
        border-radius: 20px;
        background-color:  #525962;
        margin: 20px 5px;
        cursor: pointer;
    }
    .bgdiv img {
        width:20px;
        margin-top: 10px;
        margin-left: 4px;
        color: #fff;
    }

    .timeDiv {
        color: #fff;
        padding: 0 5px;
        height: 30px;
        border-radius: 3px;
        margin-top: 25px;
        line-height: 30px;
        position: relative;
    }
    .timeDiv img {
        vertical-align: middle;
        width: 18px;
        margin-left: 5px;
        cursor: pointer;
    }
    .timeDiv span{
        font-size: 13px;
        font-family: lcd;
        vertical-align: middle;
    }

    .timeList {
        width: calc(100% - 270px);
        color: #fff;
        height: 4em;
        margin-top: 30px;
    }
    .timeList ul {
        width: 100%;
        display: flex;
    }
    .timeList ul li {
        width: 5em;
        position: relative;
        padding-top: 1.5em;
    }
    .timeList ul li:after {
        position: absolute;
        content: "";
        top: 0;
        height: 1.5em;
        background:#fff;
        left: 50%;
        width: 2px;
        margin-left: -1px;
    }
    .timeProgressBox {
        width: 100%;
        height: 10px;
        background-color: #525962;
        border-radius: 10px;
        cursor: pointer;
        position: relative;
    }
    .dot {
        left: 0;
        position: absolute;
        top: -5px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #fff;
        transition: .5s;
    }

    .curr-popup {
        left: 0;
        position: absolute;
        top: -25px;
        width: 30px;
        height: auto;
        padding: 3px 5px;
        border-radius: 2px;
        background-color: #525962;
        color: #fff;
    }
</style>