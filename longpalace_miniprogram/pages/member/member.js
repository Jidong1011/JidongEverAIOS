const { api } = require('../../config/api')
const app = getApp()

const DEFAULT_USER_STATE = {
  isLogin: false,
  userName: '',
  avatar: '',
  gradeName: '',
  gradeIntro: '日报工具箱、Prompt 模板库、活动优先报名、企业试点共创、孵化观察名单。',
  gradeLevel: 0,
  showEdit: false,
  editName: '',
  editAvatar: '',
  saving: false
};

Page({
  data: { ...DEFAULT_USER_STATE },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 3 })
    }
    this.loadUserInfo()
  },

  loadUserInfo() {
    const userInfo = app.getUserInfo()
    console.log('UserInfo-login:', userInfo)
    if (userInfo && userInfo.id) {
      this.setData({
        isLogin: true,
        userName: userInfo.name || '',
        avatar: userInfo.avatar || '',
        gradeName: userInfo.gradeInfo ? userInfo.gradeInfo.name : '',
        gradeIntro: userInfo.gradeInfo ? userInfo.gradeInfo.userPrivilege : '',
        gradeLevel: userInfo.gradeInfo ? userInfo.gradeInfo.grade : 0
      })
    } else {
      this.setData({ isLogin: false })
    }
  },

  wxLogin() {
    wx.navigateTo({ url: '/pages/login/login' })
  },

  goJoin() {
    wx.switchTab({ url: '/pages/index/index' })
  },

  goBenefits() {
    wx.navigateTo({ url: '/pages/benefits/benefits' })
  },

  showEditModal() {
    this.setData({
      showEdit: true,
      editName: this.data.userName,
      editAvatar: this.data.avatar
    })
  },

  hideEditModal() {
    this.setData({ showEdit: false })
  },

  noop() {},

  onChooseAvatar(e) {
    this.setData({ editAvatar: e.detail.avatarUrl })
  },

  onInputName(e) {
    this.setData({ editName: e.detail.value })
  },

  async saveProfile() {
    const { editName, editAvatar, avatar, saving } = this.data
    if (saving) return
    this.setData({ saving: true })

    try {
      let avatarUrl = avatar
      if (editAvatar && editAvatar !== avatar) {
        const uploadRes = await api.uploadFile(editAvatar)
        avatarUrl = uploadRes.data.url || uploadRes.data.filePath || ''
      }

      await api.updateUserInfo({ name: editName, avatar: avatarUrl })

      await app.refreshUserInfo()
      this.loadUserInfo()
      this.setData({ showEdit: false })
      wx.showToast({ title: '保存成功', icon: 'success' })
    } catch (err) {
      console.error('保存失败', err)
    } finally {
      this.setData({ saving: false })
    }
  },

  logout(){
    this.setData({ ...DEFAULT_USER_STATE });
    app.clearLoginInfo()
    wx.showToast({ title: '已退出登录', icon: 'success' });
  }
})
