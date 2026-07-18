const { api } = require('../../config/api')
const app = getApp()

Page({
  data: {
    articles: [],
    pastArticles: [],
    today: ''
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 })
    }
    const now = new Date()
    const y = now.getFullYear()
    const m = now.getMonth() + 1
    const d = now.getDate()
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    this.setData({
      today: `${y}年${m}月${d}日 · ${weekdays[now.getDay()]}`
    })
    this.loadArticles()
  },
  async loadArticles() {
    try {
      const res = await api.getArticleList({ page: 1, pageSize: 8 })
      const data = res.data || {}
      const content = data.content || []
      const all = content.map(item => {
        return Object.assign({}, item, {
          fmtDate: app.formatDate(item.updateTime || item.createTime)
        })
      })
      this.setData({
        articles: all.slice(0, 3),
        pastArticles: all.slice(3, 8)
      })
    } catch (err) {
      console.error('获取文章列表失败', err)
    }
  },
  goDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/reportDetail/reportDetail?id=' + id })
  },
  goReportList() {
    wx.navigateTo({ url: '/pages/reportList/reportList' })
  },
  copyText(e) {
    const text = e.currentTarget.dataset.text
    wx.setClipboardData({
      data: text,
      success() {
        wx.showToast({ title: '已复制到剪贴板', icon: 'success' })
      }
    })
  }
})
