// pages/contacts/contacts.js
import Page from '../../common/page';
import Dialog from '../../dist/dialog/dialog';
import Notify from '../../dist/notify/notify';
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mycontacts: [],
        userId: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            userId: options.userId
        })
        // 查找联系人
        wx.cloud.database().collection('contacts').where({
                _openid: this.data.userId
            }).get()
            .then(res => {
                var mycontacts = [];
                for (var i = 0; i < res.data.length; ++i) {
                    mycontacts.push(res.data[i]);
                    var ident = mycontacts[i].ident;
                    mycontacts[i].ident = ident[0] + '****************' + ident[ident.length - 1];
                }
                this.setData({
                    mycontacts: mycontacts
                })
            })
            .catch(res => {
                console.log('查询失败', res)
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

    onTapDel: function (event) {
        var that = this;
        var temp = that.data.mycontacts;
        wx.showModal({
            title: '确定删除？',
            success(res) {
                if (res.confirm) {
                    var index = event.currentTarget.dataset.index;
                    var person = that.data.mycontacts[index];
                    console.log(person)
                    wx.cloud.callFunction({
                            name: 'contactRemove',
                            data: {
                                id: person._id,
                            }
                        }).then(res => {
                            wx.showModal({
                                title: '删除成功！',
                                showCancel: false,
                                success: function (res) {
                                    if (res.confirm) {
                                        temp.splice(index, 1);
                                        that.setData({
                                            mycontacts: temp
                                        })
                                    }
                                }
                            })
                        })
                        .catch(res => {
                            console.log('删除信息失败', res)
                            wx.showToast({
                                title: '删除失败！',
                            })
                        });
                }
            }
        })
    },

    /**
     * 修改联系人信息
     */
    modifyC: function (e) {
        wx.redirectTo({
            url: '/pages/alterConta/alterConta?ModOrAdd=0' + '&contactId=' + e.currentTarget.dataset.text
        })
    },

    /**
     * 添加联系人信息
     */
    addC: function () {
        if (this.data.mycontacts.length >= 6) {
            wx.showModal({
                title: '最多添加6名联系人！',
                showCancel: false
            })
            return;
        }
        wx.redirectTo({
            url: '/pages/alterConta/alterConta?ModOrAdd=1'
        })
    }
})