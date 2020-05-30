// 封装微信的request
function request(url, data = {}, method = "GET") {
  return new Promise(function (resolve, reject) {
    wx.showLoading({
      title: "正在加载中...",
    })
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'X-Nideshop-Token': wx.getStorageSync('token')
      },
      success: function (res) {
        //console.log("success");
        wx.hideLoading();
        if (res.code == 0) {
          resolve(res)
        } else {
          reject(res);
        }
      },
      fail: function (err) {
        //console.log("fail")
        reject(err)
      }
    })
  });
}

// // 使用get方式
// util.request(api,{ 参数名: 参数值 }).then(function(res) {
//   //console.log(res)
//   if (res.data.success) {
// 	// do something
//   }
// });

// // 使用post方式
// util.request(api,{ 参数名: 参数值 },'POST').then(function(res) {
//   //console.log(res)
//   if (res.data.success) {
// 	// do something
//   }
// });
module.exports={
  request
}