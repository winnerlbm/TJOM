/**
 * api接口统一管理
 */
import {get, post} from '@/common/http/http'
import appCfg from "@/config/AppCfg";


let baseUrl = process.env.VUE_APP_BASE_URL;
// let baseUrl = "http://"+window.location.host+"/";

/*核对用户是否登录*/
const checkLoginUser = params => post(baseUrl + 'login', params);

/*加载风场数据*/
const getWindyData = () => get(appCfg.windy.getUrl());

const getWfsFeature = (url) => get(url);

const getWeatherInfo = (url) => get(url)

export {
    checkLoginUser,
    getWindyData,
    getWfsFeature,
    getWeatherInfo
}