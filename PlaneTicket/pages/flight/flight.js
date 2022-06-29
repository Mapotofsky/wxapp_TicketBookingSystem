// pages/flight/flight.js
import Page from '../../common/page';
import Dialog from '../../dist/dialog/dialog';
import Notify from '../../dist/notify/notify';
const util = require('../../utils/util.js');
var app=getApp(); 
Page({
    /**
     * 页面的初始数据
     */
    data: {
      flight: [],
      port: null,
      dep: null,
      arr: null,
      depdate: [],
      arrdate: [],
      user: null,
      myorders: [],
      userId: null,
      isLogin:false
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
        "isLogin":isLogin
      })
      // console.log(options.searchFlag)
      // console.log("成功跳转到flight")
      // if(app.globalData.isSearch){
      //   this.setData({
      //     flight: app.globalData.flight
      //   })
      // }
      // else{
      //   wx.cloud.callFunction({
      //     name:'getAllFlight',
      //   })
      //   .then(res=>{  
      //     var tempflight = res.result.data; //将查询到的Array赋值给全局变量flight即查询到的满足要求的航班
      //     for(var i=0;i<tempflight.length;++i)
      //     {
      //       var tempdeptime = tempflight[i].deptime;
      //       var temparrtime = tempflight[i].arrtime;
      //       // console.log(util.formatTime3(tempdeptime))
      //       tempflight[i].deptime = util.formatTime3(tempdeptime).getHours()+':'+util.formatTime3(tempdeptime).getMinutes();
      //       tempflight[i].arrtime = util.formatTime3(temparrtime).getHours()+':'+util.formatTime3(temparrtime).getMinutes();
      //     }
      //     this.setData({
      //       flight:tempflight,
      //     })
      //   })
      // }
    },
    onClose(event) {
      const { position, instance } = event.detail;
      console.log(position);
      switch (position) {
        case 'left':
        case 'cell':
          instance.close();
          break;
        case 'right':
          console.log(position);
          Dialog.confirm({
            message: '确定删除吗？'
          })
          .then(() => {
            instance.close();
          });
          break;
      }
    },
    refundTic: function (event) {
      var that = this;
      var temp = that.data.myorders;
      wx.showModal({
        title: '确定退票？',
        success(res) {
          if (res.confirm) {
            var index = event.currentTarget.dataset.index;
            var order = that.data.myorders[index];
            wx.cloud.callFunction({
                name: 'orderRemove',
                data: {
                  id: order._id,
                }
              }).then(res => {
                wx.showModal({
                  title: '退票成功！',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      temp.splice(index, 1);
                      that.setData({
                        myorders: temp
                      })
                    }
                  }
                })
              })
              .catch(res => {
                console.log('退票失败', res)
                wx.showToast({
                  title: '退票失败！',
                })
              });
          }
        }
      })
    },
    changeTic:function(event){
      var that = this;
      var temp = that.data.myorders;
      wx.showModal({
        title: '确定改签？该订单将被取消！',
        success(res) {
          if (res.confirm) {
            var index = event.currentTarget.dataset.index;
            var order = that.data.myorders[index];
            // 改签先删除该订单
            // 然后跳转到首页进行买票
            wx.cloud.callFunction({
                name: 'orderRemove',
                data: {
                  id: order._id,
                }
              }).then(res => {
                temp.splice(index, 1);
                that.setData({
                  myorders: temp
                })
              })
              .catch(res => {
                console.log('改签失败', res)
                wx.showToast({
                  title: '改签失败！',
                })
              });
            wx.setStorageSync('isTic', true);
            wx.setStorageSync('ticdep', order.flight.dep);
            wx.setStorageSync('ticarr', order.flight.arr);
            setTimeout(function(){
              wx.switchTab({
                url: '../index/index',
                fail:function(){
                  console.log("跳转失败")
                }
              })
            },500);
          }
        }
      })
    },
    onTapAdd:function(event){
      console.log(event.currentTarget.dataset.id);
      wx.navigateTo({
        url: '/pages/modify/modify?flightId=' + event.currentTarget.dataset.id, //id="0"，表示添加
      })
    },
    onTapDel:function(event){
      var temp = this.data.flight;
      var index = event.target.dataset.index;
      // console.log(index); 
      // 调用云函数删除数据库记录
      wx.cloud.callFunction({
        name: "deleteFlight",
        data:{
          flight: this.data.flight[index],
        }
      })
      .then(res =>{
        console.log("调用成功！",res)
      })
      .catch(err =>{
        console.log("调用失败！",err)
      })
      // 在页面中删除相应航班信息
      temp.splice(index, 1);
      this.setData({
        flight: temp
      })
      // console.log(this.data.flight.length);
    },
    onOpen(event) {
      const { position, name } = event.detail;
      switch (position) {
        case 'left':
          Notify({
            type: 'primary',
            message: `${name}${position}部分展示open事件被触发`
          });
          break;
        case 'right':
          Notify({
            type: 'primary',
            message: `${name}${position}部分展示open事件被触发`
          });
          break;
      }
    },
    modify:function(e){
      console.log(e.currentTarget.dataset.id);
      wx.navigateTo({
        url: '/pages/modify/modify?flightId=' + e.currentTarget.dataset.id,
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
      let user = wx.getStorageSync('user');
      let userId = wx.getStorageSync('userId');
      let isLogin = wx.getStorageSync('isLogin');
      this.setData({
        "user": user,
        "userId": userId,
        "isLogin":isLogin
      })
      if (user == 0) {
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
              selected: 3 //选中效果 当前tabBar页面在list中对应的下标， 
            })
          }
        console.log("成功跳转到flight")
        if(app.globalData.isSearch){
          this.setData({
            flight: app.globalData.flight
          })
        }
        else{
          wx.cloud.callFunction({
            name:'getAllFlight',
          })
          .then(res=>{  
            var tempflight = res.result.data; //将查询到的Array赋值给全局变量flight即查询到的满足要求的航班
            var tempdepdate = [];
            var temparrdate = [];
            for(var i=0;i<tempflight.length;++i)
            {
              var tempdeptime = tempflight[i].deptime;
              var temparrtime = tempflight[i].arrtime;
              // console.log(util.formatTime3(tempdeptime))
              tempflight[i].deptime = util.getMinutes(util.formatTime3(tempdeptime).getHours())+':'+util.getMinutes(util.formatTime3(tempdeptime).getMinutes());
              tempflight[i].arrtime = util.getMinutes(util.formatTime3(temparrtime).getHours())+':'+util.getMinutes(util.formatTime3(temparrtime).getMinutes());
              // 修改出发和到达日期
              tempdepdate[i] = util.getMinutes(util.formatTime3(tempdeptime).getMonth())+'-'+util.getMinutes(util.formatTime3(tempdeptime).getDate());
              temparrdate[i] = util.getMinutes(util.formatTime3(temparrtime).getMonth())+'-'+util.getMinutes(util.formatTime3(tempdeptime).getDate());
              console.log(tempdepdate[i])
              console.log(temparrdate[i])
            }
            this.setData({
              flight: tempflight,
              depdate: tempdepdate,
              arrdate: temparrdate,
            })
            console.log(this.data.depdate)
            console.log(this.data.arrdate)
          })
        }
        // 防止从index搜索后，无法显示所有航班
        app.globalData.isSearch = false
      }
      else{
        // 查找订单
        wx.cloud.database().collection('order').where({
          userId: userId
        }).get()
        .then(res => {
          let myorders = res.data;
          console.log(myorders);
          // 修改身份证和时间
          for (var i = 0; i < res.data.length; ++i) {
            console.log(i);
            for (var j = 0; j < myorders[i].idofchooseman.length; ++j) {
              // 乘机人的身份证
              var ident = myorders[i].idofchooseman[j].ident;
              myorders[i].idofchooseman[j].ident = ident[0] + '****************' + ident[ident.length - 1];
            }
            // 修改时间
            var tempdeptime = myorders[i].flight.deptime;
            var temparrtime = myorders[i].flight.arrtime;
            myorders[i].flight.deptime = util.getMinutes(util.formatTime3(tempdeptime).getHours()) + ':' + util.getMinutes(util.formatTime3(tempdeptime).getMinutes());
            myorders[i].flight.arrtime = util.getMinutes(util.formatTime3(temparrtime).getHours()) + ':' + util.getMinutes(util.formatTime3(temparrtime).getMinutes());
            var ordertime = myorders[i].ordertime;
            myorders[i].ordertime = util.formatTime3(ordertime).getFullYear() + '.' + util.formatTime3(ordertime).getMonth() + '.' + util.formatTime3(ordertime).getDate() + ' ' + util.formatTime3(ordertime).getHours() + ':' + util.formatTime3(ordertime).getMinutes();
          }
          this.setData({
            myorders: myorders
          })
        })
        .catch(res => {
          console.log('查询失败', res)
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

    }
})