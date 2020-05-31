import appCfg from "@config/AppCfg"
import L from "leaflet";
//直接引入leaflet插件库
import 'leaflet.chinatmsproviders'
import 'leaflet-velocity'

const mapUtil = {
    lMap: null,
    initMap(mapDivId) {
        //初始化地图对象
        let map = L.map(mapDivId, {
            center: appCfg.map.center,
            zoom: appCfg.map.zoom,
            maxZoom: appCfg.map.maxZoom,
            minZoom: appCfg.map.minZoom,
            zoomControl: false,
            attributionControl: false
        })

        //初始化底图-天地图
        L.tileLayer.chinaProvider('TianDiTu.Satellite.Map', {
            maxZoom: appCfg.map.maxZoom,
            minZoom: appCfg.map.minZoom
        }).addTo(map);
        /*L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion', {
            maxZoom: appCfg.map.maxZoom,
            minZoom: appCfg.map.minZoom
        }).addTo(map);*/

        mapUtil.lMap = map;
    },
    //加载风场
    windyLayer(data) {
        return L.velocityLayer({
            displayValues: false,
            displayOptions: {
                velocityType: "风场",
                position: "bottomleft",
                emptyString: "无风场数据",
                angleConvention: "bearingCW",
                displayPosition: "bottomleft",
                displayEmptyString: "无风场数据"
            },
            data: data,

            // OPTIONAL
            minVelocity: 0,
            maxVelocity: 10,
            velocityScale: 0.005,
            colorScale: ["rgb(255,255,255)", "rgb(255,255,255)", "rgb(255,255,255)", "rgb(255,255,255)", "rgb(255,255,255)"],
            onAdd: null,
            onRemove: null,
            opacity: 0.97,

            particleMultiplier: 1 / 300,
            lineWidth: 1,
            frameRate: 15
        });
    },
    //加载wms
    wmsLayer(layerName) {
        return L.tileLayer.wms(appCfg.map.mapRootUrl, { // 链接要改对应的
            layers: layerName,//需要加载的图层,就是我们刚刚新建的。map 和 图层名称
            format: 'image/png',//返回的数据格式
            transparent: true,
            crs: L.CRS.EPSG4326
        })
    }
}
export default mapUtil