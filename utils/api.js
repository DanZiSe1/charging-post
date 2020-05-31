// 
var host = 'https://test-evcs.91sdc.cn';

var wxBind = host + '/xcx/bind';//微信绑定
var getOrdersList = host + '/xcx/orders';//获取订单列表
var getChargesList = host + '/api/equip/stations';//获取附近的充电站列表
var getStationDetail = host + '/api/equip/station/:id';//返回充电站详情


module.exports={
  wxBind,
  getOrdersList,
  getChargesList,
  getStationDetail
}
