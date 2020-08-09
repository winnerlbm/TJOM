<template>
    <div class="searchDiv">
        <div class="inputDiv">
            <input type="text" placeholder="请输入查询关键字" v-model="searchVal">
            <img src="../../assets/image/menu/switch.png" @click="hideData" alt="" class="switch">
            <button class="searchBtn" @click="searchData"><img  class="switch" src="../../assets/image/menu/search.png" alt="" ></button>
        </div>
        <div class="resultDiv" v-show="showResult == true">
            div.
            <div class="resultTitle">
                <span>废水排放重点企业</span>
                <img class="plusImg" src="../../assets/image/menu/plus.png" alt="">
            </div>
            <div class="resultTitle">
                <span>废气排放重点企业</span>
                <img class="plusImg" src="../../assets/image/menu/plus.png" alt="">
            </div>
            <div class="resultTitle">
                <span>废水排放重点企业</span>
                <img class="plusImg" src="../../assets/image/menu/plus.png" alt="">
            </div>


        </div>
    </div>
</template>

<script>
    export default {
        name: "searchContainer",
        data(){
            return{
                showResult:false,
                searchVal:""
            }
        },
        methods:{
            searchData(){
                this.showResult = true;
            },
            hideData(){
                this.showResult = false;
            }
        }
    }
</script>

<style scoped>
    .searchDiv {
        position: absolute;
        top: 80px;
        left: 10px;
        width: auto;
        z-index: 990;
        border-radius: 5px;
    }
    .inputDiv {
        height: 40px;
        line-height: 40px;
        background-color: #fff;
        width: auto;
        border-radius: 3px;
        text-align: left;
        padding-left: 15px;
    }
    .inputDiv input {
        border: none;
        height: 30px;
        line-height: 30px;
        width: 240px;
        border-right: 1px solid #eee;
        outline: none;
    }
    .switch {
        vertical-align: middle;
        height: 18px;
        margin: 0 15px;
    }
    .searchBtn {
        background-color: #3286fe;
        border: none;
        height: 40px;
        line-height: 40px;
        border-radius: 0 3px 3px 0;
        cursor: pointer;
    }
    .searchBtn img {

    }

    .resultDiv {
        height: 600px;
        width: 300px;
        background-color: rgba(0, 0, 0, 0.54);
        margin-top: 5px;
        border-radius:3px ;
    }
    .resultTitle {
        background-color: #11223F;
        color: #fff;
        text-align: left;
        height: 28px;
        line-height: 28px;
        font-size: 13px;
        padding: 0 15px;
        /*display: flex;
        justify-content: space-between;*/
        margin-bottom: 3px;
    }
    .plusImg {
        display: block;
        width: 13px;
        height: 13px;
        margin-top: 7px;
        float: right;
    }
</style>