const { apiUrl, merchantNo, storeId } = require('./config')

function request(options) {
  const { url, method = 'GET', data, header = {} } = options
  const token = wx.getStorageSync('token')
  if (token) {
    header['Access-Token'] = token
  }
  header['Content-Type'] = header['Content-Type'] || 'application/json'
  header['merchantNo'] = merchantNo
  header['isWechat'] = '1'
  header['platform'] = 'miniProgram'
  if (storeId) {
    header['storeId'] = storeId
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: apiUrl + url,
      method,
      data,
      header,
      success(res) {
        if (res.statusCode === 200) {
          if (res.data.code === 200 || res.data.code === 0) {
            resolve(res.data)
          } else if (res.data.code === 1001 || res.data.code === 401) {
            const app = getApp()
            app.clearLoginInfo()
            wx.navigateTo({ url: '/pages/login/login' })
            reject(res.data)
          } else {
            wx.showToast({ title: res.data.message || '请求失败', icon: 'none' })
            reject(res.data)
          }
        } else {
          wx.showToast({ title: '网络异常', icon: 'none' })
          reject(res)
        }
      },
      fail(err) {
        wx.showToast({ title: '网络连接失败', icon: 'none' })
        reject(err)
      }
    })
  })
}

function get(url, data) {
  return request({ url, method: 'GET', data })
}

function post(url, data) {
  return request({ url, method: 'POST', data })
}

function put(url, data) {
  return request({ url, method: 'PUT', data })
}

function del(url, data) {
  return request({ url, method: 'DELETE', data })
}

const api = {
  mpWxLogin(code, userInfo, shareId) {
    return post('/sign/mpWxLogin', { code, userInfo, shareId: shareId || '0' })
  },

  getUserInfo() {
    return get('/user/info')
  },

  updateUserInfo(data) {
    return post('/user/saveInfo', data)
  },

  uploadFile(filePath) {
    const token = wx.getStorageSync('token')
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: apiUrl + '/file/upload',
        filePath,
        name: 'file',
        header: {
          'Access-Token': token,
          'merchantNo': merchantNo,
          'isWechat': '1',
          'platform': 'miniProgram'
        },
        success(res) {
          const data = JSON.parse(res.data)
          if (data.code === 200 || data.code === 0) {
            resolve(data)
          } else {
            wx.showToast({ title: data.message || '上传失败', icon: 'none' })
            reject(data)
          }
        },
        fail(err) {
          wx.showToast({ title: '上传失败', icon: 'none' })
          reject(err)
        }
      })
    })
  },

  getDailyInfo() {
    return get('/daily/info')
  },

  getEventList(data) {
    return get('/events/list', data)
  },

  getEventDetail(id) {
    return get('/events/detail/' + id)
  },

  getPearlList(data) {
    return get('/pearls/list', data)
  },

  getPearlDetail(id) {
    return get('/pearls/detail/' + id)
  },

  getMemberInfo() {
    return get('/member/info')
  },

  getUserAsset() {
    return get('/user/asset')
  },

  prePay(type) {
    return get('/pay/prePay', { type })
  },

  submitSettlement(data) {
    return post('/settlement/submit', data)
  },

  doPay(orderId, payType) {
    return get('/pay/doPay', { orderId, payType })
  },

  verifyInviteCode(code) {
    return post('/invite/verify', { code })
  },

  getArticleCount() {
    return get('/article/count')
  },

  getGoodsCount(type) {
    return get('/goodsApi/count', { type })
  },

  getGoodsList(type) {
    return get('/goodsApi/list', { type })
  },

  getGoodsDetail(goodsId) {
    return post('/goodsApi/detail', { goodsId: String(goodsId) })
  },

  getStoreUserCount() {
    return get('/store/userCount')
  },

  getArticleList(data) {
    return post('/article/list', data)
  },

  getArticleDetail(articleId) {
    return post('/article/detail', { articleId })
  }
}

module.exports = {
  request,
  get,
  post,
  put,
  del,
  api
}
