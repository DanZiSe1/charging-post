Component({
  data: {
    selected: 0,
    color: "#333",
    selectedColor: "#333",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/imgs/charge.png",
      selectedIconPath: "/imgs/charge_light.png",
      text: "充电站"
    }, {
      pagePath: "/pages/scan/scan",
      iconPath: "/imgs/scan_light.png",
      selectedIconPath: "/imgs/scan_light.png",
      text: "扫码充电"
    }, {
      pagePath: "/pages/mine/mine",
      iconPath: "/imgs/mine.png",
      selectedIconPath: "/imgs/mine_light.png",
      text: "我的"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})