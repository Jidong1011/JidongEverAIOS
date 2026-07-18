const { api } = require('../../config/api')
const app = getApp()

Page({
  data: {
    inviteCode: '',
    agreed: false,
    logging: false
  },
  onInputCode(e) {
    this.setData({ inviteCode: e.detail.value })
  },
  toggleAgree() {
    this.setData({ agreed: !this.data.agreed })
  },
  async getPhoneNumber(e) {
    if (!this.data.agreed) {
      wx.showToast({ title: '请先同意用户协议', icon: 'none' })
      return
    }
    if (this.data.logging) return
    if (e.detail.errMsg !== 'getPhoneNumber:ok') {
      wx.showToast({ title: '需要授权手机号才能登录', icon: 'none' })
      return
    }
    this.setData({ logging: true })
    try {
      const loginRes = await new Promise((resolve, reject) => {
        wx.login({ success: resolve, fail: reject })
      })
      if (!loginRes.code) {
        wx.showToast({ title: '微信登录失败', icon: 'none' })
        return
      }
      wx.showToast({ title: '处理中', icon: 'loading', mask: true });
      const phoneCode = e.detail.code
      const userInfo = { type: 'phone', phoneCode }
      const res = await api.mpWxLogin(loginRes.code, userInfo)
      const data = res.data
      app.setToken(data.token)
      app.setUserInfo({
        userId: data.userId,
        userName: data.userName,
        openId: data.openId
      })
      await app.refreshUserInfo()
      console.log('UserInfo:', app.getUserInfo())
      wx.showToast({ title: '登录成功', icon: 'success' })
      setTimeout(() => {
        wx.navigateBack({
          fail: () => {
            wx.switchTab({ url: '/pages/index/index' })
          },
        })
      }, 1500)
    } catch (err) {
      console.error('登录失败', err)
    } finally {
      this.setData({ logging: false })
    }
  },

  goAgreement() {
    wx.showToast({ title: '用户协议页面开发中', icon: 'none' })
  },
  goPrivacy() {
    wx.showToast({ title: '隐私政策页面开发中', icon: 'none' })
  },
  cancelLogin() {
    wx.navigateBack({
      delta: 1,
      success: () => {
        console.log('返回成功')
      },
      fail: () => {
        wx.switchTab({ url: '/pages/index/index' })
      }
    })
  }
})
