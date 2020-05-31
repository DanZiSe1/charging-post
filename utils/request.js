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
        'Authorization': wx.getStorageSync('unique_id')
      },
      success: function (res) {
        //console.log("success");
        wx.hideLoading();
        if (res.data.code == 0) {
          resolve(res)
        } else {
          wx.showToast({
            icon:'none',
            title:  res.data.message,
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