let protocol = window.location.protocol; //协议
let host = window.location.hostname; //主机
let port = window.location.port;
const HOSTURL = process.env.NODE_ENV === 'development' ? 'https://smartmarket-openapi.dev.qooroo.cn:8443/' :
  protocol + "//" + host + ":" + port;
const API = {
  host: HOSTURL,

  adList: "/api/ad/adManage/list", // 广告列表
};
export default API;
