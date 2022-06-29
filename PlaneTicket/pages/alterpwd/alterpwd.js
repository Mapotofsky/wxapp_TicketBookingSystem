// pages/alterpwd/alterpwd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ['userInfo._id']:options._id,
      ['userInfo.adminname']:options.adminname,
      ['userInfo.adminpassword']:options.adminpassword
    })
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
  //更改密码
  altrPwd:function(e){
    var _this = this;
    var id = this.data.userInfo._id
    var newpwd = e.detail.value.newpwd;
    wx.cloud.callFunction({
      name:'adminchangepwd',
      data:{
        id:id,
        pwd:newpwd
      }
    }).then(res=>{
      console.log('更新信息成功',res)
      wx.showModal({
        title: '更改成功！',
        success:function(res){
          if(res.confirm){
            wx.switchTab({
              url: '/pages/mine/mine',
            })
          }
        }
      })
    })
    .catch(res=>{
      console.log('更新密码失败',res)
      wx.showToast({
        title: '更改失败！',
      })
    })
  }
})