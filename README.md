# onemap

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


***
###GeoServer空间查询请求格式说明
点查询

    http://***:8060/geoserver/**/ows?service=WFS&request=GetFeature&version=1.0.0
        &typeName=图层服务名称&maxFeatures=2000&outputFormat=json&filter=
        <Filter xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">
            <Intersects>
                <PropertyName>GEOM</PropertyName>
                <gml:Point>
                    <gml:coordinates>113.8037,34.43554</gml:coordinates>
                </gml:Point>
            </Intersects>
        </Filter>
    
线查询

    http://***:8060/geoserver/**/ows?service=WFS&request=GetFeature&version=1.0.0
        &typeName=图层服务名称&maxFeatures=2000&outputFormat=json&filter=
        <Filter xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">
            <Within>
                <PropertyName>GEOM</PropertyName>
                <gml:LineString>
            <gml:coordinates>113.763,34.435 113.763,34.5 113.844,34.5 113.844,34.435</gml:coordinates>
                </gml:LineString>
            </Within>
        </Filter>
    
面查询

    http://***:8060/geoserver/**/ows?service=WFS&request=GetFeature&version=1.0.0
        &typeName=图层服务名称&maxFeatures=2000&outputFormat=json&filter=
        <Filter xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">
        <Intersects><PropertyName>GEOM</PropertyName><gml:Polygon>
            <gml:outerBoundaryIs>        
                <gml:LinearRing>
                　	<gml:coordinates>113.763,34.435 113.763,34.5 113.763,34.435</gml:coordinates>
                </gml:LinearRing>
            </gml:outerBoundaryIs>
        </gml:Polygon></Intersects></Filter>

这里如果需要进行属性查询，可添加属性查询条件：

     var url = *** +'geoserver/**/ows?' 
                + 'service=WFS&request=GetFeature&version=1.0.0&typeName=图层服务名称&maxFeatures=1&outputFormat=json'
            + '&FILTER=<Filter>' 
            + '<And>'
            + '<PropertyIsEqualTo><PropertyName>ST_NAME</PropertyName><Literal>' + stName + '</Literal></PropertyIsEqualTo>'
            + '<PropertyIsEqualTo><PropertyName>NAME</PropertyName><Literal>' + setloc + '</Literal></PropertyIsEqualTo>' 
            + '</And>'
           

