const app = getApp();

// 封装微信的request
function request(requestState,url, data = {}, method = "GET") {
  return new Promise(function (resolve, reject) {
    wx.showLoading({
      title: "加载中...",
    })
    var headerValue = {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    }
    var AuthorHeaderValue = {
      'Content-Type': 'application/json',
      'accept': 'application/json',
      'Authorization': wx.getStorageSync('openid') || app.globalData.openid
    }
    console.log(wx.getStorageSync('openid'), app.globalData.openid, 'openid......')
    wx.request({
      url: url,
      data: data,
      method: method,
      header: requestState ? AuthorHeaderValue : headerValue,
      success: function (res) {
        // console.log(res, "success......");
        wx.hideLoading();
        if (res.statusCode == 200) {
          resolve(res.data)
        } else {
          wx.showToast({
            icon:'none',
            title: res.errMsg,
          })
          reject(res);
        }
      },
      fail: function (err) {
        reject(err);
      }
    })
  });
}

module.exports={
  request
}