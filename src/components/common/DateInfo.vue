<template>
    <div class="date-info-cls">
        <span class="date">
			<span class="nowtime"
				  style="color: #e2e9e9;font-size: 25px;font-family: lcd,serif;margin-right: 10px;">
			{{nowTime}}
			</span>
			<span style="font-family: lcd;font-size: 14px;color: #e2e9e9;">{{nowDate}}</span>
			<!--<span style="font-family: MicrosoftYaHei,serif;font-size: 16px;color: #e2e9e9;">{{nowWeek}}</span>-->
		</span>
		<span class="line"></span>
		<span class="user">
			<span style="color: #e2e9e9;font-size: 16px;font-family: lcd,serif;margin-right: 16px;">
			{{userName}}
			</span>
			<span style="font-family: lcd;font-size: 14px;color: #e2e9e9;">退出</span>
		</span>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'

    export default {
        name: 'DateInfo',
        components: {},
        data() {
            return {
                isshow: true,
                loginName: '',
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
            }
        },
        created() {
            this.timeFormate()
            this.nowTimes()
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
		background-color: rgba(12, 79, 158, 0.62);
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
</style>
