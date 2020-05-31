// 
var host = 'https://test-evcs.91sdc.cn';

var wxBind = host + '/xcx/bind';//微信绑定
var getOrdersList = host + '/xcx/orders';//获取订单列表
var getOrdersDetails = host + '/xcx/orders';//获取订单详细信息
var rechargeList = host + '/xcx/user/balance';//充值列表
var useRecharge = host + '/xcx/user/charge';//用户充值
// var QRcode = host + '/xcx/qrcode';//生成订单免停车费二维码
var startCharging = host + '/xcx/charge/qrcode';// 开始充电
<<<<<<< HEAD
=======
var stopCharging = host + '/xcx/charge/stop';// 结束充电

>>>>>>> 6f7afb023e0cc3be091111bead8dfbd5ea9b8c4a
var getChargesList = host + '/api/equip/stations';//获取附近的充电站列表
var getStationDetail = host + '/api/equip/station/:id';//返回充电站详情
var getEquipmentInfo = host + '/api/equip/connector';//获取设备信息


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
  getEquipmentInfo
}
