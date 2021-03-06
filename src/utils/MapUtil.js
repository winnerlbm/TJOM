import appCfg from "@config/AppCfg"
import L from "leaflet";
//直接引入leaflet插件库
import 'leaflet.chinatmsproviders'
import 'leaflet-draw'
import "leaflet.markercluster"
import {velocityLayer} from 'leaflet-velocity-ts-module'

var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
var PI = 3.1415926535897932384626;
var a = 6378245.0;
var ee = 0.00669342162296594323;
const mapUtil = {
    lMap: null,
    baseMapLayer:null, //底图
    annoMapLayer:null,
    layerTemps:[],
    initMap(mapDivId) {
        //初始化地图对象
        let map = L.map(mapDivId, {
            center: appCfg.map.center,
            zoom: appCfg.map.zoom,
            maxZoom: appCfg.map.maxZoom,
            minZoom: appCfg.map.minZoom,
            zoomControl: false,
            attributionControl: false
        });

        //初始化底图-天地图
        /*this.baseMapLayer = L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
            maxZoom: appCfg.map.maxZoom,
            minZoom: appCfg.map.minZoom
        }).addTo(map);*/


        this.baseMapLayer = L.tileLayer.chinaProvider('Geoq.Tecent.Dark', {
            maxZoom: appCfg.map.maxZoom,
            minZoom: appCfg.map.minZoom
        }).addTo(map);


        mapUtil.lMap = map;
    },
    //加载风场
    windyLayer(data) {
        return velocityLayer({
            //效率优先
            /*displayValues: true,
            maxVelocity: 10,
            colorScale: ['#ffffff'],
            particleMultiplier: 1 / 900,
            velocityScale: 0.008,
            data: data*/

            //效果优先
            /*displayValues: false,
            displayOptions: {
                velocityType: "风场",
                position: "bottomleft",
                emptyString: "无风场数据",
                angleConvention: "bearingCW",
                displayPosition: "bottomleft",
                displayEmptyString: "无风场数据"
            },*/
            data: data,
            // OPTIONAL
            minVelocity: 0,
            maxVelocity: 10,
            velocityScale: 0.008,
            dimension: 4,
            colorScale: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],
            onAdd: null,
            onRemove: null
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
    },
    //加载热力图
    heatmapLayer(map,heatData) {
        /*let heatData = {
            max: 30,
            data: [
                {lat: 39.64, lng: 117.7728, count: 10},
                {lat: 38.75, lng: 116.55, count: 30},
                {lat: 40.15, lng: 119.4667, count: 15},
                {lat: 41.35, lng: 117.9167, count: 22},
                {lat: 39.561, lng: 120.214, count: 16},
                {lat: 38.5036, lng: 117.685, count: 13},
                {lat: 40.0477, lng: 118.1227, count: 25},
                {lat: 40.0326, lng: 119.719, count: 19},
                {lat: 38.9003, lng: 118.3024, count: 11},
                {lat: 40.2085, lng: 119.6918, count: 13}
            ]
        };*/

        let cfg = {
            // radius should be small ONLY if scaleRadius is true (or small radius is intended)
            "radius": .008,
            "maxOpacity": .65,
            // scales the radius based on map zoom
            "scaleRadius": true,
            // if set to false the heatmap uses the global maximum for colorization
            // if activated: uses the data maximum within the current map boundaries
            //   (there will always be a red spot with useLocalExtremas true)
            "useLocalExtrema": true,
            // which field name in your data represents the latitude - default "lat"
            latField: 'lat',
            // which field name in your data represents the longitude - default "lng"
            lngField: 'lng',
            // which field name in your data represents the data value - default "value"
            valueField: 'count'
        };

        let heatmapLayer = new HeatmapOverlay(cfg).addTo(map);
        heatmapLayer.setData(heatData);
        return heatmapLayer;
    },
    //通过图层id，移除指定图层
    removeLayer(layerId,map){
        map.eachLayer(function (layer) {
           // map.removeLayer(layer);
            console.log(layer);
        });
    },
    changeBaseMap(map,baseType){
        if(map.hasLayer(this.baseMapLayer)&&this.baseMapLayer){
            map.removeLayer(this.baseMapLayer);
        }
        if(map.hasLayer(this.annoMapLayer)&&this.annoMapLayer){
            map.removeLayer(this.annoMapLayer);
        }
        if(baseType == "PurplishBlue"){//蓝色智图
            this.baseMapLayer = L.tileLayer.chinaProvider('Geoq.Tecent.Dark', {
                maxZoom: appCfg.map.maxZoom,
                minZoom: appCfg.map.minZoom
            }).addTo(map);
        }else if(baseType == "Warm"){//暖色版
            this.baseMapLayer = L.tileLayer.chinaProvider('Geoq.Normal.Warm', {
                maxZoom: appCfg.map.maxZoom,
                minZoom: appCfg.map.minZoom
            }).addTo(map);
        }else if(baseType == "tdtimg"){
            //初始化底图-天地图
            this.baseMapLayer = L.tileLayer.chinaProvider('GaoDe.Satellite.Map', {
                maxZoom: appCfg.map.maxZoom,
                minZoom: appCfg.map.minZoom
            }).addTo(map);
            this.annoMapLayer = L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion', {
                maxZoom: appCfg.map.maxZoom,
                minZoom: appCfg.map.minZoom
            }).addTo(map);
        }else if(baseType == "tdtvec"){
            //初始化底图-天地图
            this.baseMapLayer = L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
                maxZoom: appCfg.map.maxZoom,
                minZoom: appCfg.map.minZoom
            }).addTo(map);
            /*this.annoMapLayer = L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', {
                maxZoom: appCfg.map.maxZoom,
                minZoom: appCfg.map.minZoom
            }).addTo(map);*/
        }else if(baseType == "tdtter"){
            //初始化底图-天地图
            this.baseMapLayer = L.tileLayer.chinaProvider('TianDiTu.Terrain.Map', {
                maxZoom: appCfg.map.maxZoom,
                minZoom: appCfg.map.minZoom
            }).addTo(map);
            this.annoMapLayer = L.tileLayer.chinaProvider('TianDiTu.Terrain.Annotion', {
                maxZoom: appCfg.map.maxZoom,
                minZoom: appCfg.map.minZoom
            }).addTo(map);
        }
        this.baseMapLayer.setZIndex(0);
    },
    createPointMarker(proper,img){
        if(proper.latitude&&proper.longitude&&proper.latitude!=""&&proper.longitude!=""&&proper.latitude!="null"&&proper.longitude!="null"){
            let mcIcon = L.icon({
                iconUrl: img ,
                iconSize: [30, 30],
                iconAnchor: [10, 20],
                popupAnchor: [6, -12],
                shadowSize: [68, 95],
                shadowAnchor: [22, 94]
            });

            return L.marker([ proper.latitude,proper.longitude],{
                icon:mcIcon
            });
        }else{
            return null;
        }
    },
    createPointMarkerByLgnt(proper,img){
        if(proper.lat&&proper.lng&&proper.lat!=""&&proper.lng!=""){
            let mcIcon = L.icon({
                iconUrl: img ,
                iconSize: [30, 30],
                iconAnchor: [10, 20],
                popupAnchor: [6,-12],
                shadowSize: [68, 95],
                shadowAnchor: [22, 94]
            });
            return L.marker([ proper.lat,proper.lng],{
                icon:mcIcon
            });
        }else{
            return null;
        }
    },
    createMarkerByLgnt(langs,img){
        let mcIcon = L.icon({
            iconUrl: img ,
            iconSize: [25, 35],
            iconAnchor: [10, 20],
            popupAnchor: [6,-12],
            shadowSize: [68, 95],
            shadowAnchor: [22, 94]
        });
        return L.marker([langs[1],langs[0]],{
            icon:mcIcon
        });
        
    },
    createLayerGroup(markers,map){
        return L.layerGroup(markers);
    },
    addTemLayer(layerId,layer){
        this.layerTemps.push({layerId:layerId,layer:layer});
    },
    removeTemLayer(layerId){
        this.layerTemps.some((item,i) =>{
            if(item.layerId == layerId){
                this.lMap.removeLayer(item.layer);
                this.layerTemps.slice(i,1);
            }
        });
    },
    getTempLayer(layerId){
        let layerGroup = null;
        this.layerTemps.some((item,i) =>{
            if(item.layerId == layerId){
                layerGroup = item.layer;
            }
        });
        return layerGroup;
    },
    wgs84togcj02(lng, lat){
        var dlat = this.transformlat(lng - 105.0, lat - 35.0);
        var dlng = this.transformlng(lng - 105.0, lat - 35.0);
        var radlat = lat / 180.0 * PI;
        var magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
        var mglat = lat + dlat;
        var mglng = lng + dlng;
        return [mglng, mglat];
    },
    transformlat(lng, lat) {
        var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
        return ret;
    },
    transformlng(lng, lat) {
        var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
        return ret;
    }

};
export default mapUtil