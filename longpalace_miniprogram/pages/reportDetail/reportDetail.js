const { api } = require('../../config/api')

Page({
  data: {
    id: null,
    article: null,
    aDate : null,
    loading: true
  },
  onLoad(options) {
    const id = options.id
    this.setData({ id })
    this.loadDetail(id)
  },
  async loadDetail(id) {
    try {
      const res = await api.getArticleDetail(id)
      const article = (res.data && res.data.articleInfo) || {}
      const date = new Date(article.updateTime)
      const aDate = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDay() +'日 '+ date.getHours() + ':' + date.getMinutes();
      this.setData({ article,aDate })
      console.log('artical:',article)
    } catch (err) {
      console.error('获取文章详情失败', err)
    } finally {
      this.setData({ loading: false })
    }
  }
})
