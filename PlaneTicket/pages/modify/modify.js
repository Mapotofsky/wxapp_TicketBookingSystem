// pages/modify/modify.js
const util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        flight: null,
        id: "0",
        flightname: "请输入航班编号",
        dep: "请输入出发地",
        arr:"请输入目的地",
        deptime:"请输入出发时间",
        arrtime:"请输入到达时间",
        eco_price:"请输入经济舱票价",
        eco_totalticket: "请输入经济舱总票数",
        first_price:"请输入头等舱票价",
        first_totalticket: "请输入头等舱总票数",
        title: "航班信息添加",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        var id = options.flightId
        if(id != "0"){ // id=="0"，表示添加
            wx.cloud.callFunction({
                name:'getFlight',
                data:{
                    id: id,
                }
            })
            .then(res =>{
                console.log('获取成功', res.result.data)
                this.setData({
                    flight: res.result.data,
                    id: res.result.data._id,
                    title: "航班信息修改",       
                    flightname: res.result.data.flightname,     
                    dep: res.result.data.dep,
                    arr: res.result.data.arr,
                    deptime: String( util.formatTime(util.formatTime3(res.result.data.deptime)) ),
                    arrtime: String( util.formatTime(util.formatTime3(res.result.data.arrtime)) ),
                    eco_price: res.result.data.eco_price,
                    eco_totalticket: res.result.data.eco_totalticket,
                    first_price: res.result.data.first_price,
                    first_totalticket: res.result.data.first_totalticket,
                })
                console.log(this.data.deptime)
                console.log(this.data.arrtime)
            })
            .catch(err =>{
                console.log('获取失败', err)
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
    /**
     * 提交修改或添加
     */
    submit: function(e){
        // this.setData({
        //     eco_price: e.detail.value.eco_price,
        // })
        // console.log(e.detail.value)
        // console.log(this.data)
        // this.data.flight.eco_price = e.detail.value.eco_price
        // console.log(this.data.flight)
        // console.log(e.detail.value.deptime)
        // console.log(e.detail.value.arrtime)
        // console.log(e.detail.value)
        var id = this.data.id
        var isInput = e.detail.value.flightname == "" || e.detail.value.dep == "" || e.detail.value.arr == "" || e.detail.value.deptime == "" || e.detail.value.arrtime == "" || e.detail.value.eco_price == "" || e.detail.value.eco_totalticket == "" || e.detail.value.first_price == "" || e.detail.value.first_totalticket == ""
        // console.log("isInput:"+ isInput)
        if(isInput){
            wx.showToast({
              title: '仍有信息未输入！',
              icon: 'error',
            })
            return
        }
        wx.showModal({
            title: "提示",
            content: "确认提交？",
            success: function(res){
                if(res.confirm){
                    console.log("确定")
                    if(id == "0"){ // 添加航班
                        wx.cloud.callFunction({
                            name: "addFlight",
                            data:{
                                flightname: e.detail.value.flightname,
                                dep: e.detail.value.dep,
                                arr: e.detail.value.arr,
                                deptime: util.formatTime3(e.detail.value.deptime),
                                arrtime: util.formatTime3(e.detail.value.arrtime),
                                eco_price: e.detail.value.eco_price,
                                eco_totalticket: e.detail.value.eco_totalticket,
                                first_price: e.detail.value.first_price,
                                first_totalticket: e.detail.value.first_totalticket,
                            }
                        })
                        .then(res =>{
                            console.log("调用成功", res)
                        })
                        .catch(err =>{
                            console.log("调用失败", err)
                        })
                    }
                    else{ // 修改航班
                        wx.cloud.callFunction({
                            name: "updateFlight",
                            data:{
                                // flight: this.data.flight,
                                id: id,
                                flightname: e.detail.value.flightname,
                                dep: e.detail.value.dep,
                                arr: e.detail.value.arr,
                                deptime: util.formatTime3(e.detail.value.deptime),
                                arrtime: util.formatTime3(e.detail.value.arrtime),
                                eco_price: e.detail.value.eco_price,
                                eco_totalticket: e.detail.value.eco_totalticket,
                                first_price: e.detail.value.first_price,
                                first_totalticket: e.detail.value.first_totalticket,
                            }
                        })
                        .then(res =>{
                            console.log("调用成功", res)
                        })
                        .catch(err =>{
                            console.log("调用失败", err)
                        })
                    }
                    wx.switchTab({
                        url: '/pages/flight/flight'
                    })
                }
                else{
                    console.log("取消")
                }
            }
        })
    },
})