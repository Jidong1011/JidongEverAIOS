const { api } = require('../../config/api')
const app = getApp()

Page({
  data: {
    activeTab: 0,
    gradeLevel: 0,
    couponCount: 0,
    showPayPopup: false,
    payStep: 1,
    useCoupon: true,
    couponInfo: null,
    useCouponInfo: { amount: 0, id: '' },
    memberGrade: null,
    payAmount: '0',
    paying: false
  },
  onLoad() {
    const userInfo = app.getUserInfo()
    const gradeLevel = userInfo && userInfo.gradeInfo ? userInfo.gradeInfo.grade : 0
    this.setData({
      gradeLevel,
      activeTab: gradeLevel >= 2 ? 1 : 0
    })
    this.loadAsset()
  },
  async loadAsset() {
    try {
      const res = await api.getUserAsset()
      const asset = res.data && res.data.asset ? res.data.asset : {}
      this.setData({
        couponCount: asset.coupon || 0
      })
    } catch (err) {
      console.error('获取资产失败', err)
    }
  },
  switchTab(e) {
    this.setData({ activeTab: Number(e.currentTarget.dataset.index) })
  },
  async upgrade() {
    wx.showLoading({ title: '加载中' })
    try {
      const res = await api.prePay('memberGrade')
      wx.hideLoading()
      const data = res.data || {}
      const couponInfo = data.canUseCouponInfo || null
      this.setData({
        showPayPopup: true,
        payStep: 1,
        couponInfo,
        useCoupon: !!couponInfo,
        useCouponInfo: couponInfo ? { amount: couponInfo.amount || 0, id: couponInfo.userCouponId || '' } : { amount: 0, id: '' }
      })
    } catch (err) {
      wx.hideLoading()
      console.error('prePay失败', err)
    }
  },
  noop() {},
  closePayPopup() {
    this.setData({ showPayPopup: false, payStep: 1, paying: false })
  },
  toggleCoupon() {
    if (this.data.useCoupon) {
      this.setData({ useCoupon: false, useCouponInfo: { amount: 0, id: '' } })
    } else {
      const couponInfo = this.data.couponInfo
      this.setData({
        useCoupon: true,
        useCouponInfo: couponInfo ? { amount: couponInfo.amount || 0, id: couponInfo.userCouponId || '' } : { amount: 0, id: '' }
      })
    }
  },
  goPayStep2() {
    this.setData({ payStep: 2 })
  },
  backPayStep1() {
    this.setData({ payStep: 1 })
  },
  async doPay() {
    if (this.data.paying) return
    this.setData({ paying: true })

    try {
      const userInfo = app.getUserInfo()
      const gradeInfo = userInfo && userInfo.gradeInfo ? userInfo.gradeInfo : {}
      const targetId = gradeInfo.id || 0
      const couponId = this.data.useCoupon ? this.data.useCouponInfo.id : 0

      const settleRes = await api.submitSettlement({
        targetId: targetId,
        type: 'member',
        couponId: couponId || 0,
        payType: 'JSAPI'
      })

      const settleData = settleRes.data || {}
      const orderId = settleData.orderInfo ? settleData.orderInfo.id : ''

      if (!orderId) {
        wx.showToast({ title: '下单失败', icon: 'none' })
        return
      }

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
      console.error('支付失败', err)
      wx.showToast({ title: '支付失败', icon: 'none' })
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
  async onPaySuccess() {
    this.setData({ showPayPopup: false, payStep: 1 })
    await app.refreshUserInfo()
    const userInfo = app.getUserInfo()
    const gradeLevel = userInfo && userInfo.gradeInfo ? userInfo.gradeInfo.grade : 0
    this.setData({ gradeLevel, activeTab: gradeLevel >= 2 ? 1 : 0 })
    this.loadAsset()
    wx.showToast({ title: '升级成功', icon: 'success' })
  },
  goBack() {
    wx.navigateBack({ delta: 1 })
  }
})
