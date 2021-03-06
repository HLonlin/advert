let protocol = window.location.protocol; //协议
let host = window.location.hostname; //主机
let port = window.location.port;
const HOSTURL = process.env.NODE_ENV === 'development' ? 'https://smartmarket-openapi.dev.qooroo.cn/' : 'https://smartmarket-openapi.dev.qooroo.cn/';
// protocol + "//" + host + ":" + port;
const API = {
    host: HOSTURL,
    // adList: "/api/ad/adManage/list", // 广告列表
    // imageShowTime:"/api/ad/adManage/adImageShowTime", //图片展示时长
    adList: "/api/market/marketManage/list", // 广告列表
    imageShowTime: "/api/market/marketManage/adImageShowTime", //图片展示时长
};
export default API;