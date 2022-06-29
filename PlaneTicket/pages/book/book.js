// pages/book/book.js
var app = getApp(); 
const util = require('../../utils/util')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    flightId: null,
    userId:null,
    flight:null,
    tickettype:null,
    flighttime:null,
    account:null,
    chooseman:null,
    insurance:null,
    linkman:null,
    contactname:null,
    contactphone:null,
    currentticket:null
  },
  checkboxChange: function (e) {
    console.log(e.detail.value)
    this.setData({chooseman:e.detail.value});
  },
  checkboxChange2: function (e) {
    console.log(e.detail.value)
    this.setData({insurance:e.detail.value});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      flightId: options.flightId,
      userId:wx.getStorageSync('userId')
    })
    let that = this;
    wx.cloud.database().collection('flight').where({
      _id:options.flightId
    }).get()
    .then(res=>{
      that.setData({
        flight:res.data[0]
      })
      let time = new Date(res.data[0].deptime);
      time = util.getMinutes(time.getFullYear())+'年'+util.getMinutes((time.getMonth()*1+1)).toString()+'月'+time.getDate()+'日'+util.getMinutes(time.getHours())+' : '+util.getMinutes(time.getMinutes());
      console.log(util.formatTime3(this.data.flight.deptime))
      this.setData({
        flighttime:time
      })
    })
    .catch(res=>{
      console.log('查询失败',res)
    })
    //查询userId绑定的联系人
    wx.cloud.database().collection('contacts').where({
      _openid:that.data.userId
    }).get()
    .then(res=>{
      console.log('查询成功联系人',res)
      var tempman =res.data
      for (var index = 0; index < tempman.length; index++) {
        tempman[index].displayname = tempman[index].ident[0]+'****************'+tempman[index].ident[tempman[index].ident.length-1];
      }
      that.setData({
        linkman:tempman
      })
    })
    .catch(res=>{
      console.log('查询失败',res)
    })
  },
  radiochange: function(e) {
    console.log('单选框变化', e.detail.value)
    this.setData({
      tickettype:e.detail.value
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
  bookTicket:function(e){
    console.log(e.detail.value);
    let contactname = e.detail.value.contactname;
    let contactphone = e.detail.value.contactphone
    this.setData({
      contactname:e.detail.value.contactname,
      contactphone:e.detail.value.contactphone
    })
    let account = 0;
    let that = this;
    if(this.data.tickettype=='经济舱'){
      account = account+this.data.flight.eco_price*this.data.chooseman.length;
    }
    else{
      account = account+this.data.flight.first_price*this.data.chooseman.length;
    }
    for(var i=0;i<this.data.insurance.length;i++)
    {
      account = account+this.data.insurance[i]*this.data.chooseman.length;
    }
    //计算出订单
    this.setData({
      account:account
    })
    //开始买票
    let currentticket = 0;
    if(this.data.tickettype=='经济舱')
    {
      if(that.data.flight.eco_currentticket-that.data.chooseman.length>=0)
      {
        that.setData({
          currentticket:that.data.flight.eco_currentticket-that.data.chooseman.length
        })
        currentticket = that.data.flight.eco_currentticket-that.data.chooseman.length
      }
      else{
        wx.showModal({
          title: '余票不足预订失败！',
          success: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/book/book',
              })
            }
          }
        })
      }}
      else{
        if(that.data.flight.first_currentticket-that.data.chooseman.length>=0)
        {
          that.setData({
            currentticket:that.data.flight.eco_currentticket-that.data.chooseman.length
          })
          currentticket = that.data.flight.eco_currentticket-that.data.chooseman.length
        }
       else{
        wx.showModal({
          title: '余票不足预订失败！',
          success: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/book/book',
              })
            }
          }
        })
      }
      }
      //买票
      //更新数据库
      wx.cloud.callFunction({
        name:'buyticket',
        data:{
          id:that.data.flight._id,
          tickettype:that.data.tickettype,
          currentticket:currentticket
        }
      }).then(res=>{
        console.log('更新信息成功',res)
    })
    .catch(res=>{
      console.log('更新失败',res)
    })
      //写订单表
      //写入姓名和身份证
      let manlist=[];
      let tempchooseman = this.data.chooseman;
      let tempman = this.data.linkman;
      for (var j = 0;j<tempchooseman.length;j++)
      {
        for (var index = 0; index < tempman.length; index++) {
          if (tempman[index].ident==tempchooseman[j]){
            var person={
              "name":tempman[index].name,
              "ident":tempman[index].ident,
              "phone":tempman[index].phone
            }
            manlist.push(person)
          }
        }
      }
      this.setData({
        chooseman:manlist
      })
      wx.cloud.callFunction({
        name:'addorder',
        data:{
          account:account,
          userId:that.data.userId,
          idofchooseman:manlist,
          flight:that.data.flight,
          contactname:contactname,
          contactphone:contactphone,
          tickettype:that.data.tickettype
        }
      }).then(res=>{
        console.log('更新信息成功',res)
        wx.showModal({
          title: '预订成功！'+'总计'+account.toString()+'元',
          //返回首页
          success: function (res) {
          if (res.confirm) {
            wx.switchTab({
            url: '/pages/index/index',
          })
        }
      }
    })
    })
      .catch(res=>{
        console.log('更新失败',res)
      })
    }
  }
)