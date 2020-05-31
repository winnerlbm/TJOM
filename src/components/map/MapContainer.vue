<template>
    <div style="flex: 1">
        <div id="map">
            <info-container class="map-info-cls"/>
        </div>
    </div>
</template>

<script>
    import L from "leaflet";
    import appCfg from "@config/AppCfg"
    import {getWindyData, getWfsFeature} from '@api/api'
    import InfoContainer from "./InfoContainer";

    export default {
        name: "MapContainer",
        components: {InfoContainer},
        data() {
            return {
                highLayer: null
            };
        },
        //需要页面加载完执行的方法,可以写在$nextTick中
        mounted() {
            this.$nextTick(() => {
                this.$mapUtil.initMap('map')
                //this.getWindyData()
                this.$mapUtil.wmsLayer('NPWS:TjMap').addTo(this.$mapUtil.lMap)
                this.queryFeatureByClick('NPWS:TjMap', 2000, 'the_geom', this.$mapUtil.lMap)
            });
        },
        methods: {
            /*加载风场数据*/
            getWindyData() {
                getWindyData().then((data) => {
                    if (data && data.length > 0) {
                        this.$mapUtil.windyLayer(data).addTo(this.$mapUtil.lMap)
                    } else {
                        console.log('风场数据加载失败！')
                    }
                })
            },
            queryFeatureByClick(wfsName, maxCount, geomField, map) {
                this.$mapUtil.lMap.on('click', (evt) => {
                        if (evt.latlng) {
                            let lat = evt.latlng.lat, lng = evt.latlng.lng,
                                urlTemplate = appCfg.map.wfsRootUrl + "?service=WFS&request=GetFeature&version=1.0.0%20&typeName=" + wfsName + "&maxFeatures=" + maxCount + "&outputFormat=json&filter=%20%3CFilter%20xmlns=%22http://www.opengis.net/ogc%22%20xmlns:gml=%22http://www.opengis.net/gml%22%3E%20%3CIntersects%3E%20%3CPropertyName%3E" + geomField + "%3C/PropertyName%3E%20%3Cgml:Point%3E%20%3Cgml:coordinates%3E" + lng + "," + lat + "%3C/gml:coordinates%3E%20%3C/gml:Point%3E%20%3C/Intersects%3E%20%3C/Filter%3E"

                            getWfsFeature(urlTemplate).then((data) => {
                                if (this.highLayer) {
                                    map.removeLayer(this.highLayer)
                                }
                                if (data) {
                                    this.highLayer = L.geoJSON(data, {
                                        style: function (feature) {
                                            return {color: appCfg.common.hColor};
                                        }
                                    })
                                    this.highLayer.addTo(map)
                                } else {
                                    console.log("空间查询失败")
                                }
                            })
                        }

                    }
                )
            }
        }
    }
</script>


<style scoped>
    #map {
        width: 100%;
        height: 100%;
        margin: 0;
        overflow: hidden;
        cursor: pointer;
    }

    .map-info-cls {
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: 999;
    }
</style>
