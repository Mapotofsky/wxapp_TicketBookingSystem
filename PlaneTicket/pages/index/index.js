// pages/index/index.js
const util = require('../../utils/util')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    dates: '出发日期',
    dep:null,
    arr:null,
    isTic:false,
    ticdep:null,
    ticarr:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


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
    var isTic =wx.getStorageSync('isTic')
    if(isTic){
      console.log('改签',isTic)
      this.setData({
        isTic:isTic,
        ticarr:wx.getStorageSync('ticarr'),
        ticdep:wx.getStorageSync('ticdep')
      })
    }
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
  // search:function(){
  //   wx.navigateTo({
  //     url: '/pages/result/result',
  //   })
  // },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    this.setData({
      dates: e.detail.value
    })
  },
  //获取用户输入的用户名
  depInput: function (e) {
    //console.log(e);
    this.setData({
      dep: e.detail.value,
    })
  },
  arrInput: function (e) {
    this.setData({
      arr: e.detail.value,
    })
  },
  change:function(){
    var dep = this.data.arr;
    var arr = this.data.dep;
    this.setData({
      dep: dep,
      arr:arr,
    })
  },
  clear:function(){
    this.setData({
      dep:null,
      arr:null,
      dates:"出发日期"
    })
  },

  search:function(e){
    //先到数据库里面查询结果，然后跳转到result页面
    let depcity = e.detail.value.depcity;
    let arrcity = e.detail.value.arrcity;
    let deptime = e.detail.value.deptime;
    if(wx.getStorageSync('isTic')){
      depcity=wx.getStorageSync('ticarr');
      arrcity=wx.getStorageSync('ticdep');
    };
    app.globalData.dep=depcity;
    app.globalData.arr = arrcity;
    app.globalData.deptime = deptime;
    let that =this
    wx.cloud.callFunction({
      name:'searchindateandaddress',
      data:{
        dep:depcity,
        arr:arrcity,
        deptime:deptime,
      }
    }).then(res=>{
      console.log('查询成功',res.result.data)
      var tempflight = res.result.data; //将查询到的Array赋值给全局变量flight即查询到的满足要求的航班
      for(var i=0;i<tempflight.length;++i)
      {
        var tempdeptime = tempflight[i].deptime;
        var temparrtime = tempflight[i].arrtime;
        tempflight[i].deptime = util.getMinutes(util.formatTime3(tempdeptime).getHours())+' : '+util.getMinutes(util.formatTime3(tempdeptime).getMinutes());
        tempflight[i].arrtime = util.getMinutes(util.formatTime3(temparrtime).getHours())+' : '+util.getMinutes(util.formatTime3(temparrtime).getMinutes());
      }
      app.globalData.flight = tempflight;
      console.log('跳转')
      var user = wx.getStorageSync('user');
      if(user==1){//用户购票界面
        wx.navigateTo({
          url: '/pages/result/result',
        })
      }
      else{//管理员管理航班界面
        app.globalData.isSearch = true
        wx.switchTab({
          url: '/pages/flight/flight',
        })
      }
    })
    .catch(res=>{
      console.log('查询失败',res)
      wx.showToast({
        title: '暂无满足需求的航班！',
      })
    })
  },
})