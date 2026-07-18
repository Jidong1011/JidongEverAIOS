const { api } = require('../../config/api')
const app = getApp();

Page({
  data: {
    list: [],
    page: 1,
    pageSize: 10,
    totalPage: 1,
    loading: false
  },
  onLoad() {
    this.loadList()
  },
  async loadList() {
    if (this.data.loading) return
    this.setData({ loading: true })
    try {
      const res = await api.getArticleList({
        page: this.data.page,
        pageSize: this.data.pageSize
      })
      const data = res.data || {}
      const content = data.content || []
      this.setData({
        list: this.data.page === 1 ? content : this.data.list.concat(content),
        totalPage: data.totalPage || 1
      })
    } catch (err) {
      console.error('获取文章列表失败', err)
    } finally {
      this.setData({ loading: false })
    }
  },

  onReachBottom() {
    if (this.data.page < this.data.totalPage) {
      this.setData({ page: this.data.page + 1 })
      this.loadList()
    }
  },

  goDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/reportDetail/reportDetail?id=' + id })
  },
})
