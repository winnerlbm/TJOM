<template>
    <div class="loginPage">

        <div class="loginDiv"  v-loading="loading" element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
            <div class="loginTitle">
                大气环境管控GIS系统
            </div>
            <div class="loginBox">
                <div class="formDiv" style="margin-top:60px">
                    <img src="../../assets/image/login/username.png" alt="">
                    <span>用户名</span>
                    <input type="text" v-model="username">
                </div>
                <div class="formDiv">
                    <img src="../../assets/image/login/password.png" alt="">
                    <span>密 <i style="margin: 0 5px;"></i> 码</span>
                    <input type="password" v-model="password">
                </div>
                <div class="formDiv">
                    <button @click="login" class="loginBtn">登录系统</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data(){
            return{
                username:"",
                password:"",
                loading:false
            }
        },
        methods:{
            login(){
                if(!this.valideDate()){
                    this.$message.error("软件许可授权已过期！");
                    return;
                }
                if(this.username==""||this.password==""){
                    this.$message.error("用户名或密码不可为空！");
                    return;
                }
                this.loading = true;
                let body = {
                    "userName":this.username,
                    "passWord":this.password
                };
                this.$axios({
                    url:"http://172.26.1.11:8306/simple-user-center-server/userCenter/new/login",
                    //url: "https://sthj.teda.gov.cn/app-simple-user-center-server/userCenter/new/login",
                    method: "post",
                    data: body,
                    header:{'Content-type': 'application/json'}
                }).then(res => {
                    this.loading = false;
                    if(res.data.code == 200){
                        let user = res.data.data;
                        let token = user.token;
                        this.setCookie("token", token, 1);
                        sessionStorage.setItem("username",user.name);
                        this.$router.push('/map');
                    }else{
                        this.$message.error("用户名或密码错误！");
                    }
                });
            },
            setCookie(cname, cvalue, exdays) {
              let d = new Date()
              d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
              let expires = 'expires=' + d.toUTCString()
              document.cookie = cname + '=' + cvalue + '; ' + expires
            },
            valideDate(){//添加简单软件授权协议
                let _date = new Date().getTime();
                if(_date>=1609430399000){
                    return false;
                }
                return true;
            }
        }
    }
</script>

<style scoped>
    .loginPage {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-image: url("../../assets/image/login/bg.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .loginDiv {
        position: absolute;
        width: 410px;
        height: 240px;
        top: 50%;
        left: 50%;
        margin: -140px 0 0 -225px;
        background-image: url("../../assets/image/login/box.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        color: #fff;
        padding: 20px;
    }
    .loginTitle {
        margin-top: -80px;
        font-size: 28px;
        height: 85px;
    }
    .formDiv {
        padding: 10px;
    }
    .formDiv span {
        vertical-align: middle;
        font-size: 13px;
        font-weight:500;
        margin: 0 10px;
    }
    .formDiv img {
        vertical-align: middle;
    }
    .formDiv input {
        vertical-align: middle;
        background: transparent;
        border: 1px solid #2172c1;
        height: 28px;
        line-height: 28px;
        width: 200px;
        border-radius: 3px;
        color: #fff;
        outline: none;
        padding: 0 10px;
    }
    .loginBtn {
        width: 222px;
        height: 30px;
        line-height: 30px;
        background-color: #0b69e3;
        color: #fff;
        letter-spacing: 5px;
        border: none;
        margin-left:70px;
        border-radius: 3px;
        cursor: pointer;
    }
</style>