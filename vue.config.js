//脚本压缩插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',//根路径 cli3.0以上使用publicPath
    assetsDir: 'assets',//静态资源目录(js,css,img,fonts)这些文件都可以写里面
    outputDir: 'dist',//打包的时候生成的一个文件名
    //html 的输出路径
    indexPath: "index.html",
    //是否在保存的时候使用 `eslint-loader` 进行检查。
    lintOnSave: false,
    //是否使用带有浏览器内编译器的完整构建版本
    runtimeCompiler: false,
    //babel-loader 默认会跳过 node_modules 依赖。
    transpileDependencies: [ /* string or regex */],
    //是否为生产环境构建生成 source map？
    productionSourceMap: true,
    //设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。
    crossorigin: "",
    //在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。
    integrity: false,
    configureWebpack: config => {
        if (process.env.NODE_ENV === "production") {
            // 为生产环境修改配置...
            config.mode = "production";
            // 这里修改下
            config.optimization.minimizer = [
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            drop_console: true, //console
                            drop_debugger: true,
                            pure_funcs: ['console.log'] //移除console
                        }
                    }
                })
            ]
            //打包文件大小配置
            config["performance"] = {
                "maxEntrypointSize": 10000000,
                "maxAssetSize": 30000000
            }
        } else {
            // 为开发环境修改配置...
            config.mode = "development";
        }
    },
    chainWebpack: config => {
        //目录别名配置
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@components', resolve('src/components'))
            .set('@utils', resolve('src/utils'))
            .set('@config', resolve('src/config'))
            .set('@api', resolve('src/api'))

        //loader配置
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, {esModule: false, limit: 4096}))

        config.module
            .rule('scss')
            .oneOf('vue')
            .use('px2rem-loader')
            .loader('px2rem-loader')
            .before('postcss-loader') // this makes it work.
            .options({remUnit: 54, remPrecision: 8})
            .end()
    },
    // 配置 webpack-dev-server 行为。
    devServer: {
        open: true,
        host: '127.0.0.1',
        port: 10999,
        https: false,
        hotOnly: false
        // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理
        //代理及跨域配置
        /*proxy: {
            '/api': {
                target: "http://app.rmsdmedia.com",
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    "^/api": ""
                }
            },
            '/foo': {
                target: '<other_url>'
            }
        }*/
    }
};