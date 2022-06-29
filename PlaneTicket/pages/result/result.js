// pages/result/result.js
var app=getApp(); 
const util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flight: null,
    deptime:null,
    dep:null,
    arr:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(app.globalData.flight);
    util.formatTime(new Date())
    this.setData({
      flight:app.globalData.flight,
      dep:app.globalData.dep,
      arr: app.globalData.arr,
      deptime:app.globalData.deptime
    });
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
  book:function(e){
    console.log(e.currentTarget.dataset.text);
    wx.navigateTo({
      url: '/pages/book/book?flightId=' + e.currentTarget.dataset.text //将航班id传入
    })
  }
})