const { api } = require('../../config/api')
const app = getApp()

Page({
  data: {
    inviteCode: '',
    articleCount: 0,
    eventCount: 0,
    memberCount: 0
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
    this.loadStats()
  },
  async loadStats() {
    try {
      const [articleRes, eventRes, memberRes] = await Promise.all([
        api.getArticleCount(),
        api.getGoodsCount('service'),
        api.getStoreUserCount()
      ])
      this.setData({
        articleCount: (articleRes.data && articleRes.data.total) || 0,
        eventCount: (eventRes.data && eventRes.data.total) || 0,
        memberCount: (memberRes.data && memberRes.data.total) || 0
      })
    } catch (err) {
      console.error('获取统计数据失败', err)
    }
  },
  onInputCode(e) {
    this.setData({ inviteCode: e.detail.value })
  },
  unlock() {
    const code = this.data.inviteCode.trim()
    if (!code) {
      wx.showToast({ title: '请输入邀请码', icon: 'none' })
      return
    }
    wx.showToast({ title: '邀请码已记录', icon: 'none' })
  },

  scrollToJoin() {
    wx.pageScrollTo({ selector: '#join', duration: 300 })
  },

  goDaily() {
    wx.switchTab({ url: '/pages/daily/daily' })
  },

  goReportList() {
    wx.navigateTo({
      url: '/pages/reportList/reportList',
    })
  }
})
