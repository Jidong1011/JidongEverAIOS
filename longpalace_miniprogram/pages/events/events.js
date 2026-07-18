const { api } = require('../../config/api')
const { imgUrl } = require('../../config/config')

function fixImg(url) {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return imgUrl + url
}

Page({
  data: {
    goodsList: []
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 })
    }
    this.loadGoods()
  },
  async loadGoods() {
    try {
      const res = await api.getGoodsList('service')
      const list = (res.data || []).map(item => {
        return Object.assign({}, item, {
          logo: fixImg(item.logo),
          image: fixImg(item.image)
        })
      })
      this.setData({ goodsList: list })
    } catch (err) {
      console.error('获取活动列表失败', err)
    }
  },
  goGoodsDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/eventDetail/eventDetail?id=' + id })
  }
})
