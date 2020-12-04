var innerNet = !!window.location.host.match("172");
if(innerNet){//内网
    var mapRootIp = "172.26.1.18";
    var gisApiIp = "172.26.1.15";
    var jumpIp = "172.26.1.11";
    var loginIp = "172.26.1.11";
    var xzcfIp = "172.26.1.12";
    var gisWebIp = "172.26.1.18";
}else{//外网
    var mapRootIp = "202.99.99.49";
    var gisApiIp = "202.99.99.49";
    var jumpIp = "202.99.99.49";
    var loginIp = "202.99.99.49";
    var xzcfIp = "202.99.99.49";
    var gisWebIp = "202.99.99.49";
}


const appCfg = {
    common: {
        nColor: '#FFFFFF',
        cColor: '#11dcf2',
        hColor: '#EE5522',
        chartLabelFont: 0.26
    },
    map: {
        mapRootUrl: 'http://'+mapRootIp+':6060/geoserver/sf/wms',
        wfsRootUrl: 'http://'+mapRootIp+':6060/geoserver/sf/ows',
        //接口外网202.99.99.49 接口内网172.26.1.15 地图外网114.116.231.97 地图内网172.26.1.18
        gisApiUrl: 'http://'+gisApiIp+':8100/dc-server/',
        userKey:"9b10ae3a-bf25-46db-ac20-c0e8963367e0",
        //172.26.1.11
        jumpUrl:"http://"+jumpIp,
        //172.26.1.11
        loginUrl:"http://"+loginIp,
        //http://172.26.1.18:6080/onemap/map
        gisWebUrl:"http://"+gisWebIp+":6080/onemap/#/map",
        //172.26.1.12
        xzcfUrl:"http://"+xzcfIp,
        minZoom: 4,
        maxZoom: 18,
        zoom: 10,
        center: [39.12, 117.20]
    },
    windy: {
        //获取风场数据路径
        getUrl(curDate) {
            //eg: http://yun.fpi-inc.site/fpi-windy-server/windfield/api/v1.0/show-windy/common/cn/2020052813.json
            //时间格式：年月日小时（24小时制）
            if(!curDate){
                let year, month, day, hour;
                year = new Date().getFullYear();
                month = new Date().getMonth() + 1;
                month = month < 10 ? '0' + month : '' + month;
                day = new Date().getDate();
                day = day < 10 ? '0' + day : '' + day;
                hour = new Date().getHours();
                hour = hour < 10 ? '0' + hour : '' + hour;
                curDate = year + month + day + hour;
            }
            return 'http://yun.fpi-inc.site/fpi-windy-server/windfield/api/v1.0/show-windy/common/cn/' + curDate + '.json'
        }
    }
};


export default appCfg;