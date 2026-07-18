App({
  onLaunch() {
    const systemInfo = wx.getSystemInfoSync()
    this.globalData.statusBarHeight = systemInfo.statusBarHeight
    this.globalData.token = wx.getStorageSync('token')
    this.globalData.userInfo = wx.getStorageSync('userInfo')
  },

  getUserInfo() {
    if (!this.globalData.userInfo) {
      this.globalData.userInfo = wx.getStorageSync('userInfo')
    }
    return this.globalData.userInfo
  },

  setUserInfo(info) {
    this.globalData.userInfo = info
    wx.setStorageSync('userInfo', info)
  },

  getGradeList() {
    if (!this.globalData.gradeList) {
      this.globalData.gradeList = wx.getStorageSync('gradeList')
    }
    return this.globalData.gradeList
  },

  setGradeList(list) {
    this.globalData.gradeList = list
    wx.setStorageSync('gradeList', list)
  },

  getToken() {
    if (!this.globalData.token) {
      this.globalData.token = wx.getStorageSync('token')
    }
    return this.globalData.token
  },

  setToken(token) {
    this.globalData.token = token
    wx.setStorageSync('token', token)
  },

  clearLoginInfo() {
    this.globalData.token = ''
    this.globalData.userInfo = null
    this.globalData.gradeList = null
    wx.removeStorageSync('token')
    wx.removeStorageSync('userInfo')
  },

  refreshUserInfo() {
    const { api } = require('./config/api')
    return api.getUserInfo().then(res => {
      const data = res.data
      console.info('login-data:', data)
      if (data && data.userInfo) {
        const gInfo = data.gradeInfo || null
        const gradeList = data.memberGrade || []
        const userInfo = gInfo ? Object.assign({}, data.userInfo, {gradeInfo: gInfo}) : data.userInfo
        this.setUserInfo(userInfo)
        this.setGradeList(gradeList)
      }
      return res
    })
  },

  formatDate(date){
    if (!date) return ''
    let d
    if (date instanceof Date) {
      d = date
    } else if (typeof date === 'string' || typeof date === 'number') {
      d = new Date(date)
    } else {
      return ''
    }
    if (isNaN(d.getTime())) return ''
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  },

  globalData: {
    statusBarHeight: 0,
    token: '',
    userInfo: null,
    gradeList:[]
  }
})
