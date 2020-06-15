const appCfg = {
    common: {
        nColor: '#FFFFFF',
        cColor: '#11dcf2',
        hColor: '#EE5522',
        chartLabelFont: 0.26
    },
    map: {
        mapRootUrl: 'http://114.116.231.97:7080/geoserver/NPWS/wms',
        wfsRootUrl: 'http://114.116.231.97:7080/geoserver/NPWS/ows',
        minZoom: 4,
        maxZoom: 18,
        zoom: 7,
        center: [39.12, 117.20]
    },
    windy: {
        //获取风场数据路径
        getUrl() {
            //eg: http://yun.fpi-inc.site/fpi-windy-server/windfield/api/v1.0/show-windy/common/cn/2020052813.json
            //时间格式：年月日小时（24小时制）
            let year, month, day, hour
            year = new Date().getFullYear()
            month = new Date().getMonth() + 1
            month = month < 10 ? '0' + month : '' + month
            day = new Date().getDate()
            day = day < 10 ? '0' + day : '' + day
            hour = new Date().getHours()
            hour = hour < 10 ? '0' + hour : '' + hour
            let curDate = year + month + day + hour
            console.log(curDate)
            return 'http://yun.fpi-inc.site/fpi-windy-server/windfield/api/v1.0/show-windy/common/cn/' + curDate + '.json'
        }
    }
};


export default appCfg;