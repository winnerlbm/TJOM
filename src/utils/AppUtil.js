const AppUtil = {
    /**
     * 格式化日期
     * @param  {string} str 需要格式化的样子
     * @param  {String|Date} day 日期对象或者日期字符串
     * @return  {String}
     * @template  formatDate('YYYY年mm月dd日hh小时ff分钟ss秒 星期w','2017/1/1 12:13:14') 返回：2017年01月01日12小时13分钟14秒 星期日;
     */

    formatDate: function (str, day) {

        let d;
        let arr;

        let type = Object.prototype.toString.call(day)
        if (type === '[object Date]') {
            d = day
        } else if (type === '[object String' && (arr = day.match(/(\d{4})[-/](\d{1,2})[-/](\d{1,2})(?:\s+(\d{1,2}):(\d{1,2}):(\d{1,2}))?/))) {
            arr = arr.slice(0, arr[4] ? 7 : 4)
            arr[2] = arr[2] - 1
            d = new (Function.prototype.bind.apply(Date, arr))()
        } else {
            return ''
        }

        const obj = {
            'yyyy': d.getFullYear(),
            'yy': ('' + d.getFullYear()).slice(-2),
            'm': d.getMonth() + 1,
            'mm': ('0' + (d.getMonth() + 1)).slice(-2),
            'd': d.getDate(),
            'dd': ('0' + d.getDate()).slice(-2),
            'h': d.getHours(),
            'hh': ('0' + d.getHours()).slice(-2),
            'f': d.getMinutes(),
            'ff': ('0' + d.getMinutes()).slice(-2),
            's': d.getSeconds(),
            'ss': ('0' + d.getSeconds()).slice(-2),
            'w': ['日', '一', '二', '三', '四', '五', '六'][d.getDay()]
        }
        return ('' + str).replace(/([a-z]+)/ig, function (k) {
            return obj[k.toLowerCase()] || ''
        })
    },
    Layout: {
        //模块切换，滚动到顶部
        scrollToTop: function () {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    },
    Cookies: {
        //保存cookie
        setCookie: function (c_name, value, expiredays) {
            let exdate = new Date();
            exdate.setDate(exdate.getDate() + expiredays);
            document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
        },
        //获取cookie
        getCookie: function (name) {

            // var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            // // console.log(arr);
            // // console.log(document.cookie.match(reg));
            // if (document.cookie.match(reg)) {
            //     arr = document.cookie.match(reg);
            //     return (arr[2]);
            // } else {
            //     return null;
            // }
            let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr === document.cookie.match(reg))
                return unescape(arr[2]);
            else return null;
        },
        //删除cookie
        delCookie: function (name) {
            let exp = new Date();
            exp.setTime(exp.getTime() - 1);
            let cval = this.getCookie(name);
            if (cval != null) {
                document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
            }
        }
    }
}

export default AppUtil;