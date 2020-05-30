//indexdetail.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  // 查看全部
  getLookAll: function(){
    wx.navigateTo({
      url: '/pages/priceinfo/priceinfo',
    })
  }
})
