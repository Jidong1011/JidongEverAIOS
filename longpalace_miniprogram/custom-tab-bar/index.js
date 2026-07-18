Component({
  data: {
    selected: 0,
    list: [
      { pagePath: "/pages/index/index", text: "首页", icon: "首" },
      { pagePath: "/pages/daily/daily", text: "今日", icon: "今" },
      { pagePath: "/pages/events/events", text: "活动", icon: "会" },
      { pagePath: "/pages/member/member", text: "我的", icon: "我" }
    ]
  },
  methods: {
    switchTab(e) {
      const idx = e.currentTarget.dataset.index
      const url = this.data.list[idx].pagePath
      wx.switchTab({ url })
    }
  }
})
