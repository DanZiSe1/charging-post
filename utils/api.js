// 
var host = 'https://test-evcs.91sdc.cn';

var getOrdersList = host + '/xcx/orders';//获取订单列表
var getOrdersDetails = host + '/xcx/order';//获取订单详细信息
var rechargeList = host + '/xcx/user/balance';//充值列表
var useRecharge = host + '/xcx/user/charge';//用户充值
var startCharging = host + '/xcx/charge/qrcode';// 开始充电
var stopCharging = host + '/xcx/charge/stop';// 结束充电
var getChargesList = host + '/api/equip/stations';//获取附近的充电站列表
var getStationDetail = host + '/api/equip/station/';//返回充电站详情
var getEquipmentInfo = host + '/api/equip/connector';//获取设备信息
var bindCarNum = host + '/xcx/user/carnum/bind';//绑定车牌号
var unBindCarNum = host + '/xcx/user/carnum/unbind';//解绑车牌号
var getPricePolicy = host + '/api/equip/business_policy';//获取设备充电策略
var getOpenId = host + '/xcx/bind2';//获取openid
var getPhoneNum = host + '/xcx/decrypt/mobile';//获取openid
var getUserInfo = host + '/xcx/user/info';//获取用户信息
var getChargeInfo = host + '/xcx/orders/charge';//获取充电信息
var getChargeDetail = host + '/xcx/orders/detail';//订单充电明细

module.exports={
  getOrdersList,
  getOrdersDetails,
  rechargeList,
  useRecharge,
  startCharging,
  stopCharging,
  getChargesList,
  getStationDetail,
  getEquipmentInfo,
  bindCarNum,
  unBindCarNum,
  getPricePolicy,
  getOpenId,
  getPhoneNum,
  getUserInfo,
  getChargeInfo,
  getChargeDetail
}
