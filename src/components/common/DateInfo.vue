<template>
    <div class="date-info-cls">
        <span class="date">
			<span class="nowtime"
				  style="color: #03e8eb;font-size: 20px;font-family: lcd,serif;margin-right: 10px;">
			{{nowTime}}
			</span>
			<!--<span  style="font-family: lcd;font-size: 14px;color: #03e8eb;">{{nowDate}}</span>-->
			<!--<span style="font-family: MicrosoftYaHei,serif;font-size: 16px;color: #03e8eb;">{{nowWeek}}</span>-->
		</span>
		<span class="line"></span>
		<span class="user">
			<span style="color: #03e8eb;font-size: 16px;font-family: lcd,serif;margin-right: 16px;">
				<img style="width: 25px;vertical-align: middle;margin-right: 5px;" src="../../assets/image/user.png" alt="">{{userName}}
				<!--<i @click="showLog" class="el-icon-arrow-down loicon"></i>-->
				<img @click="logOut" style="width: 15px;vertical-align: middle;margin-left: 5px;cursor: pointer" src="../../assets/image/exit.png" alt="">
			</span>

			<div class="logDiv" v-show="logShow">
				<div class="items" @click="logOut"><img style="width: 15px;vertical-align: middle;margin-right: 5px" src="../../assets/image/exit.png" alt=""><span>退出</span></div>
			</div>
		</span>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    import appCfg from "@config/AppCfg"
    export default {
        name: 'DateInfo',
        components: {},
        data() {
            return {
                isshow: true,
                loginName: '',
                logShow:false,
                user: {
                    name: null,
                    avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585729224054&di=0b2bf77dd00652b438d01127449acaf9&imgtype=0&src=http%3A%2F%2Fwww.17qq.com%2Fimg_qqtouxiang%2F47789512.jpeg",
                    role: "",
                    registeInfo: ""
                },
                nowTime: '',
                nowDate: '',
                nowWeek: '',
                activeIndex: '/index',
                langVisible: false,
				userName:"超级管理员"
            }
        },
        watch: {
            "isLogin": 'fitname'
        },
        beforeDestroy() {
            this.isshow = false;
            this.$forceUpdate();
        },
        methods: {
            //显示当前时间（年月日时分秒）
            timeFormate(timeStamp) {
                let year = new Date(timeStamp).getFullYear();
                let month = new Date(timeStamp).getMonth() + 1 < 10 ? "0" + (new Date(timeStamp).getMonth() + 1) : new Date(
                    timeStamp).getMonth() + 1;
                let date = new Date(timeStamp).getDate() < 10 ? "0" + new Date(timeStamp).getDate() : new Date(timeStamp).getDate();
                let hh = new Date(timeStamp).getHours() < 10 ? "0" + new Date(timeStamp).getHours() : new Date(timeStamp).getHours();
                let mm = new Date(timeStamp).getMinutes() < 10 ? "0" + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes();
                let ss = new Date(timeStamp).getSeconds() < 10 ? "0" + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds();
                let week = new Date().getDay();
                if (week == 1) {
                    this.nowWeek = "星期一";
                } else if (week == 2) {
                    this.nowWeek = "星期二";
                } else if (week == 3) {
                    this.nowWeek = "星期三";
                } else if (week == 4) {
                    this.nowWeek = "星期四";
                } else if (week == 5) {
                    this.nowWeek = "星期五";
                } else if (week == 6) {
                    this.nowWeek = "星期六";
                } else {
                    this.nowWeek = "星期日";
                }
                // this.nowTime = year + "-" + month + "-" + date +" |"+" "+hh+":"+mm+':'+ss ;
                this.nowTime = hh + ":" + mm + ':' + ss;
                this.nowDate = year + "-" + month + "-" + date;
                // console.log(this.nowTime)
            },
            nowTimes() {
                this.timeFormate(new Date());
                setInterval(this.nowTimes, 1000);
                this.clear()
            },
            clear() {
                clearInterval(this.nowTimes)
                this.nowTimes = null;
            },
            fitname() {
                if (localStorage.getItem('Authorization')) {
                    let userInfo = localStorage.getItem('Authorization');
                    let user = JSON.parse(userInfo);
                    // console.log(user);
                    this.loginName = user.realname;
                    this.$forceUpdate();
                    // console.log(this.loginName)
                } else {
                }
            },
            showLog(){
                this.logShow = true;
			},
			logOut(){
                this.logShow = false;
                let token = sessionStorage.getItem("token")
                let logUrl = appCfg.map.loginUrl+":9007/simple-user-center-server/api/v1.0/user/logout";
                this.$axios.get(logUrl,
                  {
                    headers: {'token': token}//设置header信息
                  })
                  .then(function (response) {
                        
                  })
                  .catch(function (error) {
                  });

                  this.$router.push('/logout');
                  sessionStorage.removeItem('token');
			},
            getUserName(){
                let token = this.getUrl("token");
                let _selt = this;
                let url = appCfg.map.loginUrl+":9007/simple-user-center-server/userCenter/auth/"+token;
                this.$axios.get(url)
                  .then(function (response) {
                    _selt.userName = response.data.data.name;
                  })
                  .catch(function (error) {
                  });
            },
            getUrl(name){
              let LocString = window.location.href;
              var rs = new RegExp("(^|)" + name + "=([^&]*)(&|$)", "gi").exec(LocString), tmp; 
              if (tmp = rs) { 
                    return tmp[2]; 
              } 
              return ""; 
              
            }
        },
        created() {
            this.timeFormate();
            this.nowTimes();
            this.getUserName();
           // this.userName = sessionStorage.getItem("username");
        },
        computed: {}
    }
</script>


<style scoped lang="scss">
    .date-info-cls {
        height: 100%;
        overflow: hidden;
        text-align: left;
        flex-direction: row;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
	.line {
		display: inline-block;
		width: 2px;
		height: 45px;
		background-color: rgba(22, 41, 62, 0.33);
		margin: 0 15px;
	}
    .date {
        display: flex;
        height: 100%;
        overflow: hidden;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }
	.user {
		display: flex;
		height: 100%;
		overflow: hidden;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
	}
	.loicon {
		cursor: pointer;

	}
	.logDiv {
		position: absolute;
		top: 65px;
		right: 10px;
		width: 130px;
		padding: 10px;
		background-color: #000000;
		z-index: 9999;
		color: #03e8eb;
		border: 1px solid #0b315e;
	}
	.items {
		padding: 0 10px;
		cursor: pointer;
	}
	.items span {
		font-size: 14px;
	}
</style>
