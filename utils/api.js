// 
var host = 'https://test-evcs.91sdc.cn';

var wxBind = host + '/xcx/bind';//微信绑定
var getOrdersList = host + '/xcx/orders';//获取订单列表
var getOrdersDetails = host + '/xcx/order';//获取订单详细信息
var rechargeList = host + '/xcx/user/balance';//充值列表
var useRecharge = host + '/xcx/user/charge';//用户充值
// var QRcode = host + '/xcx/qrcode';//生成订单免停车费二维码
var startCharging = host + '/xcx/charge/qrcode';// 开始充电
var stopCharging = host + '/xcx/charge/stop';// 结束充电
var getChargesList = host + '/api/equip/stations';//获取附近的充电站列表
var getStationDetail = host + '/api/equip/station/';//返回充电站详情
var getEquipmentInfo = host + '/api/equip/connector';//获取设备信息
var bindCarNum = host + '/xcx/user/carnum/bind';//绑定车牌号
var unBindCarNum = host + '/xcx/user/carnum/unbind';//解绑车牌号
var getPricePolicy = host + '/api/equip/business_policy';//获取设备充电策略
var getOpenId = host + '/xcx/bind2';//获取openid
var getPhoneNumber = host + '/xcx/data/decrypt';//获取手机号

module.exports={
  wxBind,
  getOrdersList,
  getOrdersDetails,
  rechargeList,
  useRecharge,
  // QRcode,
  startCharging,
  stopCharging,
  getChargesList,
  getStationDetail,
  getEquipmentInfo,
  bindCarNum,
  unBindCarNum,
  getPricePolicy,
  getOpenId,
  getPhoneNumber
}
