const { api } = require('../../config/api')
const { imgUrl } = require('../../config/config')
const app = getApp()

function fixImg(url) {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return imgUrl + url
}

Page({
  data: {
    goodsId: 0,
    goods: {},
    loading: true,
    paying: false
  },

  onLoad(options) {
    this.setData({ goodsId: options.id || 0 })
    this.loadDetail()
  },

  async loadDetail() {
    try {
      const res = await api.getGoodsDetail(this.data.goodsId)
      const goods = res.data || {}
      // logo 拼接前缀（images 已由后端拼接 basePath）
      if (goods.logo) {
        goods.logo = fixImg(goods.logo)
      }
      this.setData({ goods, loading: false })
    } catch (err) {
      console.error('获取商品详情失败', err)
      wx.showToast({ title: '加载失败', icon: 'none' })
      this.setData({ loading: false })
    }
  },

  // 预览图片
  previewImage(e) {
    const current = e.currentTarget.dataset.url
    const urls = this.data.goods.images || []
    wx.previewImage({ current, urls })
  },

  // 立即报名 → 下单 → 微信支付
  async doEnroll() {
    if (this.data.paying) return
    this.setData({ paying: true })

    try {
      // 1. 提交结算订单
      const settleRes = await api.submitSettlement({
        type: 'goods',
        goodsId: this.data.goodsId,
        buyNum: 1,
        payType: 'JSAPI',
        orderMode: 'oneself'
      })

      const settleData = settleRes.data || {}
      const orderId = settleData.orderInfo ? settleData.orderInfo.id : ''

      if (!orderId) {
        wx.showToast({ title: '下单失败', icon: 'none' })
        return
      }

      // 2. 发起支付
      const payRes = await api.doPay(orderId, 'JSAPI')
      const payData = payRes.data || {}

      if (payData.payment) {
        await this.wxPay(payData.payment)
      } else if (payData.payType === 'BALANCE') {
        this.onPaySuccess()
      } else {
        wx.showToast({ title: '支付异常', icon: 'none' })
      }
    } catch (err) {
      console.error('报名失败', err)
      wx.showToast({ title: '报名失败', icon: 'none' })
    } finally {
      this.setData({ paying: false })
    }
  },

  wxPay(payment) {
    return new Promise((resolve, reject) => {
      wx.requestPayment({
        timeStamp: payment.timeStamp,
        nonceStr: payment.nonceStr,
        package: payment.packageValue || payment.package,
        signType: payment.signType || 'MD5',
        paySign: payment.paySign,
        success: () => {
          this.onPaySuccess()
          resolve()
        },
        fail: (err) => {
          if (err.errMsg === 'requestPayment:fail cancel') {
            wx.showToast({ title: '已取消支付', icon: 'none' })
          } else {
            wx.showToast({ title: '支付失败', icon: 'none' })
          }
          reject(err)
        }
      })
    })
  },

  onPaySuccess() {
    wx.showToast({ title: '报名成功', icon: 'success' })
    setTimeout(() => {
      wx.navigateBack()
    }, 1500)
  },

  goBack() {
    wx.navigateBack()
  }
})
