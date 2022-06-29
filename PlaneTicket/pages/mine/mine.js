// pages/mine/mine.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    isLogin: false,
    userInfo: null,
    user: null,
    userId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = wx.getStorageSync('user');
    let userId = wx.getStorageSync('userId');
    let isLogin = wx.getStorageSync('isLogin');
    this.setData({
      "user": user,
      "userId": userId,
      "isLogin": isLogin,
      "index": 0
    })

    var _this = this; //留住this
    //获取缓存的userInfo，判断用户是否已经登录
    // wx.getStorage({
    //   key: 'userInfo',
    //   success: function (res) {
    //     if(res.data!=null){
    //       _this.setData({
    //         userInfo: res.data,
    //         isLogin: true
    //       })
    //     }

    //     //app.globalData.userid = res.data[0].userId;
    //   },
    // })
    // 获取用户信息并显示
    if (user == 1 && isLogin == true) {
      wx.cloud.database().collection('users').where({
          _openid: userId
        }).get()
        .then(res => {
          if (res.data.length == 0) {
            this.setData({
              userInfo: app.globalData.userInfo
            })
          } else {
            this.setData({
              userInfo: res.data[0]
            })
          }
        })
        .catch(res => {
          console.log('查询失败', res)
        })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  listenerPickerSelected: function (e) {
    this.setData({
      index: e.detail.value
    });
  },
  userLogin: function (e) {
    // console.log(e);
    //向jsp发送请求，判断用户是否存在
    var _this = this;
    var id = e.detail.value.user;
    var pwd = e.detail.value.pwd;
    // console.log(id,pwd)
    if (id.length == 0 || pwd.length == 0) {
      wx.showModal({
        title: '温馨提示:',
        content: '用户名或密码不能为空！',
        showCancel: false
      })
    } else {
      wx.cloud.database().collection('admin').where({
          adminname: id
        }).get()
        .then(res => {
          if (res.data[0].adminpassword == pwd) {
            _this.setData({
              userInfo: res.data[0],
              isLogin: true
            })
          } else {
            wx.showModal({
              title: '密码错误',
              content: '密码错误'
            })
          };
        })
        .catch(res => {
          console.log('查询失败', res)
        })
    }
  },
  userexitLogin: function () {
    //1.清缓存
    wx.clearStorageSync()
    app.globalData.userInfo = null;
    this.setData({
      index: 0,
      isLogin: false,
      userInfo: null,
      user: 0,
      userId: null
    })
    //给出提示信息
    wx.showToast({
      title: '退出成功！',
    })
    wx.navigateTo({
      url: '../chooselogin/chooselogin',
    })
  },
  adminexitLogin: function () {
    app.globalData.userInfo = null;
    wx.clearStorageSync()
    this.setData({
      index: 0,
      isLogin: false,
      userInfo: null,
      user: 0,
      userId: null
    })
    wx.showToast({
      title: '退出成功！',
    })
    wx.navigateTo({
      url: '../chooselogin/chooselogin',
    })
  },

  alterperson: function () {
    wx.navigateTo({
      url: '/pages/person/person?_id=' + this.data.userInfo._id + '&adminname=' + this.data.userInfo.adminname + '&adminpassword=' + this.data.userInfo.adminpassword,
    })
  },
  alterpwd: function () {
    wx.navigateTo({
      url: '/pages/alterpwd/alterpwd??_id' + this.data.userInfo._id + '&adminname=' + this.data.userInfo.adminname + '&adminpassword=' + this.data.userInfo.adminpassword,
    })
  },
  alterperson_user: function () {
    wx.navigateTo({
      url: '/pages/person_user/person_user?_id=' + this.data.userId,
    })
  },

  altercontacts: function () {
    wx.navigateTo({
      url: '/pages/contacts/contacts?userId=' + this.data.userId,
    })
  }
})